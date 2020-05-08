const mojamma = require('../../bin/mojammaa');
const dbConnect = require('../../database/connect');
const fetch = require('node-fetch');

module.exports = (app, passport) => {

  app.get('/prayersTimes/all', (req, res) => {       
      
    dbConnect.query (
      'CALL prcGetAllPrayers(?);',
      [req.userLangPref],
      (err, prayers) => {
        if(err) {
          res.status(500).json();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/prayersTimes/all)",
            null, err
          );
          return;
        }

        fetchPrayerTimesFromAladan([...prayers[0]], req)
        .then ( prays => {
          setDefaultTimesForSunnaPrayers(prays);
          res.status(200).json(prays);
        })
        .catch(status => {
          mojamma.log (
            `Error in fetch from Aladan`,
            mojamma.logLevels.SERVER_API_ERR,
            __filename,
            "app.get(/prayersTimes/all)",
            null, status
          );
          throw status;
        })
        .catch(() => {
          fetchPrayerTimesFromPrayZone([...prayers[0]], req)
          .then ( prays => {
            setDefaultTimesForSunnaPrayers(prays);
            res.status(200).json(prays);
          })
          .catch(status => {
            mojamma.log (
              `Error in fetch from pray zone`,
              mojamma.logLevels.SERVER_API_ERR,
              __filename,
              "app.get(/prayersTimes/all)",
              null, status
            );
          });
        });  
              
      });

  });

};

const fetchPrayerTimesFromPrayZone = (dbPrays, req) => {
  let prayerTimesApiUrl = '';
  const {alt, lon, lat} = req.query;

  if(alt && lon && lat)
    prayerTimesApiUrl = 
      `https://api.pray.zone/v2/times/today.json?longitude=${lon}&latitude=${lat}&elevation=${alt}&school=4`;
  else
    prayerTimesApiUrl = 
      `https://api.pray.zone/v2/times/today.json?ip=${req.ipAddr}&school=4`;

  return fetch(prayerTimesApiUrl)
    .then(response => {
      if(response.status < 200 || response.status >= 400)
        throw response.status;
      return response.json()
      .then(({results}) => {
        let prayersTimesApiRes = results.datetime[0].times;
        for (prayer of dbPrays) {
          let prayerApiTime = prayersTimesApiRes[prayer.apiKeyName] || '';
          prayer.athanHour = prayerApiTime.substr(0, 2);
          prayer.athanMinutes = prayerApiTime.substr(3, 2);
        }
        return dbPrays;
      })
      .catch((err) => {
        mojamma.log (
          `Error in fetch from pray zone`,
          mojamma.logLevels.SERVER_API_ERR,
          __filename,
          "app.get(/prayersTimes/all)",
          null, err
        );
        throw 500;
      });
    });
}

const fetchPrayerTimesFromAladan = (dbPrays, req) => {
  let prayerTimesApiUrl = '';
  let {lon, lat, day, month, year} = req.query;
  const now = new Date();
  
  day = +day || now.getDate();
  month = +month || now.getMonth();
  year = +year || now.getFullYear();

  if(!lon || !lat)
    return Promise.reject(400);

  prayerTimesApiUrl = 
    `http://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${lon}&method=4&month=${month + 1}&year=${year}&latitudeAdjustmentMethod=2`;
  
  return fetch(prayerTimesApiUrl)
    .then(response => {
      if(response.status < 200 || response.status >= 400)
        throw response.status;
      return response.json()
        .then(({data}) => {         
          let prayersTimesApiRes = data[day - 1].timings;
          let prayersOffsets = data[day - 1].meta.offset;
          for (prayer of dbPrays) {
            let prayerApiTime = prayersTimesApiRes[prayer.apiKeyName] || '';
            let prayerApiOffset = parseInt(prayersOffsets[prayer.apiKeyName]);
            prayer.athanHour = prayerApiTime.substr(0, 2);
            prayer.athanMinutes = prayerApiTime.substr(3, 2);
            if (prayerApiOffset) {
              removePrayerOffset(prayer, prayerApiOffset);
            }
          }
          return dbPrays;
        })
        .catch((err) => {
          mojamma.log (
            `Error in fetch from Aladan`,
            mojamma.logLevels.SERVER_API_ERR,
            __filename,
            "app.get(/prayersTimes/all)",
            null, err
          );
          throw err;
        });
    });
}

const removePrayerOffset = (prayer, offset) => {
  let athanMinutesInt = +prayer.athanMinutes;
  let athanHourInt = +prayer.athanHour;

  if (athanMinutesInt >= offset) {
    athanMinutesInt -= offset;
  }
  else {
    athanHourInt = (athanHourInt || 24) - 1;
    athanMinutesInt += 60 - offset;
    prayer.athanHour = get2digitTimeStr(athanHourInt);
  }

  if(athanMinutesInt > 59) {
    athanMinutesInt -= 60;
    athanHourInt = athanHourInt === 23 ? 0 : athanHourInt + 1;
    prayer.athanHour = get2digitTimeStr(athanHourInt);
  }

  prayer.athanMinutes = get2digitTimeStr(athanMinutesInt);
}

const setDefaultTimesForSunnaPrayers = (prayers) => {
  let isha = null;
  let sunRise = null;
  let fajr = null;
    
  for (pray of prayers) {
    // Assume that fajr & isha & sunrise will
    // appear in array befor sunna prayers  

    if(pray.apiKeyName === 'Isha')
      isha = pray;
    else if(pray.apiKeyName === 'Fajr')
      fajr = pray;
    else if(pray.apiKeyName === 'Sunrise')
      sunRise = pray;
    
    if (!(fajr && isha && sunRise))
      continue;

    if(!pray.athanHour) {
      switch(pray.apiKeyName) {
        case 'Imsak': 
          pray.athanHour = fajr.athanHour;
          pray.athanMinutes = fajr.athanMinutes;
          removePrayerOffset(pray, 10);
          break;
        case 'tahjd': 
          pray.athanHour = '00';
          pray.athanMinutes = '30';
          break;
        case 'Duha': 
          pray.athanHour = sunRise.athanHour;
          pray.athanMinutes = sunRise.athanMinutes;
          removePrayerOffset(pray, -20);
          break;
        case 'Taraweeh': 
          pray.athanHour = isha.athanHour;
          pray.athanMinutes = isha.athanMinutes;
          removePrayerOffset(pray, -20);
          break;
      }
    }
  }
}

const get2digitTimeStr = (time) => {
  return time < 10 ? '0' + time : '' + time;
}
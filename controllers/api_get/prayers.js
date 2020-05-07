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
        .then(prays => res.status(200).json(prays))
        .catch(status => {
          mojamma.log (
            `Error in fetch from Aladan`,
            mojamma.logLevels.SERVER_API_ERR,
            __filename,
            "app.get(/prayersTimes/all)",
            null, status
          );
        });

        fetchPrayerTimesFromPrayZone([...prayers[0]], req)
        .then(prays => res.status(200).json(prays))
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
    `http://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${lon}&method=4&month=${month + 1}&year=${year}`;
  
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
              let athanMinutesInt = +prayer.athanMinutes;
              let athanHourInt = +prayer.athanHour;

              if (athanMinutesInt >= prayerApiOffset) {
                prayer.athanMinutes =
                  String(athanMinutesInt - prayerApiOffset);
              }
              else {
                prayer.athanHour = String((athanHourInt || 12) - 1 );
                prayer.athanMinutes = 
                  String(athanMinutesInt + 60 - prayerApiOffset);
              }
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
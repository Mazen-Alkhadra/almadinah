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

        fetchPrayerTimesFromIslamicFinder([...prayers[0]], req)
        .then(prays => res.status(200).json(prays))
        .catch(status => {
          mojamma.log (
            `Error in fetch from islamic finder`,
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

const fetchPrayerTimesFromIslamicFinder = (dbPrays, req) => {
  let prayerTimesApiUrl = '';
  const {alt, lon, lat} = req.query;

  if(alt && lon && lat) 
    prayerTimesApiUrl = `http://www.islamicfinder.us/index.php/api/prayer_times?latitude=${lat}&longitude=${lon}&user_ip=${req.ipAddr}&time_format=0&method=4`;
  else
    prayerTimesApiUrl = `http://www.islamicfinder.us/index.php/api/prayer_times?user_ip=${req.ipAddr}&time_format=0&method=4`;

  return fetch(prayerTimesApiUrl)
    .then(response => {
      if(response.status < 200 || response.status >= 400)
        throw response.status;
      return response.json()
        .then(({results}) => {
          let prayersTimesApiRes = results;
          for (prayer of dbPrays) {
            let prayerApiTime = prayersTimesApiRes[prayer.apiKeyName] || '';
            prayer.athanHour = prayerApiTime.substr(0, 2);
            prayer.athanMinutes = prayerApiTime.substr(3, 2);
          }
          return dbPrays;
        })
        .catch((err) => {
          mojamma.log (
            `Error in fetch from islamic finder`,
            mojamma.logLevels.SERVER_API_ERR,
            __filename,
            "app.get(/prayersTimes/all)",
            null, err
          );
          throw err;
        });
    });
}
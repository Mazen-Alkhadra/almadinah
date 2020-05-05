const mojamma = require('../../bin/mojammaa');
const dbConnect = require('../../database/connect');
const fetch = require('node-fetch');

module.exports = (app, passport) => {

  app.get('/prayersTimes/all', (req, res) => {
    let prayersTimesApiRes = null;
    let prayerTimesApiUrl = 
      `https://api.pray.zone/v2/times/today.json?ip=${req.ipAddr}&school=4`;
    
    console.log("=================", prayerTimesApiUrl, "======================");
    
    res.status(500);
  
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

      fetch(prayerTimesApiUrl)
      .then(response => {
        res.status(response.status);
        response.json()
        .then(({results}) => {
          prayersTimesApiRes = results.datetime[0].times;
          for (prayer of prayers[0]) {
            let prayerApiTime = prayersTimesApiRes[prayer.apiKeyName] || '';
            console.log(prayerApiTime);
            prayer.athanHour = prayerApiTime.substr(0, 2);
            prayer.athanMinut = prayerApiTime.substr(3, 2);
          }
          res.status(200).json(prayers[0]);
        })
        .catch((err) => {
          res.status(500).end();
          mojamma.log (
            `Error in fetch prayerTimes\n`,
            mojamma.logLevels.SERVER_API_ERR,
            __filename,
            "app.get(/prayersTimes/all)",
            null, err
          );
        }); 
      });

    });

  });

};
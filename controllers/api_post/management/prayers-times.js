const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');

module.exports = (app) => {
  app.post('/management/update/prayer_time/', (req, res) => {
    let {
      imageURL,
      prayerTimeId
    } = req.body;
    
    imageURL = imageURL || null;
    prayerTimeId = prayerTimeId || null;
  
    if(!prayerTimeId) {
      res.status(400).end();
      return;
    }

    dbConnect.query(
      'CALL prcUpdatePrayerTime(?);', [[
        req.userLangPref,
        imageURL,
        prayerTimeId
      ]],
      function (err) {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/update/prayer_time/)",
            null, err
          );
          return;
        }
        res.status(200).json({});
    });
  });
  
  app.post('/management/prayer_time/add', (req, res) => {
    let {
      countryId,
      cityId,
      imgURL,
      monthNumber
    } = req.body;
    
    imgURL = imgURL || null;
    cityId = cityId || null;
    countryId = countryId || null;
    monthNumber = monthNumber || null;

    if(!countryId || !cityId) {
      res.status(400).end();
      return;
    }

    dbConnect.query(
      'CALL prcAddPrayerTime(?, @out_prayer_time_id);', [[
        req.userLangPref,
        cityId,
        imgURL,
        monthNumber
      ]],
      function (err) {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/prayer_time/add)",
            null, err
          );
          return;
        }
        res.status(200).json({});
    });
  });

};
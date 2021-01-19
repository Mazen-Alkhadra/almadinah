const mojamma = require('../../bin/mojammaa');
const dbConnect = require('../../database/connect');

module.exports = (app, passport) => {

  app.get('/prayers_times/countries/all', (req, res) => {    
      
      dbConnect.query(
        'CALL prcGetAllPrayersTimesCountries(?);',
        [req.userLangPref],
        (err, countries) => {
          if(err) {
            res.status(500).json();
            mojamma.log (
              `Error in Execution SQL Query: ${this.sql}\n` + err.message,
              mojamma.logLevels.DB_ERR,
              __filename,
              "app.get(/prayers_times/countries)",
              null, err
            );
            return;
          }
          res.status(200).json(countries[0]);
      });
      
  });

  app.get('/prayers_times/cities/:countryId', (req, res) => {    
      
    dbConnect.query(
      'CALL prcGetPrayersTimesCities(?);',
      [[req.userLangPref, req.params.countryId]],
      (err, cities) => {
        if(err) {
          res.status(500).json();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/prayers_times/cities/:countryId)",
            null, err
          );
          return;
        }
        res.status(200).json(cities[0]);
    });
    
  });

  app.get('/prayers_times/imgs/:cityId/:monthNumber', (req, res) => {    
      
    dbConnect.query(
      'CALL prcGetCityPrayersTimesImgs(?);',
      [[req.userLangPref, req.params.cityId, req.params.monthNumber]],
      (err, imgs) => {
        if(err) {
          res.status(500).json();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/prayers_times/imgs/:cityId)",
            null, err
          );
          return;
        }
        res.status(200).json(imgs[0]);
    });
    
  });

  app.get('/prayers_times/months/:cityId', (req, res) => {    
      
    dbConnect.query(
      'CALL prcGetPrayersTimesMonths(?);',
      [[req.userLangPref, req.params.cityId]],
      (err, months) => {
        if(err) {
          res.status(500).json();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/prayers_times/months/:cityId)",
            null, err
          );
          return;
        }
        res.status(200).json(months[0]);
    });
    
  });


};
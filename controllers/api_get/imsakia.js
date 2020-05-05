const mojamma = require('../../bin/mojammaa');
const dbConnect = require('../../database/connect');

module.exports = (app, passport) => {

  app.get('/imsakia/countries/all', (req, res) => {    
      
      dbConnect.query(
        'CALL prcGetAllImsakiaCountries(?);',
        [req.userLangPref],
        (err, countries) => {
          if(err) {
            res.status(500).json();
            mojamma.log (
              `Error in Execution SQL Query: ${this.sql}\n` + err.message,
              mojamma.logLevels.DB_ERR,
              __filename,
              "app.get(/imsakia/countries)",
              null, err
            );
            return;
          }
          res.status(200).json(countries);
      });
      
  });

  app.get('/imsakia/cities/:countryId', (req, res) => {    
      
    dbConnect.query(
      'CALL prcGetImsakiaCities(?);',
      [req.userLangPref, req.params.countryId],
      (err, cities) => {
        if(err) {
          res.status(500).json();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/imsakia/cities/:countryId)",
            null, err
          );
          return;
        }
        res.status(200).json(cities);
    });
    
  });

  app.get('/imsakia/imgs/:cityId', (req, res) => {    
      
    dbConnect.query(
      'CALL prcGetCityImsakiaImgs(?);',
      [req.userLangPref, req.params.cityId],
      (err, imgs) => {
        if(err) {
          res.status(500).json();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/imsakia/imgs/:cityId)",
            null, err
          );
          return;
        }
        res.status(200).json(imgs);
    });
    
  });

};
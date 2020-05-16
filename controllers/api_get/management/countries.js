const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');

module.exports = (app) => {

  app.get('/management/countries/all', (req, res) => {
    dbConnect.query(
      'CALL prcGetAllCountries(?);',
      [req.userLangPref],
      function (err, countries) {
        if (err) {
          res.status(500).json();
          mojamma.log(
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/management/countries/all/)",
            null, err
          );
          return;
        }
        res.status(200).json(countries[0]);
      });
  });

  app.get('/management/cities/:countryId', (req, res) => {
    dbConnect.query(
      'CALL prcGetCountryCities(?);',
      [[req.userLangPref, req.params.countryId]],
      function (err, cities) {
        if (err) {
          res.status(500).json();
          mojamma.log(
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/management/cities/:countryId)",
            null, err
          );
          return;
        }
        res.status(200).json(cities[0]);
      });
  });

};
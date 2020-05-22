const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');

module.exports = (app) => {
  app.post('/management/countries/update', (req, res) => {
    let {
      name,
      imgURL,
      countryId
    } = req.body;
    
    name = name || null;
    imgURL = imgURL || null;
        
    if(!countryId) {
      res.status(400).end();
      return;
    }

    dbConnect.query(
      'CALL prcUpdateCountry(?);', [[
        req.userLangPref,
        name,
        imgURL,
        countryId
      ]],
      function (err) {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/countries/update)",
            null, err
          );
          return;
        }
        res.status(200).json({});
    });

  });
  
  app.post('/management/countries/add', (req, res) => {
    const {
      name,
      imgURL
    } = req.body;
    
    dbConnect.query (
      'CALL prcAddCountry(?, @out_country_id);',
      [[req.userLangPref, name, imgURL]],
      function (err) {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/countries/add)",
            null, err
          );
          return;
        }
        res.status(200).json({});
    });
  });
};
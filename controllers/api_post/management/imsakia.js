const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');

module.exports = (app) => {
  app.post('/management/update/imsakia/', (req, res) => {
    let {
      imageURL,
      imsakiaId
    } = req.body;
    
    imageURL = imageURL || null;
    imsakiaId = imsakiaId || null;
  
    if(!imsakiaId) {
      res.status(400).end();
      return;
    }

    dbConnect.query(
      'CALL prcUpdateImsakia(?);', [[
        req.userLangPref,
        imageURL,
        imsakiaId
      ]],
      function (err) {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/update/imsakia/)",
            null, err
          );
          return;
        }
        res.status(200).json({});
    });
  });
  
  app.post('/management/imsakia/add', (req, res) => {
    let {
      countryId,
      cityId,
      imgURL
    } = req.body;
    
    imgURL = imgURL || null;
    cityId = cityId || null;
    countryId = countryId || null;
  
    if(!countryId || !cityId) {
      res.status(400).end();
      return;
    }

    dbConnect.query(
      'CALL prcAddImsakia(?, @out_imsakia_id);', [[
        req.userLangPref,
        cityId,
        imgURL
      ]],
      function (err) {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/imsakia/add)",
            null, err
          );
          return;
        }
        res.status(200).json({});
    });
  });

};
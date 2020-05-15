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

};
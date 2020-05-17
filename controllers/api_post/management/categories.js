const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');

module.exports = (app) => {
  app.post('/management/add/category/', (req, res) => {
    let {
      displayName,
      type,
      imgURL
    } = req.body;
    
    imgURL = imgURL || null;

    dbConnect.query (
      'CALL prcAddCategory(?, @out_category_id);',
      [[req.userLangPref, displayName, type, imgURL]],
      function (err) {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/add/category/)",
            null, err
          );
          return;
        }
        res.status(200).json({});
    });
  });

  app.post('/management/update/category', (req, res) => {
    let {
      displayName,
      type,
      imgURL,
      categoryId
    } = req.body;
    
    imgURL = imgURL || null;
    type = type || null;
    displayName = displayName || null;

    dbConnect.query (
      'CALL prcUpdateCategory(?, @out_category_id);',
      [[req.userLangPref, displayName, type, imgURL, categoryId]],
      function (err) {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/update/category/)",
            null, err
          );
          return;
        }
        res.status(200).json({});
    });
  });
};
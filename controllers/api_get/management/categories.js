const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');

module.exports = (app) => {

  app.get('/management/categories/all', (req, res) => {
    dbConnect.query(
      'CALL prcGetAllCategories(?);',
      [[req.userLangPref, req.query[typeNum]]],
      function (err, categories) {
        if (err) {
          res.status(500).json();
          mojamma.log(
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/management/categories/all/)",
            null, err
          );
          return;
        }
        res.status(200).json(categories[0]);
      });
  });

};
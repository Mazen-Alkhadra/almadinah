const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');

module.exports = (app) => {

  app.get('/management/sectios/all/', (req, res) => {
    dbConnect.query(
      'CALL prcGetAllSections(?);',
      [req.userLangPref],
      (err, sections) => {
        if (err) {
          res.status(500).json();
          mojamma.log(
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/management/sections/all/)",
            null, err
          );
          return;
        }
        res.status(200).json(sections[0]);
      });
  });

};
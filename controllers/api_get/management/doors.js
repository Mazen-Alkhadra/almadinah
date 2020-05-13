const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');

module.exports = (app) => {

  app.get('/management/doors/all/', (req, res) => {
    dbConnect.query(
      'CALL prcGetAllDoors(?);',
      [req.userLangPref],
      (err, doors) => {
        if (err) {
          res.status(500).json();
          mojamma.log(
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/management/doors/all/)",
            null, err
          );
          return;
        }
        res.status(200).json(doors[0]);
      });
  });

};
const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');

module.exports = (app) => {

  app.get('/management/users/all', (req, res) => {
    dbConnect.query(
      'CALL prcGetAllUsers();',
      function (err, users) {
        if (err) {
          res.status(500).json();
          mojamma.log(
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/management/users/all)",
            null, err
          );
          return;
        }
        res.status(200).json(users[0]);
      });
  });

};
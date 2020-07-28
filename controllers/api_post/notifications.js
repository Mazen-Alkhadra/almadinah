const mojamma = require('../../bin/mojammaa');
const dbConnect = require('../../database/connect');
module.exports = (app) => {

  app.post('/notifications/user/unread/count/reset', (req, res) => {    
    dbConnect.query(
      'CALL prcResetUserUnReadNotifiesCnt(?);',
      [req.user.IdUser],
      (err, result) => {
        if(err) {
          res.status(500).json();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/notifications/user/unread/count/reset)",
            null, err
          );
          return;
        }
        
        res.status(200).json({});
    });    
  });
}
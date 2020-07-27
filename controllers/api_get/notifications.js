const mojamma = require('../../bin/mojammaa');
const dbConnect = require('../../database/connect');

module.exports = (app) => {

  app.get('/notifications/user/all', (req, res) => {    
      
      dbConnect.query(
        'CALL prcGetAllUserNotifies(?);',
        [[req.userLangPref, req.user.id]],
        (err, notifies) => {
          if(err) {
            res.status(500).json();
            mojamma.log (
              `Error in Execution SQL Query: ${this.sql}\n` + err.message,
              mojamma.logLevels.DB_ERR,
              __filename,
              "app.get(/notifications/user/all)",
              null, err
            );
            return;
          }
          res.status(200).json(notifies[0]);
      });
      
  });

  app.get('/notifications/user/unread/count', (req, res) => {    
      
    dbConnect.query(
      'CALL prcGetUserUnReadNotifiesCnt(?);',
      [req.user.id],
      (err, result) => {
        if(err) {
          res.status(500).json();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/notifications/user/unread/count)",
            null, err
          );
          return;
        }
        res.status(200).json(result[0][0]);
    });
    
  });

}
const mojamma = require('../../bin/mojammaa');
const dbConnect = require('../../database/connect');

module.exports = (app, passport) => {

  app.get('/notifications/user/all', (req, res) => {    
      
    let queryStr = 'CALL prcGetPublicNotifies(?);';
    let queryData = [req.userLangPref];

      if (passport.chekAuthority(req)) {
        queryStr = 'CALL prcGetAllUserNotifies(?);';
        queryData = [[req.userLangPref, req.user.IdUser]];
      }

      dbConnect.query(
        queryStr,
        queryData,
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
	req.user = req.user || {};  
    dbConnect.query(
      'CALL prcGetUserUnReadNotifiesCnt(?);',
      [req.user.IdUser],
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

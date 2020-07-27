const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');

module.exports = (app) => {
  app.post('/management/add/assign/notification/', (req, res) => {
    let {
      title,
      content,
      imgUrl,
      userId
    } = req.body;
    
    title = title || null;
    content = content || null;
    userId = userId || null;
    imgUrl = imgUrl || null;

    dbConnect.query (
      'CALL prcAddNotification(?, @out_notification_id);\
       CALL prcAssignNotificationToUser(@out_notification_id, ?);',
      [[req.userLangPref, title, content, imgUrl], userId],
      function (err) {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/add/assign/notification/)",
            null, err
          );
          return;
        }
        res.status(200).json({});
    });
  });

  app.post('/management/add/notification/', (req, res) => {
    let {
      title,
      content,
      imgUrl
    } = req.body;
    
    title = title || null;
    content = content || null;
    imgUrl = imgUrl || null;
    
    dbConnect.query (
      'CALL prcAddNotification(?, @out_notification_id);',
      [[req.userLangPref, title, content]],
      function (err, result) {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/add/notification/)",
            null, err
          );
          return;
        }
        res.status(200).json(result);
    });
  });

  app.post('/management/assign/notification/', (req, res) => {
    let {
      notificationId,
      userId
    } = req.body;
    
    notificationId = notificationId || null;
    userId = userId || null;
    
    dbConnect.query (
      'CALL prcAssignNotificationToUser(?);',
      [notificationId, userId],
      function (err) {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/assign/notification/)",
            null, err
          );
          return;
        }
        res.status(200).json({});
    });
  });

}
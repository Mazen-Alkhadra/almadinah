const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');
const {FcmMsg, fcm} = require('../../../firebase');

module.exports = function (userId, notification) {
  return new Promise ( (resolve) => {
      queryString = 'CALL prcGetAllUsersInsIds(?);';
      dbConnect.query(queryString, [userId], function (err, fbInfoRows) {
          if (err) {
            mojamma.log(
                  `Error in execution sql query: ${this.sql}` + err.message,
                  mojamma.logLevels.DB_ERR, __filename,
                  "pushNotificationTo", null, err
              );
              return;
          }
          fbInfoRows = fbInfoRows[0];

          var fcmMsg = new FcmMsg (
              null,
              null,
              null,
              null,
              notification.title,
              notification.content,
              null,
              null,
              '#dddddd'
          );
          if(fbInfoRows.length === 0) {
              resolve({ status: 200 });
              return;
          }
          fbInfoRows.forEach(fbInfoRow => {
              fcmMsg.token = fbInfoRow.InstanceId;
              fcm.send(fcmMsg)
                  .then((response) => {
                    mojamma.log(
                          `Successfully sent message: ${response}`,
                          mojamma.logLevels.FCM_INFO, __filename,
                          "pushNotificationTo", null
                      );
                      resolve({ status: 200 });
                  })
                  .catch((error) => {
                    mojamma.log(
                          `Error sending message: ${error}`,
                          mojamma.logLevels.FCM_ERR, __filename,
                          "pushNotificationTo", null
                      );
                      resolve({ status: 514 });
                  });
          });
      });
  });
}
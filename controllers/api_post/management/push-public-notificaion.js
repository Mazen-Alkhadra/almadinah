const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');
const { FcmMsg, fcm } = require('../../../firebase');

module.exports = function (notification) {
  return new Promise((resolve) => {
    dbConnect.query('CALL prcGetAllInsIds();', function (err, fbInfoRows) {
      if (err) {
        mojamma.log(
          `Error in execution sql query: ${this.sql}` + err.message,
          mojamma.logLevels.DB_ERR, __filename,
          "pushPublicNotification", null, err
        );
        return;
      }
      fbInfoRows = fbInfoRows[0];

      var fcmMsg = new FcmMsg(
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
      if (fbInfoRows.length === 0) {
        resolve({ status: 200 });
        return;
      }

      fcmMsg.tokens = [];
      fbInfoRows.forEach(
        row => fcmMsg.tokens.push(row.InstanceId)
      );
      
      console.log('################\n', fcmMsg.tokens);

      fcm.sendMulticast(fcmMsg)
        .then((response) => {
          mojamma.log(
            `Successfully sent message: ${JSON.stringify(response)}`,
            mojamma.logLevels.FCM_INFO, __filename,
            "pushPublicNotification", null
          );
          resolve({ status: 200 });
        })
        .catch((error) => {
          mojamma.log(
            `Error sending message: ${error}`,
            mojamma.logLevels.FCM_ERR, __filename,
            "pushPublicNotification", null
          );
          resolve({ status: 514 });
        });
    });
  });
}
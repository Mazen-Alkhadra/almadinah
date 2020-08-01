//Firebase cloud messaging fcm
var fbAdmin = require('firebase-admin');
var serviceAccount = require('./islamk-mojammaa-firebase-adminsdk.json');
fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert(serviceAccount)
});

module.exports = fbAdmin.messaging();
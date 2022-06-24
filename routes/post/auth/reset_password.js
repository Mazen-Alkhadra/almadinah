const {resetPasswordApiPath} = 
  require('../../../config/server').urls;
const Auth = require('../../../services/auth');

module.exports = app => {
  
  app.post(`${resetPasswordApiPath}`, async (req, res) => {
    
    try {
  
      await Auth.resetPassword(
        req.body.resetCode,
        req.body.newPassword
      );      
      
      res.status(200).end();
  
    } catch (err) {
      res.processError(err, 400);
    }
  });

};
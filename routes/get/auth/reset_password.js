const {resetPasswordApiPath} = 
  require('../../../config/server').urls;
const {Auth} = require('../../../services');

module.exports = app => {
  
  app.get(`${resetPasswordApiPath}/code/:loginName`, async (req, res) => {
    
    try {

      await (new Auth).requestResetPassword({
        loginName: req.params.loginName
      });
      res.status(200).end();

    } catch (err) {
      res.processError(err, 400);
    }
        
  });

};
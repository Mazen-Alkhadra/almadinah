const {activationAcountApiPath} = 
  require('../../../config/server').urls;
const {Auth} = require('../../../services');

module.exports = app => {
  
  app.post(`${activationAcountApiPath}`, async (req, res) => {
    
    try {
      let auth = new Auth();
      await auth.activateAcount(req.body.activateCode);
      res.status(200).end();

    } catch (err) {
      res.internalError = err;
      res.processError(err);     
    }
        
  });

  app.post(`${activationAcountApiPath}/code/resend`, async (req, res) => {
    
    try {
      let auth = new Auth();
      await auth.requestAccountActivationCode({
        loginName: req.body.loginName
      });
      res.status(200).end();

    } catch (err) {
      res.internalError = err;
      res.processError(err, 400);
    }
        
  });

};
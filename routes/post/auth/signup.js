const validators = require('../../../services/validators');
const {Auth} = require('../../../services');
const validatorMiddleware = require('../../../middlewares/validator');

module.exports = app => {
  
  app.post('/api/auth/signup', 
    validatorMiddleware(validators.signup),
    async (req, res) => {
      try {            
        await (new Auth).signup(req.body);
        res.status(200).json({});

      } catch(err) {
        res.processError(err);
      }    
  });
  
};
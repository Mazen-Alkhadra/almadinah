const {userLanguageKey} = require('../../config/server').cookie;

module.exports = function (req, res, next) {
  if(req.user) 
    req.user.language = req.cookies[userLanguageKey];
  
  req.language = req.cookies[userLanguageKey];
  
  next();
}
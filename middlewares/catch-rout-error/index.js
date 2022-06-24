const {codes: errCodes} = require('../../resources/errors');

function processErrorByRes(err, defaultStatus) {
  if(!this) 
    return;
  
  if(!err.message)
    return;

  if(Object.values(errCodes).includes(err.message)) {
    this.status(defaultStatus || 409).json({code: err.message});
    return;
  }

  this.internalError = err;
	this.status(500).end();  
}

module.exports = function (req, res, next) {
  res.processError = processErrorByRes;
  next();
}
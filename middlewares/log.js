const logger = require('../services/logger');
const  {userLanguageKey} = require('../config/server').cookie;

function extraxtClientIpFromReq(req) {
  let ipAddr = req.headers["x-forwarded-for"];
    if (ipAddr) {
        var list = ipAddr.split(",");
        ipAddr = list[list.length - 1];
    } 
    else {
        ipAddr = req.connection.remoteAddress;
    }
    
    return ipAddr.trim();
}

module.exports = function (req, res, next) {
  const clientIp = extraxtClientIpFromReq(req);

  logger.log(
    logger.levels.SERVER_API_INFO,
    `New ${req.method} request with url: ${req.url}` +
    `\n\tFrom: ${clientIp}\n\tBody: ${JSON.stringify(req.body)}` +
    `\n\tlangPref: ${req.cookies[userLanguageKey]}\n`,
    __filename,
    "log middleware",
    JSON.stringify(req.cookies)
  );

  res.on('finish', function () {
    logger.log(
      this.internalError ? 
        logger.levels.SERVER_ERR : 
        logger.levels.SERVER_API_INFO,
      `Status ${this.statusCode} Response for ${this.req.method} request with 
        url: ${this.req.url}, 
        Body: ${JSON.stringify(this.req.body)}`,
      __filename,
      "res.on(finish) callback",
      this.internalError ? 
        this.internalError.stack : 
        this.internalError
    );
  });

  next();

}
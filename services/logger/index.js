const LOG_LEVELS = {
  DB_INFO: 'Database Info',
  SERVER_INFO: 'Server Info',
  SERVER_API_INFO: 'API Info',
  SERVER_API_ERR: 'API Error',
  DB_ERR: 'Database Error',
  SERVER_ERR: 'Server Error',
  FTP_ERR: 'FTP Error', 
  CRITICAL_SERVER_INFO: 'Critical Server Info'
};

class Logger {  
  levels = LOG_LEVELS;

  log(logLevel, message, fileName, functionName, moreInfo) {
    
    if(moreInfo && typeof moreInfo === 'object')
      try { 
        moreInfo = JSON.stringify(moreInfo); 
      } catch {}

    var record =
    `======================== ${logLevel} ============================
        Time stamp: ${new Date().toGMTString()}
        Message: ${message}
        File Name: ${fileName}
        FunctionName: ${functionName}
        More information: ${moreInfo}
===================================================================`
    console.log(record);

    if(logLevel == this.levels.DB_ERR ||
      logLevel == this.levels.FTP_ERR || 
      logLevel == this.levels.SERVER_API_ERR || 
      logLevel == this.levels.SERVER_ERR || 
      logLevel == this.levels.CRITICAL_SERVER_INFO
    ) {
      const logModel = require('../../models').log;
      logModel.addNewLog({logText: record, logLevel});
    }

  }
}

module.exports = new Logger();

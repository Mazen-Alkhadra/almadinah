// This module responsible for operations: logging, 
const mojammaa = {};
mojammaa.db = {};
mojammaa.runTimeValues = {};
module.exports = mojammaa;

mojammaa.getStr = require('../localize');

mojammaa.logLevels = {
  DB_INFO: 'Database Info',
  SERVER_INFO: 'Server Info',
  SERVER_API_INFO: 'API Info',
  SERVER_API_ERR: 'API Error',
  DB_ERR: 'Database Error',
  SERVER_ERR: 'Server Error',
  JOB_INFO: 'Job Info',
  JOB_ERR: 'Job Error'
};

mojammaa.log = function (message, logLevel, fileName, functionName, className, moreInfo) {
  var record =
    `======================== ${logLevel} ============================
        Time stamp: ${new Date().toGMTString()}
        Message: ${message}
        File Name: ${fileName}
        FunctionName: ${functionName}
        Class Name: ${className}
        More information: ${moreInfo}
===================================================================`
  console.log(record);
};



mojammaa.config = {
  webSiteUrl: "",
  accountActivationUrl: "",
  resetPasswordURL: "",
  maxWorkersNum: 5,
  DBPoolConnLimit: 2,
  cookies: {
    names: {
      userLangPref: 'langpref'
    }
  },
  db: {
    max_users_connections: 10,
    langs: {
      english: 1,
      arabic: 2,
      default: 1,
      count: 2,

      isValidLangNum: function (num) {
        return num >= 1 && num <= this.count;
      }
    },
    articlesCateg: {
      FASTING_RULES: 1,
      QUARANTINE: 2
    },
    categoriesTypes: {
      ARTICLES: 1,
      CONGRATULATIONS: 2
    },
  },
  ftp: {
    host: 'ftp.scacademy.no',
    user: 'ss-6d5c52db07257210@scacademy.no',
    password: 'mM@12345'
  }
};

mojammaa.runTimeValues.getWorkerForkCount = function () {
  var numWorkers = require('os').cpus().length;
  numWorkers = numWorkers > mojammaa.config.maxWorkersNum ?
    mojammaa.config.maxWorkersNum : numWorkers;
  return numWorkers;
}

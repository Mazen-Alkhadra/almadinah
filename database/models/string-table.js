const mojammaa = require('../../bin/mojammaa');
const dbConnect = require('../connect');

function insertToStringTbl (englishStr, arabicStr, callBack) {
  dbConnect.query('CALL prcInsertString(?, ?, @mojammaa_temp);', [englishStr, arabicStr], function (err, rows) {
    if (err) {
      mojammaa.log(`Error in execution sql query: ${this.sql}` + err.message,
        mojammaa.logLevels.DB_ERR, __filename, "insertToStringTbl", null, err);
      return;
    }
    if (callBack && callBack instanceof Function)
      callBack(rows[0][0].IdString);
  });
}


module.exports = {
  insertToStringTbl
};
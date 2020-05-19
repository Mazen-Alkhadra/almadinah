const mojamma = require('../../bin/mojammaa');
const dbConnect = require('../../database/connect');
const getLocalozeStr = require('../../localize');

module.exports = (app) => {
  app.post('/school/register', (req, res) => {
    if(!req.body) {
      res.status(400).json({
        err: {
          txt: getLocalozeStr('SIGNUP_INFO_NOT_FULL', req.userLangPref),
        }
      });
      return;
    }
    const {
      email,
      firstName,
      lastName,
      gender,
      birthDate,
      mobile
    } = req.body;

    dbConnect.query(
      'CALL prcAddSchoolRegister(?);',
      [[
        firstName,
        lastName,
        email, 
        mobile,
        birthDate,
        null,
        gender,
        null, 
        null, 
        null
      ]],
      function (err) {
        if(err) {
          res.status(400).json({
            err: {
              txt: getLocalozeStr('SIGNUP_INFO_NOT_FULL', req.userLangPref),
            }
          });
          
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/school/register)",
            null, err
          );
          return;
        }
        res.status(200).json({});
    });
  });
}
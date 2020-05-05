const mojamma = require('../../bin/mojammaa');
const dbConnect = require('../../database/connect');
const getLocalozeStr = require('../../localize');

module.exports = (app, passport) => {
  app.post('/user/signup', (req, res) => {
    if(!req.body) {
      res.status(400).json({
        err: {
          txt: getLocalozeStr(SIGNUP_INFO_NOT_FULL, req.userLangPref),
        }
      });
      return;
    }
    const {
      email,
      password,
      firstName,
      lastName,
      birthDate,
      gender
    } = req.body;

    dbConnect.query(
      'CALL prcSignUP(?);',
      [firstName, lastName, email, password, null, birthDate, null, gender],
      (err) => {
        if(err) {
          res.status(400).json({
            err: {
              txt: getLocalozeStr(SIGNUP_INFO_NOT_FULL, langPref),
            }
          });
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/user/signup)",
            null, err
          );
          return;
        }
        res.status(200).end();
    });
  });

  app.post('/user/login', (req, res) => {      
    if(!req.body) {
      res.status(400).json({
        err: {
          txt: getLocalozeStr(SIGNUP_INFO_NOT_FULL, req.userLangPref),
        }
      });
      return;
    }
    
    passport.authenticate('logIn', (err, user, info) => {
      if(err) {
        mojamma.log (
          `Error in passport authentication\n`,
          mojamma.logLevels.SERVER_API_ERR,
          __filename,
          "app.post(/user/login)",
          null, err
        );
        res.status(500).end();
        return;
      }
      
      if(!user) {
        res.status(401).json({
          err: {
            txt: info.message
          }
        });
      }

      res.status(200).end();
    });
  });
};
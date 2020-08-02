const mojamma = require('../../bin/mojammaa');
const dbConnect = require('../../database/connect');

module.exports = (app, passport) => {

  app.get('/user/is_loggedin', (req, res) => {

    if (passport.chekAuthority(req, res)) {
      user.isAdmin = passport.isAdmin(user);
      res.status(200).json(req.user);
    }
  });

  app.get('/user/logout', (req, res) => {

    if (passport.chekAuthority(req, res)) {

        dbConnect.query (
          'CALL prcDeleteUserInsId(?);',
          [[req.user.IdUser, req.sessionID]],
          function (err) {
            if (err) {
              mojamma.log(
                `Error in Execution SQL Query: ${this.sql}\n` + err.message,
                mojamma.logLevels.DB_ERR,
                __filename,
                "app.get(/user/logout)",
                null, err
              );
              return;
            }
          }
        );

        req.logOut();
        res.status(200).json({});      
    }
    
  });

};
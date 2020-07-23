const mojamma = require('../../bin/mojammaa');
const ftpClient = new require('ftp')();

module.exports = (app, passport) => {

  app.get('/ftp/img/:path', function (req, res) {
    ftpClient.on('ready', function () {
      ftpClient.get(req.params.path, function (err, imgFileStram) {
        if (err) {
          res.status(500).json({});
          mojamma.log(
            `Error in get img from ftp server\n` + err,
            mojamma.logLevels.SERVER_ERR,
            __filename,
            "app.get(/ftp/img/:path)",
            null, err
          );
          return;
        }

        imgFileStram.pipe(res);
        //res.status(200).end();
        ftpClient.end();

      });
    });


    ftpClient.on('error', function(err){
      res.status(500).json({});
      mojamma.log (
        `FTP Error`,
        mojamma.logLevels.SERVER_ERR,
        __filename,
        "app.get(/ftp/img/:path)",
        null, err
      );
      return;
    });

    ftpClient.connect(mojamma.config.ftp);
    
  });



};
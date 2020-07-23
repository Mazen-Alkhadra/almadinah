const mojamma = require('../../bin/mojammaa');

module.exports = (app, passport) => {

  app.get('/ftp/img/:path', function (req, res) {
    const ftpClient = new require('ftp')();
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

        res.status(200);
        res.set('Content-Type', 'image/jpeg');
            
        imgFileStram.on('end', function(){
          res.end();
          ftpClient.end();
        });

        imgFileStram.pipe(res);

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
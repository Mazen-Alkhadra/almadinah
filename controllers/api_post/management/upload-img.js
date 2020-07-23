const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });
const ftpClient = new require('ftp')();

module.exports = (app) => {
  app.post('/management/upload/img', upload.single('picture'), function(req, res) {
  
  ftpClient.on('ready', function() {
    console.log('FTP Ready');
  ftpClient.put(req.file.path, req.file.originalname, function(err) {
    if (err) 
      console.log(err);

      ftpClient.end();
    });
  });
  ftpClient.connect({
    host: 'ftp.scacademy.no',
    user: 'ss-6d5c52db07257210@scacademy.no',
    password: 'mM@12345'
  });

    console.log(req.file);
    res.status(200).json({});
  });
};
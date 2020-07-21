const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');
const multer  = require('multer')
const upload = multer();

module.exports = (app) => {
  app.post('/management/upload/img', function(req, res) {
    upload.any()(req, res, function(err){
      console.log(JSON.stringify(err));
      console.log(req.files);
    })
  });
};
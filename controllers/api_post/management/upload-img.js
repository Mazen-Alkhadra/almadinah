const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');
var upload = multer();

module.exports = (app) => {
  app.post('/management/upload/img', upload.any(), function(req, res) {
    console.log(req.files);
  });
};
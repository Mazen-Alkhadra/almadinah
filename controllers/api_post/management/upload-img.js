const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });

module.exports = (app) => {
  app.post('/management/upload/img', upload.single('picture'), function(req, res) {

    


    console.log(req.file);
    res.status(200).json({});
  });
};
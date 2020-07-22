const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' });

module.exports = (app) => {
  app.post('/upload/img', upload.single('avatar'), function(req, res) {
    //console.log(req);
    // upload.single('avatar')(req, res, function(err){
    //   console.log(JSON.stringify(err));
    //   console.log(req.file);
    // })

    console.log(req.file);
    res.status(200).end();
  });
};
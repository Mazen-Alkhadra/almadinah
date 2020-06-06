var fs = require ('fs');

module.exports = (app, passport) => {
  
  app.get('/html/privacy-policy', (req, res) => {
    fs.readFile('../../../views/privacy-policy/index.html', 
    function (err, data) {
      res.end(data);
    });
  });

};
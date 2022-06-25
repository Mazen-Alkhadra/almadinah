const {name: appName} = require('../config/server').app;

module.exports = app => {

  require('./get')(app);
  require('./post')(app);
  require('./delete')(app);
  
  //API not supported
  app.all("*", function(req, res) {
    res.status(404).end(`${appName} Server: Invalid request`);
  });

};
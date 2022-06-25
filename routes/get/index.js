module.exports = app => {  
  require('./auth')(app);
  require('./payment')(app);
  require('./customer')(app);
  require('./bill')(app);
  require('./report')(app);
};
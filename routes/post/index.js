module.exports = app => {  
  require('./auth')(app);
  require('./customer')(app);
  require('./payment')(app);
  require('./bill')(app);
  require('./cash-entry')(app);
  require('./user')(app);
};
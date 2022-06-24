module.exports = app => {  
  require('./customer')(app);
  require('./payment')(app);
  require('./bill')(app);
};
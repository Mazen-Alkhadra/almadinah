module.exports = app => {  
  require('./customer')(app);
  require('./payment')(app);
  require('./bill')(app);
  require('./cash-entry')(app);
  require('./withdraw')(app);
  require('./nitro')(app);
};
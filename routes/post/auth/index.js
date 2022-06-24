module.exports = app => {
  require('./signup')(app);
  require('./login')(app);
  require('./reset_password')(app);
  require('./activate-account')(app);
}
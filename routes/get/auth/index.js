module.exports = app => {
  require('./login')(app);
  require('./logout')(app);
  require('./is-loggedin')(app);
  require('./reset_password')(app);
}
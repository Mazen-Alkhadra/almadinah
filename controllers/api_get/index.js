module.exports = (app, passport) => {
  require('./calendar')(app, passport);
  require('./congrats')(app, passport);
  require('./articles')(app, passport);
  require('./imsakia')(app, passport);
  require('./sections')(app, passport);
  require('./prayers')(app, passport);
  require('./countries')(app, passport);
  require('./management')(app, passport);
  require('./views')(app, passport);
  require('./ftp')(app, passport);
  require('./notifications')(app, passport);
  require('./auth')(app, passport);
  require('./prayers-times')(app, passport);
};
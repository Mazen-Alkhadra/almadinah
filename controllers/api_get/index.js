module.exports = (app, passport) => {
  require('./calendar')(app, passport);
  require('./congrats')(app, passport);
  require('./articles')(app, passport);
  require('./imsakia')(app, passport);
  require('./sections')(app, passport);
  require('./prayers')(app, passport);
  require('./countries')(app, passport);
  require('./management')(app, passport);
};
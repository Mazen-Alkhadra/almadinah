module.exports = (app, passport) => {
  require('./articles')(app);
  require('./doors')(app);
  require('./sections')(app);
  require('./categories')(app);
  require('./imsakia')(app);
}
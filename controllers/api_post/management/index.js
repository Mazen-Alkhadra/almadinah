module.exports = (app, passport) => {
  require('./articles')(app);
  require('./doors')(app);
  require('./sections')(app);
}
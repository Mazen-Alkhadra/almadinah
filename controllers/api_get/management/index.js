module.exports = (app, passport) => {
  require('./articles')(app);
  require('./doors')(app);
  require('./imgs')(app);
  require('./sections')(app);
}
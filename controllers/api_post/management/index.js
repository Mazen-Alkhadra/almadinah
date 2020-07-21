module.exports = (app, passport) => {
  require('./articles')(app);
  require('./doors')(app);
  require('./sections')(app);
  require('./categories')(app);
  require('./imsakia')(app);
  require('./congrats')(app);
  require('./school')(app);
  require('./users')(app);
  require('./countries')(app);
  require('./upload-img')(app);
}

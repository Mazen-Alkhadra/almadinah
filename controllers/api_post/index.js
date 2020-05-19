module.exports = (app, passport) => {
  require('./auth')(app, passport);
  require('./school')(app, passport);
  require('./management')(app, passport);
};
module.exports = (app, passport) => {
  require('./auth')(app, passport);
};
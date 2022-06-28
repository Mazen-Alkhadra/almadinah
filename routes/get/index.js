module.exports = app => {  
  require('./auth')(app);
  require('./payment')(app);
  require('./customer')(app);
  require('./bill')(app);
  require('./report')(app);

  app.get('/*', (req, res) => {
    res.status(200).sendFile(
      path.join(__dirname, '../../public/views/index.html')
    );
  });
};
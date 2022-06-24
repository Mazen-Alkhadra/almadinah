module.exports = app => {
  
  app.get('/api/auth/is_loggedin', (req, res) => {
    
    if (req.isAuthenticated())
      res.status(200).json({
        user: {...req.user, password: null}
      });

    else 
      res.status(200).json({});
    
  });

};
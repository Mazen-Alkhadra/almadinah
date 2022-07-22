module.exports = app => {
  
  app.get('/api/auth/logout', (req, res) => {
    
    req.logout(()=>{});
    res.status(200).end();
    
  });

};
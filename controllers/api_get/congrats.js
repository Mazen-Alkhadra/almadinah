const mojamma = require('../../bin/mojammaa');
const dbConnect = require('../../database/connect');

module.exports = (app, passport) => {

  app.get('/congrats/all/:categoryId', (req, res) => {    
      
      dbConnect.query(
        'CALL prcGetCategoryCongrats(?);',
        [[req.userLangPref, req.params.categoryId]],
        function (err, congrats) {
          if(err) {
            res.status(500).json();
            mojamma.log (
              `Error in Execution SQL Query: ${this.sql}\n` + err.message,
              mojamma.logLevels.DB_ERR,
              __filename,
              "app.get(/congrats/all/:categoryId)",
              null, err
            );
            return;
          }
          res.status(200).json(congrats[0]);
        });
      
  });

  app.get('/congrats/categories', (req, res) => {    
      
    dbConnect.query (
      'CALL prcGetAllCategories(?);',
      [[req.userLangPref, mojamma.config.db.categoriesTypes.CONGRATULATIONS]],
      function (err, imgs) {
      if(err) {
        res.status(500).json();
        mojamma.log (
          `Error in Execution SQL Query: ${this.sql}\n` + err.message,
          mojamma.logLevels.DB_ERR,
          __filename,
          "app.get(/congrats/categories)",
          null, err
        );
        return;
      }
      res.status(200).json(imgs[0]);
    });
    
  });

};
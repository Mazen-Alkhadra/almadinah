const mojamma = require('../../bin/mojammaa');
const dbConnect = require('../../database/connect');

module.exports = (app, passport) => {
  app.get('/articles/fasting/rules/all', (req, res) => {
    const {FASTING_RULES} = mojamma.config.db.articlesCateg;
    dbConnect.query(
      'CALL prcGetCategoryArticles(?);',
      [req.userLangPref, FASTING_RULES],
      (err, articles) => {
        if(err) {
          res.status(500).json();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/articles/fasting/rules/all)",
            null, err
          );
          return;
        }
        res.status(200).json(articles);
    });

  });

  app.get('/articles/quarantine/rules/all', (req, res) => {
    const {QUARANTINE} = mojamma.config.db.articlesCateg;
    dbConnect.query(
      'CALL prcGetCategoryArticles(?);',
      [req.userLangPref, QUARANTINE],
      (err, articles) => {
        if(err) {
          res.status(500).json();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/articles/quarantine/rules/all)",
            null, err
          );
          return;
        }
        res.status(200).json(articles);
    });

  });

  app.get('/articles/content/:idArticle', (req, res) => {

    dbConnect.query(
      'CALL prcGetArticleContent(?);',
      [req.userLangPref, req.params.idArticle],
      (err, articles) => {
        if(err) {
          res.status(500).json();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/articles/content/:idArticle)",
            null, err
          );
          return;
        }
        res.status(200).json(articles);
      });

  });

};
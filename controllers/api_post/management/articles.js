const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');

module.exports = (app) => {
  app.post('/management/update/article/', (req, res) => {
    let {
      title, 
      paragraphs, 
      articleId, 
      imageURL
    } = req.body;
    
    title = title || null;
    imageURL = imageURL || null;

    if(!articleId) {
      res.status(400).end();
      return;
    }

    paragraphs.forEach(paragraph => {
      if(!paragraph)
        return;

      paragraph.title = paragraph.title || null;
      paragraph.txt = paragraph.txt || null;

      dbConnect.query(
        'CALL prcUpdateOrAddParagraph(?);',
        [[req.userLangPref, paragraph.id, articleId, paragraph.title, paragraph.txt]],
        function (err) {
          if(err) {
            res.status(500).end();
            mojamma.log (
              `Error in Execution SQL Query: ${this.sql}\n` + err.message,
              mojamma.logLevels.DB_ERR,
              __filename,
              "app.post(/management/update/article/)",
              null, err
            );
            return;
          }
      });
  
    });

    dbConnect.query(
      'CALL prcUpdateArticle(?);',
      [[req.userLangPref, title, imageURL, articleId]],
      function (err) {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/update/article/)",
            null, err
          );
          return;
        }
        res.status(200).json({});
    });

  });
  
  app.post('/management/add/article/', (req, res) => {
    const {
      title, 
      paragraphs,
      imageURL
    } = req.body;
    
    dbConnect.query (
      'CALL prcAddArticle(?, @out_article_id);',
      [[req.userLangPref, title, imageURL]],
      function (err, result) {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/add/article/)",
            null, err
          );
          return;
        }
        
        let articleId = result[0].idArticle;

        paragraphs.forEach(paragraph => {
          if(!paragraph)
            return;
    
          dbConnect.query(
            'CALL prcUpdateOrAddParagraph(?);',
            [[req.userLangPref, paragraph.id, articleId, paragraph.title, paragraph.txt]],
            function(err) {
              if(err) {
                res.status(500).end();
                mojamma.log (
                  `Error in Execution SQL Query: ${this.sql}\n` + err.message,
                  mojamma.logLevels.DB_ERR,
                  __filename,
                  "app.post(/management/add/article/)",
                  null, err
                );
                return;
              }
          });
        });   
        
        res.status(200).json({});

    });
  });
};
const mojamma = require('../../../bin/mojammaa');
const dbConnect = require('../../../database/connect');

module.exports = (app) => {
  app.post('/management/update/section/', (req, res) => {
    const {
      displayName,
      imageURI,
      sectionId
    } = req.body;
    
    if(!sectionId) {
      res.status(400).end();
      return;
    }

    dbConnect.query(
      'CALL prcUpdateSection(?);',
      [[req.userLangPref, displayName, imageURI, sectionId]],
      (err) => {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/update/section/)",
            null, err
          );
          return;
        }
        res.status(200).end();
    });

  });
  
  app.post('/management/add/section/', (req, res) => {
    const {
      displayName,
      imageURI,
      sectionId
    } = req.body;
    
    dbConnect.query (
      'CALL prcAddSection(?, @out_door_id);',
      [[req.userLangPref, displayName, imageURI]],
      (err) => {
        if(err) {
          res.status(500).end();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.post(/management/add/section/)",
            null, err
          );
          return;
        }
        res.status(200).end();
    });
  });
};
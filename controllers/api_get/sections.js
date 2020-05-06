const mojamma = require('../../bin/mojammaa');
const dbConnect = require('../../database/connect');

module.exports = (app, passport) => {

  app.get('/section/all', (req, res) => {
    dbConnect.query(
      'CALL prcGetAllSections(?);',
      [req.userLangPref],
      (err, sections) => {
        if(err) {
          res.status(500).json();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/section/all)",
            null, err
          );
          return;
        }
        res.status(200).json(sections[0]);
    });

  });

  app.get('/doors/all/:sectionId', (req, res) => {
    dbConnect.query(
      'CALL prcGetSectionDoors(?);',
      [[req.userLangPref, req.params.sectionId]],
      (err, doors) => {
        if(err) {
          res.status(500).json();
          mojamma.log (
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/doors/all/:sectionId)",
            null, err
          );
          return;
        }
        res.status(200).json(doors[0]);
    });

  });

};
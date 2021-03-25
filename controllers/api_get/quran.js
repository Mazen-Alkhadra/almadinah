const mojamma = require('../../bin/mojammaa');
const dbConnect = require('../../database/connect');

module.exports = (app, passport) => {

  app.get('/quran/surah/all', (req, res) => {

    dbConnect.query(
      'CALL prc_get_all_surah(?);',
      [req.userLangPref],
      (err, surahs) => {
        if (err) {
          res.status(500).json();
          mojamma.log(
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/quran/surah/all)",
            null, err
          );
          return;
        }

        res.status(200).json(surahs[0]);

      });
  });

  app.get('/quran/reads/all/surah/:surahId', (req, res) => {

    dbConnect.query(
      'CALL prc_get_all_surah_reads(?);',
      [req.userLangPref, req.params.surahId],
      (err, reads) => {
        if (err) {
          res.status(500).json();
          mojamma.log(
            `Error in Execution SQL Query: ${this.sql}\n` + err.message,
            mojamma.logLevels.DB_ERR,
            __filename,
            "app.get(/quran/reads/all/surah/:surahId)",
            null, err
          );
          return;
        }

        res.status(200).json(reads[0]);
      });
  });
  
}

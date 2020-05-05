const mojamma = require('../../bin/mojammaa');
const fetch = require('node-fetch');
const getLocalozeStr = require('../../localize');

module.exports = (app, passport) => {

  app.get('/calendar/gregTohijri/:gregYear/:gregMonth/:gregDay', (req, res) => {
      const {gregYear, gregMonth, gregDay} = req.params;
      const aladanApiUrl = 
        `http://api.aladhan.com/v1/gToH?date=${gregDay}-${gregMonth}-${gregYear}`;
      
      fetch(aladanApiUrl)
      .then(response => {
        res.status(response.status);
        response.json().then(({data}) => res.json({
          year: data.hijri.year,
          month: data.hijri.month.number,
          day: data.hijri.day
        }))
      });
      
  });

};
const mojamma = require('../../bin/mojammaa');
const fetch = require('node-fetch');
const getLocalozeStr = require('../../localize');

module.exports = (app, passport) => {

  app.get('/calendar/gregTohijri/:gregYear/:gregMonth/:gregDay', (req, res) => {
      const {gregYear, gregMonth, gregDay} = req.params;
      const aladanApiUrl = 
        `https://api.aladhan.com/v1/gToH?date=${gregDay}-${+gregMonth + 1}-${gregYear}`;
      
      fetch(aladanApiUrl)
      .then(response => {
        res.status(response.status);
        response.json().then(({data}) => res.json({
          year: data.hijri.year,
          month: data.hijri.month.number - 1,
          day: data.hijri.day
        }))
      });
      
  });

};
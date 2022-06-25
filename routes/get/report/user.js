const ReportSvc = require('../../../services').Report;

module.exports = app => {

  app.get('/api/user/reports/customer-balance',
    async (req, res) => {
      try {
        let data = await ReportSvc.create().reportCustomerBalanc({
          customerId: req.query.customerId,
          form: req.query.from,
          to: req.query.to
        });

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );
}
const extractFilters = require('../../../middlewares/filters');
const extractSorts = require('../../../middlewares/sorts');
const CustomerSvc = require('../../../services').Customer;

module.exports = app => {

  app.get('/api/user/customer/fullinfo',
    [extractFilters, extractSorts],
    async (req, res) => {
      try {
        let data = await CustomerSvc.create().getAllCustomersFullInfo({
          limit: req.paginate.limit,
          skip: req.paginate.skip,
          filters: req.filters,
          sorts: req.sorts
        });

        res.status(200).json(data);

      } catch (err) {
        res.internalError = err;
        res.status(500).end();
      }
    }
  );
}
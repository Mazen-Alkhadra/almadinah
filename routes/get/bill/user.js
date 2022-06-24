const BillSvc = require('../../../services').Bill;
const extractFilters = require('../../../middlewares/filters');
const extractSorts = require('../../../middlewares/sorts');

module.exports = app => {

	app.get(`/api/user/bill/fullinfo`,
		[extractFilters, extractSorts],
		async (req, res) => {
			try {
				let data = await BillSvc.create().getAllBillsFullInfo({
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

	app.get(`/api/user/bill/:billId/records`,
		[extractFilters, extractSorts],
		async (req, res) => {
			try {
				let data = await BillSvc.create().records.getAllBillsRecordsFullInfo({
					limit: req.paginate.limit,
					skip: req.paginate.skip,
					filters: req.filters,
					sorts: req.sorts,
					billId: req.params.billId
				});

				res.status(200).json(data);

			} catch (err) {
				res.internalError = err;
				res.status(500).end();
			}
		}
	);
};
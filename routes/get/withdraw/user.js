const WithdrawSvc = require('../../../services').Withdraw;
const extractFilters = require('../../../middlewares/filters');
const extractSorts = require('../../../middlewares/sorts');

module.exports = app => {

	app.get(`/api/user/withdraws/fullinfo`,
		[extractFilters, extractSorts],
		async (req, res) => {
			try {
				let data = await WithdrawSvc.create().getAllFullInfo({
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
};
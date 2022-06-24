const BillSvc = require('../../../services').Bill;
const validMiddleware = require('../../../middlewares/validator')
const Validators = require('../../../services/validators');

module.exports = app => {

	app.delete(`/api/user/bill`,
		validMiddleware(Validators.deleteBill),
		async (req, res) => {
			try {
				const { billId } = req.body;

				await BillSvc.create().deleteBill({ billId });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};
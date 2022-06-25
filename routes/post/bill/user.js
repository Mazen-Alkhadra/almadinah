const BillSvc = require('../../../services').Bill;
const validMiddleware = require('../../../middlewares/validator')
const Validators = require('../../../services/validators');

module.exports = app => {

	app.post(`/api/user/bill`,
		validMiddleware(Validators.addBill),
		async (req, res) => {
			try {
				const { customerId, notic, serialNumber, at,
					finalTotal, records } = req.body;

				await BillSvc.create().addBill({
					customerId, notic, serialNumber, at,
					finalTotal, records
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(`/api/user/bill/update`,
		validMiddleware(Validators.updateBill),
		async (req, res) => {
			try {
				const { billId, customerId, notic, serialNumber, at,
					finalTotal, records } = req.body;

				await BillSvc.create().updateBill({
					billId, customerId, notic, serialNumber, at,
					finalTotal, records
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};
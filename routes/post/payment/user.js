const PaymentSvc = require('../../../services').Payment;
const validMiddleware = require('../../../middlewares/validator')
const Validators = require('../../../services/validators');

module.exports = app => {

	app.post(`/api/user/payment`,
		validMiddleware(Validators.addPayment),
		async (req, res) => {
			try {
				const { customerId, notic, serialNumber, at,
					value } = req.body;

				await PaymentSvc.create().add({
					customerId, notic, serialNumber, at,
					value
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(`/api/user/payment/update`,
		validMiddleware(Validators.updatePayment),
		async (req, res) => {
			try {
				const { paymentId, customerId, notic, serialNumber, at,
					value } = req.body;

				await PaymentSvc.create().update({
					paymentId, customerId, notic, serialNumber, at,
					value
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};
const PaymentSvc = require('../../../services').Payment;
const validMiddleware = require('../../../middlewares/validator')
const Validators = require('../../../services/validators');

module.exports = app => {

	app.delete(`/api/user/payment`,
		validMiddleware(Validators.deletePayment),
		async (req, res) => {
			try {
				const { paymentId } = req.body;

				await PaymentSvc.create().delete({ paymentId });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};
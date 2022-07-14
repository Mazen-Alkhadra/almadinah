const WithdrawSvc = require('../../../services').Withdraw;
const validMiddleware = require('../../../middlewares/validator')
const Validators = require('../../../services/validators');

module.exports = app => {

	app.post(`/api/user/withdraw`,
		validMiddleware(Validators.addWithdraw),
		async (req, res) => {
			try {
				const { customerId, notic, serialNumber, at,
					value } = req.body;

				await WithdrawSvc.create().add({
					customerId, notic, serialNumber, at,
					value
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(`/api/user/withdraw/update`,
		validMiddleware(Validators.updateWithdraw),
		async (req, res) => {
			try {
				const { withdrawId, customerId, notic, serialNumber, at,
					value } = req.body;

				await WithdrawSvc.create().update({
					withdrawId, customerId, notic, serialNumber, at,
					value
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};
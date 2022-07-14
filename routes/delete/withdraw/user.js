const WithdrawSvc = require('../../../services').Withdraw;
const validMiddleware = require('../../../middlewares/validator')
const Validators = require('../../../services/validators');

module.exports = app => {

	app.delete(`/api/user/withdraw`,
		validMiddleware(Validators.deleteWithdraw),
		async (req, res) => {
			try {
				const { withdrawId } = req.body;

				await WithdrawSvc.create().delete({ withdrawId });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};
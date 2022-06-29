const CashEntrySvc = require('../../../services').cashEntry;
const validMiddleware = require('../../../middlewares/validator')
const Validators = require('../../../services/validators');

module.exports = app => {

	app.post(`/api/user/cash-entry`,
		validMiddleware(Validators.addCashEntry),
		async (req, res) => {
			try {
				const { notic, serialNumber, at,
					income, outcome } = req.body;

				await CashEntrySvc.create().add({
					notic, serialNumber, at,
    			income, outcome
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(`/api/user/cash-entry/update`,
		validMiddleware(Validators.updateCashEntry),
		async (req, res) => {
			try {
				const { cashEntryId, notic, serialNumber, at,
					income, outcome } = req.body;

				await CashEntrySvc.create().update({
					cashEntryId, notic, serialNumber, at,
    			income, outcome
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};
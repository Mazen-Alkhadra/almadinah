const CashEntrySvc = require('../../../services').cashEntry;
const validMiddleware = require('../../../middlewares/validator')
const Validators = require('../../../services/validators');

module.exports = app => {

	app.delete(`/api/user/cash-entry`,
		validMiddleware(Validators.deleteCashEntry),
		async (req, res) => {
			try {
				const { cashEntryId } = req.body;

				await CashEntrySvc.create().delete({ cashEntryId });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};
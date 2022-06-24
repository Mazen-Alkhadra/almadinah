const CustomerSvc = require('../../../services').Customer;
const validMiddleware = require('../../../middlewares/validator')
const Validators = require('../../../services/validators');

module.exports = app => {

	app.delete(`/api/user/customer`,
		validMiddleware(Validators.deleteCustomer),
		async (req, res) => {
			try {
				const { customerId } = req.body;

				await CustomerSvc.create().deleteCustomer({ customerId });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};
const CustomerSvc = require('../../../services').Customer;
const validMiddleware = require('../../../middlewares/validator')
const Validators = require('../../../services/validators');

module.exports = app => {

	app.post(`/api/user/customer`,
		validMiddleware(Validators.addCustomer),
		async (req, res) => {
			try {
				const { firstName, lastName, mobile, address } = req.body;

				await CustomerSvc.create().addNewCustomer({
					firstName, lastName, mobile, address
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(`/api/user/customer/update`,
		validMiddleware(Validators.updateCustomer),
		async (req, res) => {
			try {
				const { customerId, firstName, lastName,
					mobile, address } = req.body;

				await CustomerSvc.create().updateCustomer({
					customerId, firstName, lastName,
					mobile, address
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};
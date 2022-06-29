const UserSvc = require('../../../services').User;
const validMiddleware = require('../../../middlewares/validator')
const Validators = require('../../../services/validators');

module.exports = app => {

	app.post(`/api/user/profile/update`,
		validMiddleware(Validators.updateProfile),
		async (req, res) => {
			try {
				const {  password } = req.body;

				await UserSvc.create().updateUser({
					userId: req.user.id,
					password
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};
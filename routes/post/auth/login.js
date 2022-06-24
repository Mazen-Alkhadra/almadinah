const { validators, Auth } = require('../../../services');
const validatorMiddleware = require('../../../middlewares/validator');

module.exports = app => {
	
	app.post('/api/auth/login',
		validatorMiddleware(validators.login),
		(req, res) => {
			try {

				Auth.getAuthenticateMiddleware(({ err, user, info }) => {
					try {

						if (err) throw err;

						if (!user) {
							res.status(401).json({
								error: { message: info.message, code: info.code }
							});
							return;
						}

						req.login(user, async function (err) {
							if (err) throw err;
							res.status(200).json({ ...user, password: null });
						});

					} catch (err) {
						res.processError(err);
					}

				})(req, res);

			} catch (err) {
				res.processError(err);
			}

		}
	);

}
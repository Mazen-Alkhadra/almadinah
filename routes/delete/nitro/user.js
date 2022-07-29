const NitroSvc = require('../../../services').Nitro;

module.exports = app => {

	app.delete(`/api/user/nitro`,
		async (req, res) => {
			try {
				const { nitroId } = req.body;

				await NitroSvc.create().delete({ nitroId });

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};
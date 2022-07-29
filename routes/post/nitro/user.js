const NitroSvc = require('../../../services').Nitro;

module.exports = app => {

	app.post(`/api/user/nitro`,
		async (req, res) => {
			try {
				const { notic, serialNumber, at, value } = req.body;

				await NitroSvc.create().add({
					notic, serialNumber, at,
					value
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);

	app.post(`/api/user/nitro/update`,
		async (req, res) => {
			try {
				const { nitroId, notic, serialNumber, at, value } = req.body;

				await NitroSvc.create().update({
					nitroId, notic, serialNumber, at, value
				});

				res.status(200).end();

			} catch (err) {
				res.processError(err);
			}
		}
	);
};
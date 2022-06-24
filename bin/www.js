// server 
const os = require('../services/os');
const cluster = require('cluster');
const logger = require('../services/logger');
const {app: appConfig} = require('../config/server');

if (cluster.isMaster) {
	var numWorkers = os.getWorkerForkCount();
	
	for (var i = 0; i < numWorkers; ++i) {
		let worker = cluster.fork();

		worker.on('exit', function (code, signal) {
			logger.log (
				logger.levels.SERVER_INFO,
				`A worker with id ${worker.id} 
				has exited with code ${code} and signal ${signal}`,
				__filename,
				"worker.on(exit)"
			);
			cluster.fork();
		});

	}

} else {
	
	process.env.NODE_ENV = 'production';
	var app = require('./app');
	app.set('port', (process.env.PORT || 9092));
	app.listen(app.get('port'))
		.headersTimeout = appConfig.headersTimeout;
	logger.log (
    logger.levels.SERVER_INFO,
		`A worker with id ${cluster.worker.id} is listening on port ${app.get('port')}`,
		__filename,
	);

}
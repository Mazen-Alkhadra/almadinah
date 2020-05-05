// server 
const mojammaa = require('./mojammaa');
const cluster = require('cluster');

if (cluster.isMaster) {
	var numWorkers = mojammaa.runTimeValues.getWorkerForkCount();

	for (var i = 0; i < numWorkers; ++i) {
		cluster.fork();
	}

	cluster.on('exit', function (worker, code, signal) {
		mojammaa.log(
			`A worker with id ${worker.id} has exited with code ${code} and signal ${signal}`,
			mojammaa.logLevels.SERVER_INFO,
			__filename,
			"cluster.on(exit)"
		);
		cluster.fork();
	});

} else {
	process.env.NODE_ENV = 'production';
	var app = require('../app');
	app.set('port', (process.env.PORT || 9092));
	app.listen(app.get('port'));
	mojammaa.log(
		`A worker with id ${cluster.worker.id} is listening on port ${app.get('port')}`,
		mojammaa.logLevels.SERVER_INFO,
		__filename,
	);
}
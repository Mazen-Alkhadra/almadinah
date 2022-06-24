const os = require('os');
const clusterConfig = require('../../config/server').cluster;

class OS {
  getWorkerForkCount() {
    var numWorkers = os.cpus().length;
    numWorkers = numWorkers > clusterConfig.maxWorkersNum ?
      clusterConfig.maxWorkersNum : numWorkers;
    return numWorkers;
  }
}

module.exports = new OS();
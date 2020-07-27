var mysql = require("mysql");
var mojammaa = require('../bin/mojammaa');

var connectionPool = mysql.createPool({
  host: "162.241.244.34",
  user: "scacade1_islamsk",
  password: "mM@12345",
  database: "scacade1_mojammaa",
  // host: "eu-cdbr-west-02.cleardb.net",
  // user: "bc7ae6982f8d36",
  // password: "1b040f694e9419a",
  // database: "heroku_edbf40702f92140",
  multipleStatements: true,
  timezone: '+00:00',
  connectionLimit:
    Math.floor(
      mojammaa.config.db.max_users_connections /
      mojammaa.runTimeValues.getWorkerForkCount()
    )
});

//Event connection emit when a new connection is made within the pool  
connectionPool.on('connection', function (connection) {
  const {
    _acquiringConnections,
    _allConnections,
    config
  } = connectionPool;
  mojammaa.log(
    `new connection has created with threadId ${connection.threadId}`,
    mojammaa.logLevels.DB_INFO,
    __filename,
    'connectionPool.on(connection)',
    null,
    `[#ConnAcquired, #AllConn, ConnLimit] = ${[
      _acquiringConnections.length,
      _allConnections.length,
      config.connectionLimit
    ]}`
  );
  connection.query("SET @@SESSION.auto_increment_increment = 1; SET @@session.time_zone='+00:00';")
});

connectionPool.on('enqueue', function () {
  const {
    _acquiringConnections,
    _allConnections,
    config
  } = connectionPool;
  mojammaa.log(
    `Waiting for available connection slot`,
    mojammaa.logLevels.DB_INFO,
    __filename,
    'connectionPool.on(enqueue)',
    null,
    `[#ConnAcquired, #AllConn, ConnLimit] = ${[
      _acquiringConnections.length,
      _allConnections.length,
      config.connectionLimit
    ]}`
  );
});

module.exports = connectionPool;
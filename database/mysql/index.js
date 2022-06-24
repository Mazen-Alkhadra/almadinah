const mysql = require('mysql');
const mysqlConfig  = require('../../config/db').mysql;
const system = require('../../services/os');
const logger = require('../../services/logger');

var connectionPool = mysql.createPool({
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
  multipleStatements: true,
  timezone: '+00:00',
  connectionLimit:
    Math.floor(mysqlConfig.maxUsersConnections / system.getWorkerForkCount()) || 1
});

//Event connection emit when a new connection is made within the pool  
connectionPool.on('connection', function (connection) {
  const {
    _acquiringConnections,
    _allConnections,
    config
  } = connectionPool;

  connection.query(
    "SET @@SESSION.auto_increment_increment = 1;\
    SET @@session.time_zone='+00:00';\
    SET NAMES utf8mb4;\
    SET sql_mode = 'NO_ENGINE_SUBSTITUTION';"
  );

  logger.log(
    logger.levels.DB_INFO,
    `new connection has created with threadId ${connection.threadId}`,
    __filename,
    'connectionPool.on(connection)',
    `[#ConnAcquired, #AllConn, ConnLimit] = ${[
      _acquiringConnections.length,
      _allConnections.length,
      config.connectionLimit
    ]}`
  );

});

//Event connection emit when waiting for connection in the pool  
connectionPool.on('enqueue', function () {
  const {
    _acquiringConnections,
    _allConnections,
    config
  } = connectionPool;

  logger.log(
    logger.levels.DB_INFO,
    'Waiting for available connection slot',
    __filename,
    'connectionPool.on(enqueue)',
    `[#ConnAcquired, #AllConn, ConnLimit] = ${[
      _acquiringConnections.length,
      _allConnections.length,
      config.connectionLimit
    ]}`
  );

});

module.exports = connectionPool;
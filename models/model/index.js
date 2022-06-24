const db = require('../../database');
const logger = require('../../services/logger');
const {
  ERR_CAN_NOT_DELETE_USED_ENTITY
} = require('../../resources').errors.codes;

class Model {
  
  constructor() {
    this.connection = db;
    this.transaction = null;
  }

  directQuery(queryStr, ...queryParams) {
    if (!queryStr) return;
    
    return new Promise((resolve, reject) => {
      let query = this.connection.query(queryStr, queryParams, (err, data) => {
        if (err) {
          logger.log (
            logger.levels.DB_ERR,
            `Error in Execution SQL Query: ${query.sql}\n` + err.message,
            __filename,
            'directQuery'
          );
         
          this.normalizeSqlErr(err);
          this.rollbackTransaction();
        
          reject(err);
        }
        else {
          resolve(data);
        }
      });
    });
  }

  getLimitClause({ limit, skip }) {
    if (limit && skip)
      return ` LIMIT ${skip}, ${limit} `;

    if (skip && !limit)
      return ` LIMIT ${skip}, 100000 `;

    if (limit && !skip)
      return ` LIMIT ${limit} `;

    return '';
  }

  group(data, by) {

    if (!Array.isArray(data))
      return {};

    return data.reduce((result, item) => {
      if (!item[by])
        return result;
      result[item[by]] = result[item[by]] || [];
      result[item[by]].push(item);
      return result;
    }, {});

  }

  mapFilterToSqlClause(column, filterOp, filterVal) {
    filterVal = this.normalizeFilterVal(filterVal);
    switch (filterOp) {
      case 'contains':
        return `${column} LIKE '%${filterVal}%'`;
      case 'notcontains':
        return `${column} NOT LIKE '%${filterVal}%'`;
      case 'startswith':
        return `${column} LIKE '${filterVal}%'`;
      case 'endswith':
        return `${column} LIKE '%${filterVal}'`;
      case 'in':
        if (!filterVal.length)
          filterVal = '[""]';
        return `${column} IN (${this.escapeSql(JSON.parse(filterVal))})`;
      case '=':
        if (filterVal === null)
          return `${column} IS NULL`;
        return `${column} = '${filterVal}'`;
      case '<>':
        return `${column} <> '${filterVal}'`;
      case '<':
        return `${column} < '${filterVal}'`;
      case '>':
        return `${column} > '${filterVal}'`;
      case '>=':
        return `${column} >= '${filterVal}'`;
      case '<=':
        return `${column} <= '${filterVal}'`;
      default:
        return '';
    }
  }

  mapFilterConcatToSqlClause(filterConcat) {
    switch (filterConcat) {
      case 'or':
        return ' OR ';
      default:
        return ' ' + filterConcat + ' ';
    }
  }

  getFiltersSqlCluase(filters) {
    let sqlClause = '';

    if (!Array.isArray(filters))
      throw new Error('filters must be array');

    let filter = [];

    for (filter of filters) {

      if (Array.isArray(filter)) {

        if (Array.isArray(filter[0]))
          sqlClause += this.getFiltersSqlCluase(filter);

        else
          sqlClause += this.mapFilterToSqlClause(...filter);
      }

      else
        sqlClause += this.mapFilterConcatToSqlClause(filter);

    }

    return sqlClause ? `(${sqlClause})` : "TRUE";
  }

  applyFilters(sqlQuery, filters, groupOpt) {

    if (!filters || !filters.length)
      return null;

    let groupCountsClause = '';

    if (groupOpt)
      groupCountsClause =
        `,COUNT(DISTINCT ${groupOpt.groupby}) ${groupOpt.groupCountAlias}`;

    return `
        SELECT COUNT(*) allCount ${groupCountsClause}
        FROM (${sqlQuery}) AS temp_count 
        WHERE ${this.getFiltersSqlCluase(filters)};
        SELECT * FROM (${sqlQuery}) AS temp_data WHERE ${this.getFiltersSqlCluase(filters)} `
  }

  normalizeFilterVal(filterVal) {
    if (filterVal === true)
      return 1;

    else if (filterVal === false)
      return 0;

    return filterVal;
  }

  getOrderClause(sorts) {
    if (!sorts || !Array.isArray(sorts) || !sorts.length)
      return '';

    let orderClause = ' ORDER BY ', index = 0;

    for (index in sorts) {

      orderClause += sorts[index].selector;
      orderClause += sorts[index].desc ? ' DESC' : '';

      if (index < sorts.length - 1)
        orderClause += ',';
    }

    return orderClause + ' ';
  }

  escapeSql(val) {
    return db.escape(val);
  }

  normalizeSqlErr(err) {
    err.message = err.sqlMessage;

    if (err.errno == 1451 && err.sql.includes('delete'))
      err.message = ERR_CAN_NOT_DELETE_USED_ENTITY;
  }

  beginTransaction() {
    return new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) {
          logger.log(
            logger.levels.DB_ERR,
            `Error In Begin SQL Transaction:\n` + err.message,
            __filename,
            'beginTransaction'
          );
          reject(err);
        }

        connection.beginTransaction(error => {
          if (error) {
            logger.log(
              logger.levels.DB_ERR,
              `Error In Begin Connection Transaction:\n` + error.message,
              __filename,
              'beginTransaction'
            );
            connection.rollback(() => connection.release());
            reject(error);
          }
          this.connection = connection;
          this.transaction = { connection };
          resolve();
        });
      });
    });
  }

  commitTransaction() {
    if(!this.transaction)
      return;
    return new Promise((resolve, reject) => {
      let connection = this.transaction.connection;
      this.transaction = null;

      if (!connection) {
        logger.log(
          logger.levels.DB_ERR,
          `Error In Commit SQL Transaction:\nINVALID_TRANSACTION_ID`,
          __filename,
          'commitTransaction'
        );
        reject(new Error('INVALID_TRANSACTION_ID'));
      }

      connection.commit(err => {
        if (err) {
          logger.log(
            logger.levels.DB_ERR,
            `Error In Commit SQL Transaction:\n` + err.message,
            __filename,
            'commitTransaction'
          );

          connection.rollback(err => connection.release());
          reject(err);
        }

        connection.release();
        resolve();
      })
    });
  }

  rollbackTransaction() {
    if(!this.transaction)
      return;
    return new Promise((resolve, reject) => {
      let connection = this.transaction.connection;
      this.transaction = null;

      if (!connection) {
        logger.log (
          logger.levels.DB_ERR,
          `Error In Rollback SQL Transaction:\nINVALID_TRANSACTION_ID`,
          __filename,
          'rollbackTransaction'
        );
        reject(new Error('INVALID_TRANSACTION_ID'));
      }

      connection.rollback(err => {

        if (err) {
          logger.log(
            logger.levels.DB_ERR,
            `Error In rollback SQL Transaction:\n` + err.message,
            __filename,
            'rollbackTransaction'
          );
          connection.release();
          reject(err);
        }

        connection.release();
        resolve();
      })
    });
  }

}

module.exports = Model;
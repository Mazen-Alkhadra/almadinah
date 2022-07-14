const Model = require('../model');

class Withdraw extends Model {
  static TABLE_NAME = 'withdraws';
  static PRIMARY_KEY = 'id_withdraw';
  
  async getAllFullInfo ({
    limit, skip, filters, sorts
  }) {
    let countQuery =
      `SELECT
        COUNT(*) allCount
      FROM
        withdraws;`

    let dataQuery =
      `SELECT
        id_withdraw withdrawId,
        customer_id customerId,
        serial_number serialNumber,
        value,
        notic,
        at
      FROM
        withdraws`;
      
      let summaryQuery =
        `SELECT
          SUM(value) total
        FROM
          (${this.applyFilters( dataQuery, filters, null, true ) || dataQuery}) 
        AS filtered_data;`;

    let queryStr = `${countQuery + dataQuery}`;
        
    queryStr = this.applyFilters( dataQuery, filters ) || queryStr;
    queryStr += `${this.getOrderClause(sorts)}`;
    queryStr += `${this.getLimitClause({ limit, skip })};`;

    queryStr += summaryQuery;

    let dbRet = await this.directQuery(queryStr);

    const {total} = dbRet[2][0];
    
    return {
      allCount: dbRet[0][0].allCount,
      data: dbRet[1],
      summary: [total]
    };

  }
  
  async add ({
    customerId, notic, serialNumber, value, at
  }) {
    
    let queryStr = `CALL prc_add_withdraw(?, @new_entry_id);`    
    let dbRet = await this.directQuery (
      queryStr, 
      [customerId, serialNumber, value, notic, at]
    );

    return {newId: dbRet[0][0].newRecordId};
  }

  async update ({
    withdrawId, customerId, notic, serialNumber, 
    value, at
  }) {
    await this.directQuery (
      'CALL prc_update_withdraw(?);',
       [withdrawId, customerId, serialNumber, value, notic, at]
    );
  }

  async delete ({withdrawId}) {
    await this.directQuery (
      'CALL prc_delete_withdraw(?);',
      withdrawId
    );
  }

}

module.exports = {
  create: () => new Withdraw
};

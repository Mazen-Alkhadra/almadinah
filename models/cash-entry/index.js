const Model = require('../model');

class CashEntry extends Model {
  static TABLE_NAME = 'cash_entries';
  static PRIMARY_KEY = 'id_cash_entry';
  
  async getAllFullInfo ({
    limit, skip, filters, sorts
  }) {
    let countQuery =
      `SELECT
        COUNT(*) allCount
      FROM
        cash_entries;`

    let dataQuery =
      `SELECT
        id_cash_entry cashEntryId,
        serial_number serialNumber,
        income,
        outcome,
        notic,
        at
      FROM
        cash_entries`;

      let summaryQuery =
      `SELECT
        SUM(IFNULL(income, 0)) incomes,
        SUM(IFNULL(outcome, 0)) outcomes
      FROM
        (${this.applyFilters( dataQuery, filters ) || dataQuery}) 
      AS filtered_data;`;

    let queryStr = `${countQuery + dataQuery}`;
        
    queryStr = this.applyFilters( dataQuery, filters ) || queryStr;
    queryStr += `${this.getOrderClause(sorts)}`;
    queryStr += `${this.getLimitClause({ limit, skip })};`;

    queryStr += summaryQuery;

    let dbRet = await this.directQuery(queryStr);

    const {incomes, outcomes} = dbRet[2][0];
    let summary = [incomes, outcomes, incomes - outcomes];

    return {
      allCount: dbRet[0][0].allCount,
      data: dbRet[1],
      summary
    };

  }
  
  async add ({
    notic, serialNumber, income, outcome, at
  }) {
    
    let queryStr = `CALL prc_add_cash_entry(?, @new_entry_id);`    
    let dbRet = await this.directQuery (
      queryStr, 
      [serialNumber, income, outcome, notic, at]
    );

    return {newId: dbRet[0][0].newRecordId};
  }

  async update ({
    cashEntryId, notic, serialNumber, income, outcome, at
  }) {
    await this.directQuery (
      'CALL prc_update_cash_entry(?);',
       [cashEntryId, serialNumber, income, outcome, notic, at]
    );
  }

  async delete ({cashEntryId}) {
    await this.directQuery (
      'CALL prc_delete_cash_entry(?);',
      cashEntryId
    );
  }

}

module.exports = {
  create: () => new CashEntry
};

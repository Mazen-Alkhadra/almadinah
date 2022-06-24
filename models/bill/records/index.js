const Model = require('../../model');

class BillRecord extends Model {
  static TABLE_NAME = 'bills_recordes';
  static PRIMARY_KEY = 'id_bill_record';
  
  async getAllBillsRecordsFullInfo ({
    billId, limit, skip, filters, sorts 
  }) {

    let billIdCond = 
      !billId ? 'TRUE' : `bill_id = ${this.escapeSql(billId)}`;

    let countQuery =
      `SELECT
        COUNT(*) allCount
      FROM
        bills_recordes
      WHERE 
        ${billIdCond};`

    let dataQuery =
      `SELECT
        id_bill_record billRecordId,
        bill_id billId,
        quantity,
        unit_price unitPrice,
        discount, 
        addition,
        notice
      FROM
        bills_recordes
      WHERE 
        ${billIdCond}`;

    let queryStr = `${countQuery + dataQuery}`;
        
    queryStr = this.applyFilters( dataQuery, filters ) || queryStr;
    queryStr += `${this.getOrderClause(sorts)}`;
    queryStr += `${this.getLimitClause({ limit, skip })};`;


    let dbRet = await this.directQuery(queryStr);

    return {
      allCount: dbRet[0][0].allCount,
      data: dbRet[1]
    };

  }
  
  async resetBillRecords ({
    billId, 
    records 
    /*[{quantity, unitPrice, discount, addition, notice}]*/
  }) {
    if(!records || !records.length)
      return;

    let queryStr = 'CALL prc_delete_all_bill_records(?);';
    let queryParams = [billId];

    records.forEach ( 
      ({quantity, unitPrice, discount, addition, notice}) => {
        queryStr += `CALL prc_add_bill_record(?, @new_record_id);`
        queryParams.push([billId, quantity, unitPrice, discount, addition, notice]);
      }
    )
      
    await this.directQuery(queryStr, ...queryParams);
  }

}

module.exports = {
  create: () => new BillRecord
};
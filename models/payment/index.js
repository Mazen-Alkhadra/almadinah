const Model = require('../model');

class Payment extends Model {
  static TABLE_NAME = 'payments';
  static PRIMARY_KEY = 'id_payment';
  
  async getAllFullInfo ({
    limit, skip, filters, sorts
  }) {
    let countQuery =
      `SELECT
        COUNT(*) allCount
      FROM
        payments;`

    let dataQuery =
      `SELECT
        id_payment paymentId,
        customer_id customerId,
        serial_number serialNumber,
        value,
        notic,
        at
      FROM
        payments`;

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
  
  async add ({
    customerId, notic, serialNumber, value, at
  }) {
    
    let queryStr = `CALL prc_add_payment(?, @new_entry_id);`    
    let dbRet = await this.directQuery (
      queryStr, 
      [customerId, serialNumber, value, notic, at]
    );

    return {newId: dbRet[0][0].newRecordId};
  }

  async update ({
    paymentId, customerId, notic, serialNumber, 
    value, at
  }) {
    await this.directQuery (
      'CALL prc_update_payment(?);',
       [paymentId, customerId, serialNumber, value, notic, at]
    );
  }

  async delete ({paymentId}) {
    await this.directQuery (
      'CALL prc_delete_payment(?);',
      paymentId
    );
  }

}

module.exports = {
  create: () => new Payment
};

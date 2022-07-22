const Model = require('../model');

class Customer extends Model {
  static TABLE_NAME = 'customers';
  static PRIMARY_KEY = 'id_customer';

  async getAllCustomersFullInfo({
    limit, skip, filters, sorts
  }) {

    let countQuery =
      `SELECT
        Count(*) allCount
      FROM
        customers;`
      ;

    let dataQuery =
      `SELECT
        id_customer idCustomer,
        first_name firstName,
        last_name lastName,
        CONCAT(first_name, ' ', last_name) fullName,
        mobile,
        address,
        can_Withdraw_from_cash canWithdrawFromCash,
        serial_number serialNumber,
        creat_at creatAt 
      FROM
        customers`;

    let queryStr = `${countQuery + dataQuery}`;

    queryStr = this.applyFilters(dataQuery, filters) || queryStr;
    queryStr += `${this.getOrderClause(sorts)}`;
    queryStr += `${this.getLimitClause({ limit, skip })};`;


    let dbRet = await this.directQuery(queryStr);

    return {
      allCount: dbRet[0][0].allCount,
      data: dbRet[1]
    };

  }

  async addNewCustomer({
    firstName, lastName, mobile, address,
    canWithdrawFromCash, serialNumber
  }) {
    let dbRet = await this.directQuery(
      'CALL prc_add_customer(?, @new_record_id);',
      [firstName, lastName, mobile, address, 
        canWithdrawFromCash, serialNumber]
    );

    return { newId: dbRet[0][0].newRecordId };
  }

  async updateCustomer({
    customerId, firstName, lastName, mobile, address,
    canWithdrawFromCash
  }) {
    await this.directQuery(
      'CALL prc_update_customer(?);',
      [customerId, firstName, lastName, mobile, address, 
        canWithdrawFromCash]
    );
  }

  async deleteCustomer({ customerId }) {
    await this.directQuery(
      'CALL prc_delete_customer(?);',
      customerId
    );
  }

}

module.exports = {
  create: () => new Customer
};
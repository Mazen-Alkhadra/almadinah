const Model = require('../model');

class Report extends Model {
  
  async reportCustomerBalance ({
    customerId, from, to
  }) {
    let queryStr = `CALL prc_report_customer_balance(?);`    
    let dbRet = await this.directQuery (
      queryStr, 
      [customerId, from, to]
    );

    return {
      bills: dbRet[0],
      payments: dbRet[1]
    };
  }
}

module.exports = {
  create: () => new Report
};

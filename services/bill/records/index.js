const BillModel = require('../../../models').bill;

class BillsRecordes {
 
  billModel = BillModel.create();

  async getAllBillsRecordsFullInfo({
    billId, limit, skip, filters, sorts
  }) {    
    return await this.billModel.recordModel.getAllBillsRecordsFullInfo({
      billId, limit, skip, filters, sorts
    });
  }

  async resetBillRecords ({
    billId, records
  }) {
    await this.billModel.recordModel.resetBillRecords({
      billId, records
    });
  }

}

module.exports = {
  create: () => new BillsRecordes
};
const BillModel = require('../../models').bill;
const BillRecordSvc = require('./records');

class Bill {
 
  billModel = BillModel.create();
  records = BillRecordSvc.create();

  async getAllBillsFullInfo({
    limit, skip, filters, sorts
  }) {    
    return await this.billModel.getAllBillsFullInfo({
      limit, skip, filters, sorts
    });
  }

  async getBillDetails({billId}) {
    return await this.billModel.getBillDetails({ billId });
  }

  async addBill ({
    customerId, notic, serialNumber, at,
    records 
  }) {
    await this.billModel.addBill({
      customerId, notic, serialNumber, at,
      records 
    });
  }

  async updateBill ({
    billId, customerId, notic, serialNumber, at,
    records 
  }) {
    await this.billModel.updateBill({
      billId, customerId, notic, serialNumber, at,
      records 
    });
  }

  async deleteBill ({billId}) {
    await this.billModel.deleteBill({ billId });
  }

  }

module.exports = {
  create: () => new Bill
};

const WithdrawModel = require('../../models').Withdraw;

class Withdraw {

  withdrawModel = WithdrawModel.create();

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {
    return await this.withdrawModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async add({
    customerId, notic, serialNumber, at,
    value
  }) {
    await this.withdrawModel.add({
      customerId, notic, serialNumber, at,
      value
    });
  }

  async update({
    withdrawId, customerId, notic, serialNumber, at,
    value
  }) {
    await this.withdrawModel.update({
      withdrawId, customerId, notic, serialNumber, at,
      value
    });
  }

  async delete({ withdrawId }) {
    await this.withdrawModel.delete({ withdrawId });
  }

}

module.exports = {
  create: () => new Withdraw
};

const PaymentModel = require('../../models').payment;

class Payment {

  paymentModel = PaymentModel.create();

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {
    return await this.paymentModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async add({
    customerId, notic, serialNumber, at,
    value
  }) {
    await this.paymentModel.add({
      customerId, notic, serialNumber, at,
      value
    });
  }

  async update({
    paymentId, customerId, notic, serialNumber, at,
    value
  }) {
    await this.paymentModel.updateBill({
      paymentId, customerId, notic, serialNumber, at,
      value
    });
  }

  async delete({ paymentId }) {
    await this.paymentModel.delete({ paymentId });
  }

}

module.exports = {
  create: () => new Payment
};

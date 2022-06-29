const CashEntryModel = require('../../models').cashEntry;

class CashEntry {

  cashEntryModel = CashEntryModel.create();

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {
    return await this.cashEntryModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async add({
    notic, serialNumber, at,
    income, outcome
  }) {
    await this.cashEntryModel.add({
      notic, serialNumber, at,
      income, outcome
    });
  }

  async update({
    cashEntryId, notic, serialNumber, at,
    income, outcome
  }) {
    await this.cashEntryModel.update({
      cashEntryId, notic, serialNumber, at,
      income, outcome
    });
  }

  async delete({ cashEntryId }) {
    await this.cashEntryModel.delete({ cashEntryId });
  }

}

module.exports = {
  create: () => new CashEntry
};

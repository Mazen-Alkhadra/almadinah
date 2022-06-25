const ReportModel = require('../../models').report;

class Report {
  reportModel = ReportModel.create();

  async reportCustomerBalanc({
    customerId, from, to
  }) {
    return await this.reportModel.reportCustomerBalance({
      customerId, from, to
    });
  }
}

module.exports = {
  create: () => new Report
};
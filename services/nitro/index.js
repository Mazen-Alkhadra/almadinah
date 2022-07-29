const NitroModel = require('../../models').Nitro;

class Nitro {

  nitroModel = NitroModel.create();

  async getAllFullInfo({
    limit, skip, filters, sorts
  }) {
    return await this.nitroModel.getAllFullInfo({
      limit, skip, filters, sorts
    });
  }

  async add({
    notic, serialNumber, at, value
  }) {
    await this.nitroModel.add({
      notic, serialNumber, at, value
    });
  }

  async update({
    nitroId, notic, serialNumber, at, value
  }) {
    await this.nitroModel.update({
      nitroId, notic, serialNumber, at, value
    });
  }

  async delete({ nitroId }) {
    await this.nitroModel.delete({ nitroId });
  }

}

module.exports = {
  create: () => new Nitro
};

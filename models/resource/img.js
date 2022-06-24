const Model = require('../model');

class Img extends Model {
   
  async addNewImg({url, sizeInBytes}) {
    let queryStr = 'SELECT fun_insert_img(?);';

    await this.directQuery(
      queryStr, [url, sizeInBytes]
    );
         
  }

}

module.exports = {
  create: () => new Img
};
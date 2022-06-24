const Model = require('../model');

class Log extends Model {
   
  async addNewLog({logText, logLevel}) {
    let queryStr = 'CALL prc_add_log(?);';
    
    await this.directQuery (
      queryStr, [logText, logLevel]
    );
  }

}

module.exports = new Log();
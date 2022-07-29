const Model = require('../model');

class Nitro extends Model {
  static TABLE_NAME = 'nitros';
  static PRIMARY_KEY = 'id_nitro';
  
  async getAllFullInfo ({
    limit, skip, filters, sorts
  }) {
    let countQuery =
      `SELECT
        COUNT(*) allCount
      FROM
        nitros;`

    let dataQuery =
      `SELECT
        id_nitro nitroId,
        serial_number serialNumber,
        value,
        notic,
        at
      FROM
        nitros`;
      
      let summaryQuery =
        `SELECT
          SUM(value) total
        FROM
          (${this.applyFilters( dataQuery, filters, null, true ) || dataQuery}) 
        AS filtered_data;`;

    let queryStr = `${countQuery + dataQuery}`;
        
    queryStr = this.applyFilters( dataQuery, filters ) || queryStr;
    queryStr += `${this.getOrderClause(sorts)}`;
    queryStr += `${this.getLimitClause({ limit, skip })};`;

    queryStr += summaryQuery;

    let dbRet = await this.directQuery(queryStr);

    const {total} = dbRet[2][0];
    
    return {
      allCount: dbRet[0][0].allCount,
      data: dbRet[1],
      summary: [total]
    };

  }
  
  async add ({
    notic, serialNumber, value, at
  }) {
    
    let queryStr = `CALL prc_add_nitro(?, @new_entry_id);`    
    let dbRet = await this.directQuery (
      queryStr, 
      [serialNumber, value, notic, at]
    );

    return {newId: dbRet[0][0].newRecordId};
  }

  async update ({
    nitroId, notic, serialNumber, value, at
  }) {
    await this.directQuery (
      'CALL prc_update_nitro(?);',
       [nitroId, serialNumber, value, notic, at]
    );
  }

  async delete ({nitroId}) {
    await this.directQuery (
      'CALL prc_delete_nitro(?);',
      nitroId
    );
  }

}

module.exports = {
  create: () => new Nitro
};

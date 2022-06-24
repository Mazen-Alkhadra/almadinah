const Model = require('../model');

class String extends Model {
  static languages = {
    EN: 'en',
    AR: 'ar'
  }
  
  getAddNewStringQuery({ enStr, arStr }) {
    const {EN, AR} = String.languages;
    let queryStr = 'SET @new_str_id = NULL;';
    
    if (enStr && arStr) {
      queryStr = 
        `SET @new_str_id = fun_add_string('${EN}', ${this.escapeSql(enStr)});`;
      queryStr += 
        `CALL prc_update_string('${AR}', ${this.escapeSql(arStr)}, @new_str_id);`;
    } else if (enStr) {
      queryStr = 
        `SET @new_str_id = fun_add_string('${EN}', ${this.escapeSql(enStr)});`;
    } else if (arStr) {
      queryStr = 
        `SET @new_str_id = fun_add_string('${AR}', ${this.escapeSql(arStr)});`;
    }

    return queryStr;
  }

  getUpdateStringQuery({ 
    tableName, idColName, idColValue, strColName, enStr, arStr 
  }) {
    const {EN, AR} = String.languages;
    
    let queryStr = `
      UPDATE 
        ${tableName}
      SET 
        ${strColName} = IFNULL(${strColName}, fun_add_string('${EN}', ''))
      WHERE 
        ${idColName} = ${this.escapeSql(idColValue)}
      ;
    `;

    queryStr += `
      SELECT
        @str_id := ${strColName}
      FROM 
        ${tableName}
      WHERE
        ${idColName} = ${this.escapeSql(idColValue)}
      ;
    `;

    if (enStr && arStr) {
      queryStr += 
        `CALL prc_update_string('${EN}', ${this.escapeSql(enStr)}, @str_id);`;
      queryStr += 
        `CALL prc_update_string('${AR}', ${this.escapeSql(arStr)}, @str_id);`;
    } else if (enStr) {
      queryStr += 
        `CALL prc_update_string('${EN}', ${this.escapeSql(enStr)}, @str_id);`;
    } else if (arStr) {
      queryStr += 
        `CALL prc_update_string('${AR}', ${this.escapeSql(arStr)}, @str_id);`;
    } else {
      queryStr = '';
    }

    return queryStr;
  }

  async addNewString({ enStr, arStr }) {
    let queryStr = this.getAddNewStringQuery({enStr, arStr});
    queryStr += 'SELECT @new_str_id AS newStrId;';  

    let dbRet = await this.directQuery( queryStr );
    let newStrInfo = dbRet[1][0] || dbRet[2][0];
    
    return newStrInfo.newStrId;
  }

  async updateString({ 
    tableName, idColName, idColValue, strColName, enStr, arStr
  }) {
    let queryStr = this.getUpdateStringQuery ({
      tableName, idColName, idColValue, strColName, enStr, arStr
    });

    if(!queryStr)
      return;
      
    await this.directQuery( queryStr );
  }

}

module.exports = {
  type: String,
  create: () => new String
};
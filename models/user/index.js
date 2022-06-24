const Model = require('../model');

class User extends Model {

  async findUser ({
    loginName, email, mobile, userId
  }) {
    mobile = this.fixMobile({mobile});
    let emailCond = !email ? 'TRUE' : 
      `email = ${this.escapeSql(email)}`;
    let mobileCond = !mobile ? 'TRUE' : 
      `mobile = ${this.escapeSql(mobile)}`;
    let userIdCond = !userId ? 'TRUE' : 
      `id_user = ${this.escapeSql(userId)}`;
    let loginNameCond = !loginName ? 'TRUE' : 
      `email = ${this.escapeSql(loginName)} OR 
      mobile = ${this.escapeSql(this.fixMobile({mobile: loginName}))}`;

    let queryStr = 
      `SELECT
        id_user id,
        first_name firstName,
        last_name lastName,
        email,
        mobile,
        password, 
        role_id roleId,
        auth_method authMethod,
        is_active isActive
      FROM
        users
      WHERE
       ${emailCond} AND 
       ${mobileCond} AND 
       ${userIdCond} AND 
       ${loginNameCond};`;

      let dbRet = await this.directQuery(queryStr);

      if(dbRet.length == 0 ||  dbRet.length > 1) 
        return null;

      return dbRet[0];      
  }

  async addNewUser ({
    firstName, lastName, password, 
    email, mobile, birthDate, gender,
    imgUrl, roleId, authMethod, isActive
  }) {
  
    let queryStr = 'CALL prc_signup(?);';

    await this.directQuery(queryStr,
      [firstName, lastName, email, mobile, 
        password, birthDate, gender, roleId, imgUrl,
        isActive, authMethod]
    );
  }

  async addActivationCode ({code, loginName}) {
  
    let queryStr = 'CALL prc_add_activation_code(?);';

    let dbRet = await Model.directQuery(queryStr,
      [loginName, code]
    );

    if(dbRet[0] && dbRet[0][0])
      return dbRet[0][0];
  
    return dbRet;
  
  }  

  async activateAccount (activateCode) {
  
    let queryStr = 'CALL prc_activate_user_account(?);';

    await Model.directQuery(queryStr, activateCode);      
  }
  
  async addResetPasswordCode ({code, loginName}) {
  
    let queryStr = 'CALL prc_add_reset_password_code(?);';

    await Model.directQuery(queryStr, [loginName, code]);
  }

  async resetPassword (resetCode, newPassword) {
  
    let queryStr = 'CALL prc_reset_user_password(?);';

    await Model.directQuery(queryStr, [resetCode, newPassword]);    
  }

  fixMobile({mobile}) {
    if(!mobile)
      return null;

    if(mobile[0] === '0' && mobile[1] === '0')
      mobile = mobile.slice(2);
    if(mobile[0] === '0' || mobile[0] === '+')
      mobile = mobile.slice(1);
    if(mobile.length < 12) 
      mobile = '963' + mobile;

    return mobile;
  }

}

module.exports = {
  create: () => new User
};
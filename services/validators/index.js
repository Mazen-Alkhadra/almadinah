const {
  isEmail,
  isAlpha,
  isAlphanumeric,
  isMobilePhone
} = require('validator');
const {
  ERR_INVALID_EMAIL,
  ERR_INVALID_FIRSTNAME,
  ERR_INVALID_LASTNAME,
  ERR_INVALID_PASSWORD,
  ERR_INVALID_MOBILE,
  ERR_INVALID_USER_NAME
} = require('../../resources/errors').codes;

let validators = {
  signup: function ({
    firstName, lastName, email, password,
    mobile, birthDate, gender
  }) {
    console.log(this.constructor);
    if (!validators.isAlphaName(firstName))
      return { error: { code: ERR_INVALID_FIRSTNAME } };

    if (!validators.isAlphaName(lastName))
      return { error: { code: ERR_INVALID_LASTNAME } };

    if (!email || !isEmail(email))
      return { error: { code: ERR_INVALID_EMAIL } };

    if (!mobile || !isMobilePhone(mobile))
      return { error: { code: ERR_INVALID_MOBILE } };

    if (!password)
      return { error: { code: ERR_INVALID_PASSWORD } };

    return { valid: true };
  },

  login: function ({ }) {
    return { valid: true };
  },

  isAlphaName: function (str) {
    if (!str)
      return false;

    if (!isAlpha(str + '', 'ar') &&
      !isAlpha(str + '', 'en-US'))
      return false;

    return true;
  },

  addCustomer: function ({ }) {
    return { valid: true };
  },

  updateCustomer: function ({ }) {
    return { valid: true };
  },

  deleteCustomer: function ({ }) {
    return { valid: true };
  },

  addBill: function ({ customerId }) {
    if(!customerId) 
      return { valid: false };
    return { valid: true };
  },
  updateBill: function ({ billId }) {
    if(!billId) 
      return { valid: false };
    return { valid: true };
  },
  deleteBill: function ({ billId }) {
    if(!billId) 
      return { valid: false };
    return { valid: true };
  },

  addPayment: function ({ customerId }) {
    if(!customerId) 
      return { valid: false };

    return { valid: true };
  },
  updatePayment: function ({ paymentId }) {
    if(!paymentId) 
      return { valid: false };
    return { valid: true };
  },
  deletePayment: function ({ paymentId }) {
    if(!paymentId) 
      return { valid: false };
    return { valid: true };
  },

};

module.exports = validators;
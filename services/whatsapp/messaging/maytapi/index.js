const axios = require('axios');
const {
  apiUrl
} = require('../../../../config/server').whatsapp.maytapi;
const logger = require('../../../logger');

const DEVICE_STATUS = {
  CONNECTED: 'CONNECTED',
  NOT_CONNECTED: 'NOT_CONNECTED',
  NEED_SCAN: 'NEED_SCAN',
  UNKNOWN: 'UNKNOWN'
}

class MayTapi {

  constructor() {    
    this.productId = 'c177cb1e-e542-4d8a-ab3f-b04475cdd5b6';
    this.apiToken = '3f0e16d7-e092-4e30-a84b-de9c49ffa54a';
    this.phoneId = '20942';
  }

  async getAllContacts() {
    try {
      const {data: response} = await axios({
        method: 'get',
        url: `${apiUrl}/${this.productId}/${this.phoneId}/contacts`,
        headers: {'x-maytapi-key': `${this.apiToken}`}
      });

      if(!this.isRequestSuccess(response))
        throw response;

      const {data: contacts} = response;

      logger.log (
        logger.levels.SERVER_API_INFO,
        `MayTapi Get ${contacts.length} Contacts success`,
        __filename,
        'MayTapi::getAllContacts'
      );

      return contacts;

    } catch (err) {
      logger.log (
        logger.levels.SERVER_API_ERR,
        `MayTapi Get Contacts failed`,
        __filename,
        'MayTapi::getAllContacts',
        JSON.stringify(err)
      );
      throw err;
    }

  }

  async sendMessage({
    toMobileNumber, toContactId, content, type
  }) {
    try {
      const {data: response} = await axios({
        method: 'post',
        url: `${apiUrl}/${this.productId}/${this.phoneId}/sendMessage`,
        headers: {
          'x-maytapi-key': `${this.apiToken}`,
          'Content-Type': 'application/json'          
        },
        data: {
          to_number: toContactId || toMobileNumber,
          message: content,
          type          
        }
      });

      if(!this.isRequestSuccess(response))
        throw response;
      
      const {data: message} = response;

      logger.log (
        logger.levels.CRITICAL_SERVER_INFO,
        `MayTapi send message success`,
        __filename,
        'MayTapi::sendMessage',
        JSON.stringify(message)
      );
      
      return message;

    } catch (err) {
      logger.log (
        logger.levels.SERVER_API_ERR,
        `MayTapi send message retrun error`,
        __filename,
        'MayTapi::sendMessage',
        JSON.stringify(err)
      );
    }
  }

  async redeployPhone() {
    try {
      const { data: response } = await axios({
        method: 'get',
        url: `${apiUrl}/${this.productId}/${this.phoneId}/redeploy`,
        headers: { 'x-maytapi-key': `${this.apiToken}` }
      });

      if (!this.isRequestSuccess(response))
        throw response;

      logger.log(
        logger.levels.SERVER_API_INFO,
        `MayTapi redeploy phone success`,
        __filename,
        'MayTapi::redeployPhone'
      );

    } catch (err) {
      logger.log(
        logger.levels.SERVER_API_ERR,
        `MayTapi redeploy phone failed`,
        __filename,
        'MayTapi::redeployPhone',
        JSON.stringify(err)
      );
      throw err;
    }

  }

  async getQR() {
    try {
      const { data, headers } = await axios({
        method: 'get',
        url: `${apiUrl}/${this.productId}/${this.phoneId}/qrCode`,
        headers: { 'x-maytapi-key': `${this.apiToken}`},
        responseType: 'arraybuffer'
      });

      if (!headers['content-type'].includes('image'))
        throw data;

      logger.log(
        logger.levels.SERVER_API_INFO,
        `MayTapi Get QR Success`,
        __filename,
        'MayTapi::getQR'
      );
    
      return {
        qr: data,
        mimeType: headers['content-type'],
        size: headers['content-length']
      };

    } catch (err) {
      logger.log(
        logger.levels.SERVER_API_ERR,
        `MayTapi Get QR failed`,
        __filename,
        'MayTapi::getQR',
        JSON.stringify(err)
      );
      throw err;
    }
  }

  async getPhoneStatus() {
    try {
      const { data: response } = await axios({
        method: 'get',
        url: `${apiUrl}/${this.productId}/${this.phoneId}/status`,
        headers: { 'x-maytapi-key': `${this.apiToken}` }
      });

      if (!this.isRequestSuccess(response))
        throw response;

      logger.log(
        logger.levels.SERVER_API_INFO,
        `MayTapi check status phone success`,
        __filename,
        'MayTapi::checkStatus'
      );

      return this.normalizeDeviceStatus(response.status);

    } catch (err) {
      logger.log(
        logger.levels.SERVER_API_ERR,
        `MayTapi check status phone failed`,
        __filename,
        'MayTapi::checkStatus',
        JSON.stringify(err)
      );
      throw err;
    }
  }

  async isPhoneConnected() {
    try {
      let status = await this.getPhoneStatus();
      return status === DEVICE_STATUS.CONNECTED;
    } catch(err) {
      return false;
    }
  }

  waitUntilPhoneConnected(timeoutInMS) {
    return new Promise((resolve, reject) => {
      let timeoutId, intervalId;
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        reject();
      }, timeoutInMS);

      intervalId = setInterval(async () => {
        if( await this.isPhoneConnected() ) {
          clearTimeout(timeoutId);
          clearInterval(intervalId);
          resolve();
        }
      }, 5000);

    });
  }

  async syncContacts({OBBranchId}) {
    await this.redeployPhone();
    await this.waitUntilPhoneConnected(60 * 1000);
    await this.waitUntilPhoneConnected(60 * 1000);
    const contacts = await this.getAllContacts();

    if(!Array.isArray(contacts))
      return;

    return await WhatsappContactsSvc.addWhatsappContactsAndOBContacts({
      contacts: contacts.map( contact => {
        contact.idWhatsappContact = contact.id;
        contact.mobile = this.getMobileFromId(contact.id);
        contact.type = contact.type == 'group' ? 
          ContactsSvc.CONTACTS_TYPES.GROUP : ContactsSvc.CONTACTS_TYPES.PERSON;
        return contact;
      }),
      OBBranchId
    });    
  }

  isRequestSuccess(response) {
    return response && response.success;
  }

  getMobileFromId(id) {
    return id.substr(0, id.indexOf('@'));
  }

  normalizeDeviceStatus(maytapiStatus) {
    if(!maytapiStatus)
      return DEVICE_STATUS.UNKNOWN;

    if(maytapiStatus.isQr) 
      return DEVICE_STATUS.NEED_SCAN;

    if(maytapiStatus.state && !maytapiStatus.state.canSend)
      return DEVICE_STATUS.NOT_CONNECTED;

    if(maytapiStatus.loggedIn && !maytapiStatus.loading 
      && !maytapiStatus.connRetry)
        return DEVICE_STATUS.CONNECTED;

    return DEVICE_STATUS.NOT_CONNECTED;
  }
}


module.exports = MayTapi;
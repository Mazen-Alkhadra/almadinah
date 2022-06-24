const nodemailer = require("nodemailer");
const {name: appName} =  require('../../config/server').app;
const {host, port, userName, password, isSecure} = 
  require('../../config/server').emailServer;
const {serverBaseUrl, resetPasswordPagePath} = 
  require('../../config/server').urls;
const logger = require('../logger');

let transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: isSecure, // true for 465, false for other ports
  auth: {
    user: userName, 
    pass: password,
  },
});


class Emailer {

  async sendMail(to, subject, text, html, attachmentsUrls) {
    try {
      let attachments = [];
      if(attachmentsUrls && attachmentsUrls.length)
        attachmentsUrls.forEach(url => attachments.push({path: url}));

      let info = await transporter.sendMail({
        from: userName,
        to,
        subject,
        text,
        html,
        attachments
      });

      logger.log(
        logger.levels.SERVER_INFO,
        JSON.stringify(info),
        __filename,
        'sendMail'
      );

      return true;

    } catch(err) {
      
      logger.log(
        logger.levels.SERVER_ERR,
        err.message,
        __filename,
        'sendMail',
        err
      )
      
      return false;
    }
  }

  sendActivationCode (
    userFirstName, userLastName, userEMail, activationCode
  ) {

    let mailBodyHtml = 
      `Dear <b>${userFirstName} ${userLastName},</b>
      <p>Thank you for your registeration in our platform,</p>
      <p>To activate your new account, please enter the follwing code in the activation form:</p>
      <p><b>${activationCode}</b></p>
      <p>Best regards.</p>`;

    this.sendMail(
      userEMail,
      `${appName} Account Activation`,
      null,
      mailBodyHtml
    );

  }

  sendResetPasswordLink (
    userFirstName, userLastName, userEMail, resetCode
  ) {

    const resetUrl = 
      `${serverBaseUrl}${resetPasswordPagePath}/${resetCode}`;

    let mailBodyHtml = 
      `Dear <b>${userFirstName} ${userLastName},</b>
      <p>Please follow the link below in order to reset your new account's password:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>Best regards.</p>`;

    this.sendMail(
      userEMail,
      `${appName} Reset Password`,
      null,
      mailBodyHtml
    );

  }

  async sendAwardsInfoToUser (
    userFirstName, userLastName, userEMail, 
    awardName, awardPhoto
  ) {

    let mailBodyHtml = 
      `Dear <b>${userFirstName} ${userLastName},</b>
      <p>We are pleased to inform you that you have won with us the flowing award:</p>
      <p>${awardName}</p>
      <p><img src="${awardPhoto}" /></p>
      <p>Please Contact us to receive the award</p>
      <p>Best regards.</p>`;

    Emailer.sendMail(
      userEMail,
      `${appName} Awards`,
      null,
      mailBodyHtml
    );
  }
 
}

module.exports = Emailer;
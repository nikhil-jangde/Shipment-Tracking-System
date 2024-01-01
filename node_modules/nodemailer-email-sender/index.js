
const emailSender = ({ mailService, senderUser, senderEmail, senderPassword, receiverEmail, subject, html }) => {
    try {
      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
        service: mailService,
        auth: {
          user: senderUser,
          pass: senderPassword
        }
      });
  
      var mailOptions = {
        from: senderEmail,
        to: receiverEmail,
        subject: subject,
        html: html
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  module.exports = emailSender;
const nodemailer = require('nodemailer');

const mailConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'sammie.okon@ethereal.email',
      pass: 'XdJU1JMZTvjs4S3awu'
  }
};

module.exports = nodemailer.createTransport(mailConfig);
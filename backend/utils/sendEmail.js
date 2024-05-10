const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.MAIL_PORT,
      service: process.env.SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASS,
      },
    });
    const mailOptions = {
      form: process.env.EMAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

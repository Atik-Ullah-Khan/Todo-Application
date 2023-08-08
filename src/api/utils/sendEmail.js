/***
 * Title : Send email.
 * Author : Atik Ullah Khan.
 * Description : Send email using nodemailer.
 * Date : 04/12/2022.
 ***/

const nodemailer = require("nodemailer");
const { company_email, email_password } = require("../../config/variables");

const buildTemplate = require("../../templates/password-reset");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: company_email,
    pass: email_password,
  },
});

const sendEmail = ({ email, name, link }) => {
  const template = buildTemplate({ name, link });

  const options = {
    from: `Simpto ${company_email}`,
    to: email,
    subject: "Reset Password",
    html: template,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(options, function (error, info) {
      if (error) reject(error);
      else resolve(info);
    });
  });
};

module.exports = sendEmail;

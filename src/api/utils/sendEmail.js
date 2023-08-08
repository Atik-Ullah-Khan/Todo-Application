/***
 * Title : Send email.
 * Author : Atik Ullah Khan.
 * Description : Send email using nodemailer.
 * Date : 04/12/2022.
 ***/

const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { company_email, email_password } = require("../../config/variables");

const templatePath = path.join(
  __dirname,
  "../../templates/password-reset.html"
);
const htmlTemplate = fs.readFileSync(templatePath, "utf-8");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: company_email,
    pass: email_password,
  },
});

const generateTemplate = (name, link, email) => {
  return htmlTemplate
    .replace("[User's Name]", name)
    .replaceAll("[Reset Link]", link);
};

const sendEmail = ({ email, name, link }) => {
  const template = generateTemplate(name, link);

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

/***
 * Title : Send email.
 * Author : Atik Ullah Khan.
 * Description : Send email using nodemailer.
 * Date : 04/12/2022.
 ***/

const nodemailer = require("nodemailer");
const { company_email, email_password } = require("../../config/variables");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: company_email,
    pass: email_password,
  },
});

const generateTemplate = (name, link) => {
  const html = `<!DOCTYPE html>
<html lang="en-US">
  <head>
    
  </head>
  <body
    marginheight="0"
    topmargin="0"
    marginwidth="0"
    style="margin: 0px; background-color: #f2f3f8"
    leftmargin="0"
  >
    <div  style=" padding:50px; height:300px;">
      <h1 style="color: #565656; font-weight: bold;"> Hi ${name} </h1>
      <h2 style="font-weight: bold;">You have requested to reset your password.</h2>
      <p>A unique link to reset your password has been generated for you. To reset your password, click the following link. The link is valid for only 5 minutes.</p>
      <p> ${link} </p>
    </div>

  </body>
</html>`;
  return html;
};

const sendEmail = ({ email, name, link }) => {
  const template = generateTemplate(name, link);

  const options = {
    from: company_email,
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

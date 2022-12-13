/***
 * Title : Applicaton variables.
 * Author : Atik Ullah Khan.
 * Description : All the environmnet variables of the application.
 * Date : 24/11/2022.
 ***/

const variables = {
  port: process.env.PORT || 3000,
  mongo_connection_string: process.env.MONGO_CONNECTION_STRING,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.ACCESS_TOKEN_SECRET,
  reset_token_secret: process.env.RESET_TOKEN_SECRET,
  company_email: process.env.COMPANY_EMAIL,
  email_password: process.env.EMAIL_PASSWORD,
};

module.exports = variables;

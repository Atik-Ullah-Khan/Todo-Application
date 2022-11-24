/***
 * Title : Applicaton variables.
 * Author : Atik Ullah Khan.
 * Description : All the environmnet variables of the application.
 * Date : 24/11/2022.
 ***/

const variables = {
  port: process.env.PORT,
  mongo_connection_string: process.env.MONGO_CONNECTION_STRING,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.ACCESS_TOKEN_SECRET,
};

module.exports = variables;

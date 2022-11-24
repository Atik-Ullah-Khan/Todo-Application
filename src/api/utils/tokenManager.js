/***
 * Title : Token manager.
 * Author : Atik Ullah Khan.
 * Description : Manage access-token and refresh-token.
 * Date : 24/11/2022.
 ***/

const jwt = require("jsonwebtoken");
const {
  access_token_secret,
  refresh_token_secret,
} = require("../../config/variables");

const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = access_token_secret;
    const options = {
      expiresIn: "5m",
      issuer: "simto.com",
      audience: userId,
    };

    jwt.sign(payload, secret, options, (error, token) => {
      if (error) reject(error);

      resolve(token);
    });
  });
};

module.exports = { signAccessToken };

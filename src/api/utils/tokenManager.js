/***
 * Title : Token manager.
 * Author : Atik Ullah Khan.
 * Description : Manage access-token and refresh-token.
 * Date : 24/11/2022.
 ***/

const CustomError = require("../../config/CustomError");
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
      expiresIn: "30m",
      issuer: "simto.com",
      audience: userId,
    };

    jwt.sign(payload, secret, options, (error, token) => {
      if (error) reject(error);

      resolve(token);
    });
  });
};

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return next(new CustomError(401, "unauthorized access"));

  const token = authHeader.split(" ")[1];

  jwt.verify(token, access_token_secret, (error, payload) => {
    if (error) return next(new CustomError(401, "unauthorized access"));
    req.userId = payload.aud;
    next();
  });
};

const signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = refresh_token_secret;
    const options = {
      expiresIn: "30d",
      issuer: "simto.com",
      audience: userId,
    };

    jwt.sign(payload, secret, options, (error, token) => {
      if (error) reject(error);

      resolve(token);
    });
  });
};

const verifyRefreshToken = () => {};

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};

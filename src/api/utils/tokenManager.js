/***
 * Title : Token manager.
 * Author : Atik Ullah Khan.
 * Description : Manage access-token and refresh-token.
 * Date : 24/11/2022.
 ***/

const jwt = require("jsonwebtoken");
const CustomError = require("../../config/CustomError");
const {
  reset_token_secret,
  access_token_secret,
  refresh_token_secret,
} = require("../../config/variables");

const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};

    const secret = access_token_secret;
    const options = {
      expiresIn: "1h",
      issuer: "simpto.com",
      audience: userId,
    };

    jwt.sign(payload, secret, options, (error, token) => {
      if (error) reject(error);

      resolve(token);
    });
  });
};

const verifyAccessToken = (req, _res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return next(
      new CustomError(401, "you need to login or sign up to continue")
    );

  const token = authHeader.split(" ")[1];

  jwt.verify(token, access_token_secret, (error, payload) => {
    if (error)
      return next(
        new CustomError(401, "you need to login or sign up to continue")
      );
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

const signResetToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = reset_token_secret;
    const options = {
      expiresIn: "5m",
      issuer: "simpto.com",
      audience: userId,
    };

    jwt.sign(payload, secret, options, (error, token) => {
      if (error) reject(error);

      resolve(token);
    });
  });
};

const verifyResetToken = (req, _res, next) => {
  const { token } = req.body;

  if (!token) return next(new CustomError(400, "invalid reset token"));
  jwt.verify(token, reset_token_secret, (error, payload) => {
    if (error) return next(new CustomError(400, "token validity expired"));
    next();
  });
};

module.exports = {
  signResetToken,
  signAccessToken,
  signRefreshToken,
  verifyResetToken,
  verifyAccessToken,
  verifyRefreshToken,
};

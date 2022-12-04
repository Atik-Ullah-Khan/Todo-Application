/***
 * Title :  Authentication.
 * Author : Atik Ullah Khan.
 * Description : Authentication related operatons of User.
 * Date : 24/11/2022.
 ***/

const User = require("../models/user");
const CustomError = require("../../config/CustomError");

const sendEmail = require("../utils/sendEmail");
const uuid = require("../utils/userIdGenerator");
const hashPassword = require("../utils/hashPassword");
const { signAccessToken, signResetToken } = require("../utils/tokenManager");

// module scaffolding.
const user = {};

// create a new user.
user.signUp = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  const isExist = await User.findOne({ email });
  if (isExist) return next(new CustomError(409, `${email} already exists`));

  const hashedPassword = await hashPassword(password);

  const userObject = {
    userId: uuid(),
    fullName,
    email,
    password: hashedPassword,
  };

  await new User(userObject).save();

  res.status(201).json({
    status: 201,
    message: "user created successfully",
  });
};

// login to the user.
user.logIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new CustomError(400, "invalid email or password"));

  const user = await User.findOne({ email });
  if (!user) return next(new CustomError(400, "invalid email or password"));

  const validPassword = await user.validatePassword(password);
  if (!validPassword)
    return next(new CustomError(400, "invalid email or password"));

  const token = await signAccessToken(user.userId);

  const returnUser = (({ userId, fullName, email, verified }) => ({
    userId,
    fullName,
    email,
    verified,
  }))(user);

  res.status(200).json({
    status: 200,
    message: "logged in successfully",
    token,
    user: returnUser,
  });
};

//logout from the user.
user.logOut = async (_req, res, _next) => {
  res.status(200).json({
    status: 200,
    message: "logged out successfully",
  });
};

// generate forget password link.
user.forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new CustomError(404, "invalid email"));

  const token = await signResetToken(user.userId);
  const resetURL = `http://127.0.0.1:5173/user/reset/?userId=${user.userId}&token=${token}`;

  await sendEmail({
    email,
    name: user.fullName,
    link: resetURL,
  });

  res.status(200).json({
    status: 200,
    message: "possword reset link has sent",
  });
};

// reset password.
user.resetPassword = async (req, res, next) => {
  const { userId, password } = req.body;

  const user = await User.findOne({ userId });
  if (!user) return next(new CustomError(400, "invalid user credentials"));

  const hashedPassword = await hashPassword(password);

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({
    status: 200,
    message: "password has been reset",
  });
};

module.exports = user;

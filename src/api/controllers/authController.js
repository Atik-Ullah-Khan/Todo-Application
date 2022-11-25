/***
 * Title :  Authentication.
 * Author : Atik Ullah Khan.
 * Description : Authentication related operatons of User.
 * Date : 24/11/2022.
 ***/

const User = require("../models/user");
const uuid = require("../utils/userIdGenerator");
const CustomError = require("../../config/CustomError");
const { signAccessToken } = require("../utils/tokenManager");

// module scaffolding.
const user = {};

// create a new user.
user.signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const isExist = await User.findOne({ email });
  if (isExist) return next(new CustomError(409, `${email} already exists`));

  const userObject = { userId: uuid(), firstName, lastName, email, password };

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
    return next(new CustomError(400, "invalid credentials"));

  const user = await User.findOne({ email });
  if (!user) return next(new CustomError(400, "invalid credentials"));

  const validPassword = await user.validatePassword(password);
  if (!validPassword) return next(new CustomError(400, "invalid credentials"));

  const token = await signAccessToken(user.userId);

  res.status(200).json({
    status: 200,
    message: "loged in successfully",
    token,
  });
};

//logout from the user.
user.logOut = async (_req, res, _next) => {
  res.status(200).json({
    status: 200,
    message: "loged out successfully",
  });
};

module.exports = user;

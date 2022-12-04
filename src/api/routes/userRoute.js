/***
 * Title : Authentication routes.
 * Author : Atik Ullah Khan.
 * Description : All the routes related to Authentication.
 * Date : 24/11/2022.
 ***/

const router = require("express").Router();

// middlewares.
const { verifyResetToken: auth } = require("../utils/tokenManager");
const asyncWrapper = require("../middlewares/asyncWrapper");

// controllers.
const {
  signUp,
  logIn,
  logOut,
  forgetPassword,
  resetPassword,
} = require("../controllers/userController");

router.route("/signup").post(asyncWrapper(signUp));
router.route("/login").post(asyncWrapper(logIn));
router.route("/logout").post(asyncWrapper(logOut));
router.route("/forget-password").post(asyncWrapper(forgetPassword));
router.use(auth).route("/reset-password").post(asyncWrapper(resetPassword));

module.exports = router;

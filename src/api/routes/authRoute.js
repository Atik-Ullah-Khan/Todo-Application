/***
 * Title : Authentication routes.
 * Author : Atik Ullah Khan.
 * Description : All the routes related to Authentication.
 * Date : 24/11/2022.
 ***/

const router = require("express").Router();

// middlewares.
const asyncWrapper = require("../middlewares/asyncWrapper");

// controllers.
const { signUp, logIn, logOut } = require("../controllers/authController");

router.route("/signup").post(asyncWrapper(signUp));
router.route("/login").post(asyncWrapper(logIn));
router.route("/logout").post(asyncWrapper(logOut));

module.exports = router;

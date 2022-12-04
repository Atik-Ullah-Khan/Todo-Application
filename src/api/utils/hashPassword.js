/***
 * Title : Hash password.
 * Author : Atik Ullah Khan.
 * Description : Generat hashed password from the plain password.
 * Date : 04/12/2022.
 ***/

const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = hashPassword;

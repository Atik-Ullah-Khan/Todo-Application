/***
 * Title : User model.
 * Author : Atik Ullah Khan.
 * Description : Create "User" model from User schema.
 * Date : 24/11/2022.
 ***/

const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    userId: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function save(next) {
//   if (!this.isModified("password")) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   return next();
// });

userSchema.methods = {
  async validatePassword(data) {
    return bcrypt.compare(data, this.password);
  },
};

const User = model("user", userSchema);

module.exports = User;

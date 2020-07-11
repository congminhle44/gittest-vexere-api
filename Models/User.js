const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  userType: { type: String, default: "client" },
  avatar: { type: String },
});

userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(user.password, salt))
    .then((hash) => {
      user.password = hash;
      next();
    });
});

const User = mongoose.model("User", userSchema, "User");

module.exports = {
  userSchema,
  User,
};

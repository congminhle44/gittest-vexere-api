const { User } = require("../../../../Models/User");
const { signupMailer } = require("../../../../Service/email/signupEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const _ = require("lodash");

const signupUser = (req, res, next) => {
  const { email, password, fullName, userType } = req.body;

  const newUser = new User({ email, password, fullName, userType });
  newUser
    .save()
    .then((user) => {
      signupMailer(user);
      res.status(200).json(user);
    })
    .catch((err) => res.json(err));
};

const jwtSign = promisify(jwt.sign);

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  let _user;

  User.findOne({ email })
    .then((user) => {
      _user = user;
      if (!email) return Promise.reject({ message: "Email not found" });
      return bcrypt.compare(password, _user.password);
    })
    .then((isMatch) => {
      if (!isMatch) return Promise.reject({ message: "Wrong password" });
      const payLoad = _.pick(_user, [
        "_id",
        "email",
        "password",
        "fullName",
        "userType",
      ]);

      return jwtSign(payLoad, "congminhle", { expiresIn: 3600 });
    })
    .then((token) => {
      res.status(200).json({
        id: _user._id,
        email: _user.email,
        password: _user.password,
        fullName: _user.fullName,
        userType: _user.userType,
        token,
      });
    })
    .catch((err) => res.json(err));
};

const uploadAvatar = (req, res, next) => {
  const { email } = req.user; //req.user lấy từ header còn req.body là lấy từ dữ liệu người dùng nhập vào từ body
  User.findOne({ email })
    .then((user) => {
      if (!user)
        return Promise.reject({ status: 401, message: "Email not exist" });
      user.avatar = req.file.path;
      return user.save();
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      if (err.status === 400)
        return res.status(err.status).json({ message: err.message });
      return res.json(err);
    });
};

const getUserList = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.json(err));
};

module.exports = {
  signupUser,
  loginUser,
  getUserList,
  uploadAvatar,
};

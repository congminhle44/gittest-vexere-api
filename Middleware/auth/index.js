const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const jwtVerify = promisify(jwt.verify);

const authenticate = (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(403).json({ message: "Token not found" });
  jwtVerify(token, "congminhle")
    .then((decode) => {
      req.user = decode;
      next();
    })
    .catch((err) => {
      res.status(401).json({ message: "Token Invalid" });
    });
};

const authorize = (userTypeArray) => {
  return (req, res, next) => {
    const { user } = req;
    if (userTypeArray.indexOf(user.userType) === -1)
      return res
        .status(403)
        .json({ message: "You don't have permission to access" });
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};

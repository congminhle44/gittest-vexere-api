const express = require("express");
const router = express.Router();
const { uploadImage } = require("../../../../Middleware/uploadImages");
const { authenticate } = require("../../../../Middleware/auth");

const userController = require("./user.controller");

router.post("/user/signup", userController.signupUser);
router.post("/user/login", userController.loginUser);
router.get("/user", userController.getUserList);
router.patch(
  "/user/avatar",
  authenticate,
  uploadImage(),
  userController.uploadAvatar
);

module.exports = router;

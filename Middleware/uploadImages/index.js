const multer = require("multer");

module.exports.uploadImage = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./upload/avatars");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage });
  return upload.single("avatar"); //avatar là key
};

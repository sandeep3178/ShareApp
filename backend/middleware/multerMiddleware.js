var multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: "./public/",

  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  }
});

var uploadServer = multer({ storage: storage });

module.exports = uploadServer;

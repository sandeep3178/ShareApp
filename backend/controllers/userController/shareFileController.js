const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var uploadServer = require("../../middleware/multerMiddleware");
var router = express.Router();
router.use(cors());
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  next();
});
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var sharefile = require("../../models/shareFileModel");

/* API CONTROLLER FOR HANDLING SHARED FILES */
router.post(
  "/sharefile",
  uploadServer.array("multiImage", 10),
  async (req, res) => {
    var filePath = [];
    for (let i = 0; i < req.files.length; i++) {
      filePath.push(req.files[i].path);
    }
    fileobj = {
      sharedTo: req.body.email,
      sharedBy: JSON.parse(req.headers.header2),
      sharedFiles: filePath
    };
    var user = new sharefile(fileobj);
    user.save((err, doc) => {
      res.send(doc);
    });
  }
);

module.exports = router;

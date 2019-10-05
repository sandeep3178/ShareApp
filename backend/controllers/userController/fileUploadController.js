var express = require("express");
var router = express.Router();
var uploadServer = require("../../middleware/multerMiddleware");

const Register = require("../../models/registerModel");

router.use(express.static("./public/"));

/* API CONTROLLER TO SAVE UPLOADED FILE PATH INTO USER'S DB */
router.post("/fileupload", uploadServer.array("multiImage", 10), function(
  req,
  res
) {
  var user = JSON.parse(req.headers.header2);
  var filePath = [];
  for (let i = 0; i < req.files.length; i++) {
    filePath.push(req.files[i].path);
    Register.findOneAndUpdate(
      { firstName: user },
      {
        $addToSet: {
          uploadedFiles: req.files[i].path
        }
      },
      (err, doc) => {
        if (err) {
          res.status(400).send(err);
        } else {
        }
      }
    );
  }
  res.json(filePath);
  console.log(filePath);
});

/* API CONTROLLER FOR DOWNLOADING File */
router.get("/download", function(req, res, next) {
  var user = JSON.parse(req.headers.header2);
  Register.findOne(
    { firstName: user },
    { _id: 0, uploadedFiles: 1 },
    (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        res.send(doc.uploadedFiles);
      }
    }
  );
});
/* API CONTROLLER FOR DELETING FILE FROM MY FILE */
router.post("/delete", (req, res) => {
  var user = JSON.parse(req.headers.header2);
  Register.findOneAndUpdate(
    { firstName: user },
    {
      $pull: {
        uploadedFiles: req.headers.header6
      }
    },
    (err, doc) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json("deleted");
      }
    }
  );
});
module.exports = router;

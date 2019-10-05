const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Register = require("../../models/registerModel");
var Bcrypt = require("bcrypt");

var cookieParser = require("cookie-parser"); // module for parsing cookies

var router = express.Router();
router.use(cookieParser());
router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));

//cors middleware
router.use(bodyParser.json());
router.post("/login", async (req, res) => {
  result = await Register.findOne({ email: req.body.email }, (err, doc) => {
    if (err) {
      res.status(404);
      // res.status(200).send(result)
    }
  });
  var email = req.body.email;
  var mypass = req.body.password,
    myuser = req.body.username;
  /* BCRYPT MIDDLEWARE TO COMPARE LOGIN PASSWORD AND HASHED PASSED WHILE LOGGING IN */
  Bcrypt.compare(mypass, result.password, (err, match) => {
    console.log(match);
    if (match == true && result.active === true && myuser == result.firstName) {
      res.json({ message: "success" });

      // console.log("success")
    } else {
      res.json({ message: "unsuccessful" });
    }
  });
});

module.exports = router;

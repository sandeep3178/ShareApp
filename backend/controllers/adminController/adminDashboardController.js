const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Grid = require("gridfs-stream");

const Register = require("../../models/registerModel");

var cookieParser = require("cookie-parser");

var mongoose = require("mongoose");

var router = express.Router();
router.use(cors());
router.use(cookieParser());
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const mongoURI = "mongodb://127.0.0.1:27017/shareapp";

// // Create Mongo Connection
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true });

// Init gfs
let gfs;

conn.once("open", () => {
  // Init Stream
  gfs = Grid(conn.db, mongoose.mongo);

  gfs.collection("uploads");
});

router.use(express.static("./upload"));

/* API CONTROLLER TO GET ALL THE REGISTERED USER ON ADMIN DASHBOARD */
router.get("/getUsers", async (req, res) => {
  Register.find({}, (err, doc) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.json(doc);
      console.log(doc);
    }
  });
});
/* API CONTROLLER TO FETCH IMAGES FROM USERS AND SHOW IT ON ADMIN PAGE */
router.get("/getImage/:filename", async (req, res) => {
  console.log(req.params);
  var user = req.params.filename;
  await gfs.files.findOne({ filename: user }, { img: 1 }, function(err, file) {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: "No file exist" });
    }
    // check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      var readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
      console.log(res);
    } else {
      return res.status(404).json({ err: "Not an image" });
    }
    var dataLength = 0;
    // using a readStream that we created already
    readstream
      .on("data", function(chunk) {
        dataLength += chunk.length;
      })
      .on("end", function() {
        // done
        console.log("The length was:", dataLength);
      });
  });
});

/* API CONTROLLER FOR BLOCKING USER */
router.post("/block/:id", async (req, res) => {
  var user = req.params.id;
  console.log(user);
  await Register.findOneAndUpdate(
    { _id: user },
    {
      $set: {
        active: false
      }
    },
    (err, doc) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json("blocked");
        console.log("user blocked");
      }
    }
  );
});
/* API CONTROLLER FOR UNBLOCKING USER */
router.post("/unblock/:id", async (req, res) => {
  var user = req.params.id;
  console.log(user);
  await Register.findOneAndUpdate(
    { _id: user },
    {
      $set: {
        active: true
      }
    },
    (err, doc) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json("unblock");
        console.log("user unblock");
      }
    }
  );
});
module.exports = router;

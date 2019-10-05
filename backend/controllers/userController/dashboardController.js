const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var upload = require("../../middleware/uploadMiddleware");

const Grid = require("gridfs-stream");

const Register = require("../../models/registerModel");

var cookieParser = require("cookie-parser");

var mongoose = require("mongoose");
var {
  checkToken
} = require("../../backendUtility/checkToken"); /* checkToken middleware to provide route protection */
//necessary middlewares
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

/* API CONTROLLER FOR UPLOADING PROFILE IMAGE TO DB */

router.post("/dashboard", upload.single("image"), async (req, res) => {
  var user = JSON.parse(req.headers.header2);
  Register.findOneAndUpdate(
    { firstName: user },
    { $set: { img: req.file.filename } },
    (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        res.json(req.file);
      }
    }
  );
});

/* API CONTROLLER FOR RETREVING FILE FROM DB */

router.get("/file/:filename", (req, res) => {
  var user = req.params.filename;

  gfs.files.findOne({ filename: user }, function(err, file) {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: "No file exist" });
    }
    // check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      var readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
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
/* API CONTROLLER FOR DYNAMICALLY CHANGING PROFILE PIC */
router.get("/profile/:_id", async (req, res) => {
  console.log(req.params);
  var user = req.params._id;
  var result = await Register.findOne({ _id: user });
  console.log(result.img);
  gfs.files.findOne({ filename: result.img }, function(err, file) {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: "No file exist" });
    }
    // check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      var readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
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
/* API TO GET ID OF CURRENT USER FROM DB */
router.get("/dashboard", async (req, res) => {
  var user = JSON.parse(req.headers.header2);
  var result = await Register.findOne(
    { firstName: user },
    { _id: 1 },
    (err, doc) => {
      if (err) {
        res.json(err);
      } else {
        res.send(doc);
      }
    }
  );
});
/* API CONTROLLER FOR  SEARCHING THE FRIEND AND SENDING HIM FRIEND REQUEST */

router.post("/dashboard/search", async (req, res) => {
  var searchuser = req.headers.header3;

  console.log(searchuser);

  result = await Register.findOne(
    {
      $or: [
        { email: JSON.parse(searchuser) },
        { firstName: JSON.parse(searchuser) }
      ]
    },
    { _id: 0, firstName: 1, email: 1 },

    (err, doc) => {
      if (err) {
        res.status(404);
        // res.status(200).send(result)
      } else {
        res.send(doc);
      }
    }
  );
  console.log(result);
});

/* API CONTROLLER TO ADD FRIEND ON DASHBOARD ROUTE */
router.post("/dashboard/addfriend", async (req, res) => {
  var user = JSON.parse(req.headers.header2);
  var searchuser1 = JSON.parse(req.headers.header3);
  var counter = JSON.parse(req.headers.header4);
  console.log(searchuser1);
  console.log(counter);
  if (user == searchuser1) {
    res.json("retreat");
  } else {
    Register.findOneAndUpdate(
      {
        $or: [{ email: searchuser1 }, { firstName: searchuser1 }]
      },
      {
        $push: {
          newRequest: counter
        }
      },
      (err, doc) => {
        if (err) {
          res.send(err);
        } else {
          console.log("saved successfully");
        }
      }
    );
  }
});

/* API CONTROLLER FOR DASHBOARD COMPONENT USED TO FETCH NUMBER OF PENDING REQUEST FROM DB */

router.get("/dashboard/get", async (req, res) => {
  var user = JSON.parse(req.headers.header2);
  var result = await Register.findOne(
    { firstName: user },
    { _id: 0, newRequest: 1 },
    (err, doc) => {
      if (err) {
        res.status(400).send(error);
      } else {
        res.json(doc);
      }
    }
  );
  console.log(result);
});

/* API CONTROLLER FOR FINDING THE REQUESTED USER AND SEND HIM TO FRIEND LIST AND PULL HIM FROM PENDING REQUEST LIST */

router.post("/dashboard/accept", async (req, res) => {
  var user = JSON.parse(req.headers.header2);
  var accept = req.headers.header5;
  console.log(accept);

  Register.findOneAndUpdate(
    { firstName: user },
    {
      $addToSet: {
        friends: accept
      },

      $pull: {
        newRequest: accept
      }
    },

    (err, doc) => {
      if (err) {
        res.status(400).send(err);
      } else {
        console.log("friend added");
      }
    }
  );

  res.json("friend request accepted");
});

/* API FOR SHOWING FRIEND LIST ON DASHBOARD */
router.get("/dashboard/friendlist", async (req, res) => {
  var currentUser = JSON.parse(req.headers.header2);
  await Register.findOne(
    { firstName: currentUser },
    { _id: 0, friends: 1 },
    (err, doc) => {
      if (err) {
        res.status(400).send(err);
      } else {
        console.log(doc);
        res.json(doc);
      }
    }
  );
});
/* API CONTROLLER FOR SHOWING IMAGE OF MYFRIENDS */
router.get("/myfriendImg/:username", (req, res) => {
  gfs.files.findOne({ metadata: req.params.username }, { img: 1 }, function(
    err,
    file
  ) {
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
module.exports = router;

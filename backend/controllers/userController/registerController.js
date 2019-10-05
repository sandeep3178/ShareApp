const express = require("express");

var cors = require("cors");

const router = express.Router();
var Bcrypt = require("bcrypt");
var main = require("../../backendUtility/nodeMailer");
var upload = require("../../middleware/uploadMiddleware");
var Register = require("../../models/registerModel");
router.use(cors());
/* // ==================================================profile pic upload using multer============================= */

//post api  for server using server controller
/* API FOR POSTING THE REGISTRATION TIME DATA TO DB AND CONVERTING PLAIN TEXT PASSWORD IN HASHED FORMAT */
router.post("/register", upload.single("image"), async (request, response) => {
  var email = request.body.email;
  var reqtok = await main(email);
  console.log(reqtok);

  console.log(email);
  try {
    request.body.password = Bcrypt.hashSync(request.body.password, 10);
    userobj = {
      ...request.body,
      img: request.file.filename,
      verifyToken: reqtok
    };
    var user = new Register(userobj);
    var result = await user.save();
    // Register.save({ email });
    response.json(result);

    console.log(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

/* VERIFY API FOR VERIFYING THE TOKEN RECIEVED BY USER ON EMAIL TO AUTHENTICATE HIM A GENUINE USER */

router.post("/verify", async (request, response) => {
  var token = request.body.token;
  var reqtok = await Register.findOne(
    { email: request.body.email },
    (err, doc) => {
      if (err) {
        res.status(404);
      }
    }
  );
  reqtoken = reqtok.verifyToken;
  console.log(token);
  console.log(reqtoken);
  if (reqtoken === token) {
    await Register.findOneAndUpdate(
      { email: request.body.email },
      { active: true }
    );
    response.json({ message: "success" });
    console.log("successful");
  } else {
    response.status(500).send("error");
  }
});

module.exports = router;

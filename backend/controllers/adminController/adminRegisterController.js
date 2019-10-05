const express = require("express");
const adminRegister = require("../../models/adminModel");

const bodyParser = require("body-parser");
const cors = require("cors");

var router = express.Router();
router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));

router.use(bodyParser.json());
/* ===========================================TODO============================================== */
adminRegister({
  name: "admin1",
  email: "admin1@gmail.com",
  Password: "adminpass"
});

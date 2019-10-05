const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var router = express.Router();
router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));

router.use(bodyParser.json());

/* API CONTROLLER TO AUTHENTICATE ADMIN */

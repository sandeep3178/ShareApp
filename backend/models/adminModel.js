const mongoose = require("mongoose");
var schema = mongoose.Schema;

var admin = new schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
});
var adminRegister = new mongoose.model("adminRegister", admin);
module.exports = { adminRegister };

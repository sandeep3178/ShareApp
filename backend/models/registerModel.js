const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {
    type: String,

    unique: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  address1: {
    type: String
  },
  phone: {
    type: String
  },
  password: {
    type: String
  },
  img: {
    type: String,
    data: Buffer
  },

  active: {
    type: Boolean,
    default: false
  },
  verifyToken: {
    type: String
  },

  newRequest: {
    type: Array
  },
  friends: {
    type: Array,
    unique: true
  },
  uploadedFiles: {
    type: Array
  }
});

var Register = mongoose.model("Register", UserSchema);

module.exports = Register;

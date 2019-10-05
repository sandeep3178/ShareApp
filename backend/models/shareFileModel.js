const mongoose = require("mongoose");
var schema = mongoose.Schema;
var shareFile = new schema({
  sharedTo: {
    type: String
  },
  sharedBy: {
    type: String
  },
  sharedFiles: {
    type: Array
  }
});
var sharefile = mongoose.model("sharefile", shareFile);

module.exports = sharefile;

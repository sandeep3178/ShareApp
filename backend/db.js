const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shareapp",
  err => {
    if (!err) {
      console.log("connection successful.You may proceed");
    } else {
      console.log("soory!you are not connected to database");
    }
  }
);

const express = require("express");
var bodyParser = require("body-parser");

var app = express();
require("./db");
const port = process.env.port || 3000;
var loginController = require("./controllers/userController/loginController");
var registerController = require("./controllers/userController/registerController");
var dashboardController = require("./controllers/userController/dashboardController");
var fileuploadcontroller = require("./controllers/userController/fileUploadController");
var adminDashboardController = require("./controllers/adminController/adminDashboardController");
var shareFileController = require("./controllers/userController/shareFileController");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "4MB" }));
app.use("/public", express.static("public"));
// parse application/json

if (process.env.NODE_ENV === "production") {
  app.use(express.static("shareapp/dist"));
}

app.use("/", loginController);
app.use("/", registerController);
app.use("/", dashboardController);
app.use("/", fileuploadcontroller);
app.use("/", adminDashboardController);
app.use("/", shareFileController);

app.listen(port, () => {
  console.log("server is listening to port 3000");
});

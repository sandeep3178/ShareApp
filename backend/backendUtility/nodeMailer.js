const nodemailer = require("nodemailer");
var token = require("../backendUtility/token");
var Register = require("../models/registerModel");

async function main(emaildata) {
  var newdata = emaildata;
  console.log(newdata);
  var newtok = token();

  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "mail.vinove.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "sandeep.sarswat@mail.vinove.com",
      pass: "sandeep@123"
    }
  });

  let info = await transporter.sendMail({
    from: "sandeep.sarswat@mail.vinove.com",
    to: `${newdata}`,
    subject: "SHAREAPP!!.Please verify your account",
    html: `<body> <p>your token is ${newtok} valid for 1 hour and once per user </p><a href="http://localhost:4200/verify">click here to verify your account</button> </body>`
  });
  console.log("message sent", info.messageId);
  return newtok;
}

module.exports = main;

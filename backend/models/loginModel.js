const mongoose = require('mongoose')
var User = mongoose.model('User', {
    email: String,
    password: String
})
module.exports = { User }
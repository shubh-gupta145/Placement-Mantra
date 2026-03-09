const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

name:String,
email:String,
phone:String,
gender:String,
birthday:String,
location:String,
summary:String,

github:String,
linkedin:String,
leetcode:String,

image:String

});

module.exports = mongoose.model("ProfileUser",userSchema);
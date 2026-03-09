const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

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

skills:[String],

profileImage:String

});

module.exports = mongoose.model("Profile",profileSchema);
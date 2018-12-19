var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var guestbook1Schema = new Schema({
  Name: String,
  Age: Number,
  Email: String,
  Comment: String,
  Company: String,
  Date: new Date().toDateString()
});
module.exports = mongoose.model('update', guestbook1Schema);

// models/user.js
const mongoose = require('mongoose');

const userlogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  logs:{type:Array, required:true}
});

module.exports = mongoose.model('Userlogs', userlogSchema);

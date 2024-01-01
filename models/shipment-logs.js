const mongoose = require('mongoose');

const shipmentlogSchema = new mongoose.Schema({
  trackingNumber: { type: String, unique: true, required: true },
  logs:{type:Array, required:true}
});


module.exports = mongoose.model('Shipmentlogs', shipmentlogSchema);


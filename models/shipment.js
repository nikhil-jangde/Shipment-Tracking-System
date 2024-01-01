const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  trackingNumber: { type: String, unique: true, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  recieverEmail:{type: String, required: true },
  currentStatus: { type: String, required: true },
  carrier: { type: String, required: true },
  statusUpdates: [
    {
      location: String,
      timestamp: String,
      description: String,
    },
  ],
});

module.exports = mongoose.model('Shipment', shipmentSchema);

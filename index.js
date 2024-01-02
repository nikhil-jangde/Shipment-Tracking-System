// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const shipmentRoutes = require('./routes/shipment');
const userlogsRoutes = require('./routes/userlogs');
const shipmentlogsRoutes = require('./routes/shipmentlogs')

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('MongoDB connected successfully');
});

app.use('/auth', authRoutes);
app.use('/shipment', shipmentRoutes);
app.use('/userlogs',userlogsRoutes);
app.use('/shipmentlogs', shipmentlogsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

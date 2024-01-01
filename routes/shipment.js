// Import necessary libraries and models
const express = require('express');
const router = express.Router();
const Shipment = require('../models/shipment');
const ShipmentLogs = require('../models/shipment-logs');
const nodemailer = require('nodemailer');
require('dotenv').config();


// Create an SMTP transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// Function to generate a timestamp in a specific format
const generateTimestamp = () => {
  return new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
};

// Function to generate a random tracking number with a given prefix and length
const generateRandomTrackingNumber = (prefix, length) => {
  const randomNumber = Math.floor(Math.random() * Math.pow(10, length));
  const paddedNumber = randomNumber.toString().padStart(length, '0');
  return `${prefix}${paddedNumber}`;
};

// Function to create logs for a shipment and save them to the shipment-logs collection
const createLogs = async (trackingNumber, action) => {
  const logs = {
    timestamp: generateTimestamp(),
    action,
  };
  const shipmentLogs = await ShipmentLogs.findOne({ trackingNumber });
  shipmentLogs.logs.push(logs);
  await shipmentLogs.save();
};

// Function to send an email with specified parameters
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'nikhiljangde123@gmail.com',
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

// Endpoint to retrieve all shipments
router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.status(200).json({ shipments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to add a new shipment
router.post('/Add-Shipment', async (req, res) => {
  try {
    const { sender, receiver, recieverEmail, currentStatus, carrier } = req.body;
    const trackingNumber = generateRandomTrackingNumber('TRACK', 8);

    // Create a new shipment
    const shipment = await Shipment.create({
      trackingNumber,
      sender,
      receiver,
      recieverEmail,
      currentStatus,
      carrier,
    });

    // Create a shipment-logs document for the new shipment
    await ShipmentLogs.create({ trackingNumber });

    // Create logs for the shipment creation
    await createLogs(trackingNumber, 'Shipment created');

    // Send an email to the receiver
    const emailSubject = 'Shipment Created';
    const emailBody = `Dear ${receiver},\n\nYour shipment with tracking number ${trackingNumber} has been created with the status: ${currentStatus}.\n\nThank you for choosing our service.`;
    await sendEmail(recieverEmail, emailSubject, emailBody);

    res.status(201).json({ message: 'Shipment created successfully', shipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to update the status of a shipment
router.put('/updateStatus/:trackingNumber', async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    const { location, description } = req.body;
    const statusUpdate = { location, timestamp: generateTimestamp(), description };

    // Find the shipment by tracking number
    const shipment = await Shipment.findOne({ trackingNumber });
    const recieverEmail = shipment.recieverEmail;

    // If the shipment is not found, return an error
    if (!shipment) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    // Update the shipment status and save changes
    shipment.statusUpdates.push(statusUpdate);
    await shipment.save();

    // Create logs for the status update
    await createLogs(trackingNumber, `Status Updated to ${description}`);

    // Send an email to the receiver
    const emailSubject = 'Shipment Status Update';
    const emailBody = `Dear ${shipment.receiver},\n\nYour shipment with tracking number ${trackingNumber} has been updated with the status: ${description}.\n\nThank you for choosing our service.`;
    await sendEmail(recieverEmail, emailSubject, emailBody);

    res.status(200).json({ message: 'Shipment status updated successfully', shipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to update the current status of a shipment
router.put('/Current-Status-Update/:trackingNumber', async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    const { currentStatus } = req.body;

    // Find the shipment by tracking number and update the current status
    const shipment = await Shipment.findOneAndUpdate(
      { trackingNumber },
      { $set: { currentStatus } },
      { new: true }
    );

    // Create logs for the current status update
    await createLogs(trackingNumber, `currentStatus Updated to ${currentStatus}`);

    // Send an email to the receiver
    const emailSubject = 'Shipment Current Status Update';
    const emailBody = `Dear ${shipment.receiver},\n\nThe current status of your shipment with tracking number ${trackingNumber} has been updated to: ${currentStatus}.\n\nThank you for choosing our service.`;
    await sendEmail(shipment.recieverEmail, emailSubject, emailBody);

    await shipment.save();
    res.status(200).json({ message: 'current status updated successfully', shipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

// Export the router for use in the main application
module.exports = router;

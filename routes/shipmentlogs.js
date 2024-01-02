// Import necessary libraries and models
const express = require('express');
const router = express.Router();
const ShipmentLogs = require('../models/shipment-logs');

// API endpoint to get all shipment logs
router.get('/all-shipment-logs', async (req, res) => {
    try {
        // Retrieve all shipment logs from the database
        const logs = await ShipmentLogs.find();
        res.status(200).json({ logs });
    } catch (error) {
        // Handle internal server error
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to get shipment logs by tracking number
router.get('/shipmentlogsbyId/:trackingNumber', async (req, res) => {
    try {
        // Extract tracking number from request parameters
        const { trackingNumber } = req.params;

        // Find shipment logs by tracking number in the database
        const logbytrackingNumber = await ShipmentLogs.findOne({ trackingNumber });

        // Respond with the found shipment logs
        res.status(200).json({ logbytrackingNumber });
    } catch (error) {
        // Handle internal server error
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router for use in the main application
module.exports = router;

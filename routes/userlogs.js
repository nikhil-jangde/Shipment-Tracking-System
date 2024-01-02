// Import necessary libraries and models
const express = require('express');
const router = express.Router();
const UserLogs = require('../models/user-logs');

// API endpoint to get all user logs
router.get('/all-user-logs', async (req, res) => {
    try {
        // Retrieve all user logs from the database
        const logs = await UserLogs.find();
        res.status(200).json({ logs });
    } catch (error) {
        // Handle internal server error
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to get user logs by user ID
router.get('/userlogsbyId/:userId', async (req, res) => {
    try {
        // Extract user ID from request parameters
        const { userId } = req.params;

        // Find user logs by user ID in the database
        const userbyId = await UserLogs.findOne({ userId });
        
        // Respond with the found user logs
        res.status(200).json({ userbyId });
    } catch (error) {
        // Handle internal server error
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router for use in the main application
module.exports = router;

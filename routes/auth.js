// Import necessary libraries and models
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserLogs = require('../models/user-logs');
require('dotenv').config();

// Authorization middleware to check if the user has admin privileges
const isAdmin = async (req, res, next) => {
  const { SenderID } = req.body;

  try {
    // Check if the user with provided SenderID exists in the database
    const user = await User.findOne({ _id: SenderID });

    // Check if the user is defined and has the 'admin' role
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }

    // Attach the user object to req.user for later use
    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const {token} = req.body;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
};

// API endpoint to verify token and return user information
router.get('/verifyToken', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userInfo = {
      username: user.username,
      userId: user._id,
      role: user.role
    };

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to register a new user
router.post('/register', isAdmin, async (req, res) => {
  try {
    const { SenderID, username, password, role } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(201).json({ message: 'User already exists' });
    }

    // If username is unique, proceed with user registration
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role });
    const userId = user._id;

    // Create a user-logs document for the new user
    await UserLogs.create({ userId });

    // Create logs for the user creation
    const addlogs = await UserLogs.findOne({ userId });
    const logs = {
      timestamp: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      action: `User created by ${SenderID} `,
    };
    addlogs.logs.push(logs);
    await addlogs.save();

    res.status(200).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for user login
router.post('/login', async (req, res) => {
  try {
    // Implement user login logic
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    // Check if the user exists and the provided password is correct
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({userId:user._id , username: user.username, role: user.role }, process.env.SECRET_KEY);
    res.status(200).json({ token });

    // Get the user's ID and add logs for the user login
    const userId = user._id;
    const addlogs = await UserLogs.findOne({ userId });
    const logs = {
      timestamp: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      action: `User logged in`,
    };
    addlogs.logs.push(logs);
    await addlogs.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to remove a user (admin only)
router.post('/remove-user', isAdmin, async (req, res) => {
  try {
    const { SenderID, userId } = req.body;
    const user = await User.findByIdAndDelete(userId);

    // If the user is not found, return an error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });

    // Get the user's ID and add logs for the user deletion
    const addlogs = await UserLogs.findOne({ userId });
    const logs = {
      timestamp: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      action: `User Deleted by ${SenderID} `,
    };
    addlogs.logs.push(logs);
    await addlogs.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to update user details (admin only)
router.put('/update-user', isAdmin, async (req, res) => {
  try {
    const { SenderID, userId, username, role } = req.body;

    // Update the user details and get the updated user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, role },
      { new: true }
    );

    // If the user is not found, return an error
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });

    // Get the user's ID and add logs for the user update
    const addlogs = await UserLogs.findOne({ userId });
    const logs = {
      timestamp: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      action: `User updated by ${SenderID} `,
    };
    addlogs.logs.push(logs);
    await addlogs.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router for use in the main application
module.exports = router;

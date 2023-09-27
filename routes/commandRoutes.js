// routes/commandsRoutes.js
const express = require('express');
const router = express.Router();
const commandsController = require('../controllers/commandsController');
// const isAuthenticated = require('../middleware/isAuthenticated');

// POST route to add a new command
// router.post('/', isAuthenticated, commandsController.addCommand);

module.exports = router;

const express = require("express");
const router = express.Router();
const scamTypesController = require('../controllers/scamTypeController');

// Handle GET requests to /scamTypes
router.get('/', scamTypesController.getScamTypes);

module.exports = router;

// routes/scamRoutes.js
const express = require("express");
const router = express.Router();
const scamController = require("../controllers/scamController");

// GET all scams for logged-out user
router.get("/", scamController.getAllScams);

module.exports = router;

// routes/scamRoutes.js
const express = require("express");
const router = express.Router();
const scamController = require("../controllers/scamController");
const {
  fetchEmergencyNumbersMiddleware,
} = require("../middleware/fetchEmergencyNumbers");

// GET all scams for logged-out user
router.get("/", scamController.getAllScams);

// Post a new scam
router.post("/", fetchEmergencyNumbersMiddleware, scamController.addScamCase);
module.exports = router;

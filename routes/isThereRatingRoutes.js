const express = require('express');
const router = express.Router();
const isThereRatingController = require('../controllers/isThereRatingController.js');
// const isAuthenticated = require('../middleware/isAuthenticated');

// PUT route to update IsThereRating
router.put('/:scamId', isThereRatingController.updateIsThereRating);

module.exports = router;

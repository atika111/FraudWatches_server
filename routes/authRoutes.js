const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyPassword } = require("../middleware/authMiddleware");

// CREATE
router.post("/signup", authController.signUp);
router.post("/login", verifyPassword, authController.logIn);

// READ
router.get("/logout", authController.logOut);
router.post("/usersByIds", authController.getUsersByIds);
// router.get("/current-user", authController.getUserByToken);

module.exports = router;

const express = require('express');
const router  = express.Router();
const authController =require('../controllers/authController');
const { verifyToken } = require('../middleware/verifyToken');

// REGISTRATION

router.post("/register",authController.createUser);

// LOGIN
router.post("/login",authController.loginUser);

module.exports = router;

const express = require('express');
const { signupUser, loginUser, getUserProfile } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/profile/:userId', getUserProfile);

module.exports = router;

const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
    res.send('User route works!');
});

module.exports = router; 

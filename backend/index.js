const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Test route
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            message: 'Hello, world!',
            time: result.rows[0].now,
        });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

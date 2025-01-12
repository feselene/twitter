const { Pool } = require('pg');

// Load environment variables
require('dotenv').config();

// Initialize the PostgreSQL pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Render often uses self-signed certificates
    },
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.error('Database connection error:', err);
});

module.exports = pool;

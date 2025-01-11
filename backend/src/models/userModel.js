const pool = require('../config/db');

const createUser = async (username, email, password) => {
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
    return pool.query(query, [username, email, password]);
};

module.exports = { createUser };
const pool = require('../config/db');
const bcrypt = require('bcrypt');

const createUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
            RETURNING *;
    `;

    const values = [username, email, hashedPassword]; // Correctly pass all three values in order

    const { rows } = await pool.query(query, values);
    return rows[0]; // Return the created user
};

const findUserByUsername = async (username) => {
    const query = `
        SELECT * FROM users WHERE username = $1;
    `;
    const { rows } = await pool.query(query, [username]);
    return rows[0];
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT * FROM users WHERE email = $1;
    `;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
};


module.exports = {
    createUser,
    findUserByUsername,
    findUserByEmail,
}

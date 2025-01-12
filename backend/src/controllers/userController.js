const pool = require('../config/db'); // Import the database connection
const bcrypt = require('bcrypt');

const signupUser = async (req, res) => {
    const { email, password } = req.body;

    console.log('Signup Request Body:', req.body); // Debug input

    try {
        if (!email || !password) {
            console.log('Validation Error: Missing email or password');
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if user exists
        const existingUserQuery = 'SELECT * FROM users WHERE email = $1';
        const existingUser = await pool.query(existingUserQuery, [email]);
        console.log('Existing User:', existingUser.rows);

        if (existingUser.rows.length > 0) {
            console.log('User already exists');
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);

        // Insert new user
        const insertUserQuery = `
            INSERT INTO users (email, password)
            VALUES ($1, $2)
            RETURNING id, email
        `;
        const newUser = await pool.query(insertUserQuery, [email, hashedPassword]);
        console.log('New User:', newUser.rows);

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser.rows[0],
        });
    } catch (error) {
        console.error('Signup Error:', error); // Log the actual error
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { signupUser };

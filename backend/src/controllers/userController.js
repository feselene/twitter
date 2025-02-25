const { createUser, findUserByUsername, findUserByEmail } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Signup user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  try {
    // Check if the username already exists
    const existingUserByUsername = await findUserByUsername(username);
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Username already in use.' });
    }

    // Check if the email already exists
    const existingUserByEmail = await findUserByEmail(email);
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Create a new user
    const user = await createUser(username, email, password);

    res.status(201).json({
      message: 'User created successfully!',
      user: {
        id: user.id, // Send back user data (omit sensitive information)
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user.' });
  }
};


// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Find the user by username
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in.' });
  }
};

const getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(`
      SELECT
        u.username,
        (SELECT COUNT(*) FROM followers WHERE follower_id = u.id) AS followers,
        (SELECT COUNT(*) FROM followers WHERE user_id = u.id) AS following,
        ARRAY(
          SELECT json_build_object('id', t.id, 'content', t.content, 'likes', t.likes, 'retweets', t.retweets)
          FROM tweets t
          WHERE t.username = u.username
        ) AS tweets
      FROM users u
      WHERE u.id = $1;
    `, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



module.exports = { signupUser, loginUser, getUserProfile };

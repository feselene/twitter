const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const tweetRoutes = require('./routes/tweetRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tweets', tweetRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

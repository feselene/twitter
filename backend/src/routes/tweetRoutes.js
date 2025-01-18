const express = require('express');
const { getTweets, likeTweet, retweetTweet } = require('../controllers/tweetController');

const router = express.Router();

// Fetch all tweets
router.get('/', getTweets);

// Like a tweet
router.post('/:id/like', likeTweet);

// Retweet a tweet
router.post('/:id/retweet', retweetTweet);

module.exports = router;

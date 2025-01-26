const pool = require('../config/db');

exports.getTweets = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tweets ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching tweets' });
  }
};

exports.likeTweet = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE tweets SET likes = likes + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error liking tweet' });
  }
};

exports.retweetTweet = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE tweets SET retweets = retweets + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retweeting tweet' });
  }
};

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const handleLike = async (id: string) => {
  try {
    const response = await axios.post(`http://10.0.2.2:5000/api/tweets/${id}/like`);
    console.log('Liked tweet:', response.data);
  } catch (error) {
    console.error('Error liking tweet:', error);
  }
};

const handleRetweet = async (id: string) => {
  try {
    const response = await axios.post(`http://10.0.2.2:5000/api/tweets/${id}/retweet`);
    console.log('Retweeted tweet:', response.data);
  } catch (error) {
    console.error('Error retweeting tweet:', error);
  }
};

const HomeScreen = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch tweets from the database
    const fetchTweets = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:5000/api/tweets');
        setTweets(response.data); // Update state with fetched tweets
        setLoading(false); // Stop the loading indicator
      } catch (error) {
        console.error('Error fetching tweets:', error);
        setLoading(false); // Stop the loading indicator even if there's an error
      }
    };

    fetchTweets();
  }, []);

  const renderTweet = ({ item }: { item: typeof tweets[0] }) => (
    <View style={styles.tweetContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => handleRetweet(item.id)} style={styles.actionButton}>
          <Text style={styles.actionText}>🔄 {item.retweets}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.actionButton}>
          <Text style={styles.actionText}>❤️ {item.likes}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.replyButton}>Reply</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1DA1F2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>
      <FlatList
        data={tweets}
        renderItem={renderTweet}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tweetContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#1DA1F2', // Twitter's signature blue color
  },
  content: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1DA1F2',
  },
  replyButton: {
    color: '#1DA1F2',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

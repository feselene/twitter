import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ProfileScreen = ({ route }: { route: any }) => {
  const { userId } = route.params; // User ID passed via navigation
  const [profileData, setProfileData] = useState({
    username: '',
    followers: 0,
    following: 0,
    tweets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user's profile data
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:5000/api/users/profile/${userId}`);
        console.log('API response: ', response.data);
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  const renderTweet = ({ item }: { item: any }) => (
    <View style={styles.tweetContainer}>
      <Text style={styles.content}>{item.content}</Text>
      <View style={styles.actionsContainer}>
        <Text style={styles.actionText}>❤️ {item.likes}</Text>
        <Text style={styles.actionText}>🔄 {item.retweets}</Text>
      </View>
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
      <Text style={styles.header}>Profile</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.username}>@{profileData.username}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>Followers: {profileData.followers}</Text>
          <Text style={styles.stats}>Following: {profileData.following}</Text>
        </View>
      </View>
      <FlatList
        data={profileData.tweets}
        renderItem={renderTweet}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={styles.tweetsHeader}>Tweets</Text>}
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
  profileInfo: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  stats: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tweetsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
  },
  tweetContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  content: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1DA1F2',
  },
});

export default ProfileScreen;

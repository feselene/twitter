import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const tweets = [
  {
    id: '1',
    username: '@cs2maps',
    content: 'Vertigo in CS2 features improved lighting and textures, making the high-rise construction site feel more immersive. 🏗️',
  },
  {
    id: '2',
    username: '@fps_tactics',
    content: 'The A-site on Vertigo has been slightly reworked in CS2 to offer more balanced cover for attackers and defenders. 💣',
  },
  {
    id: '3',
    username: '@grenade_guru',
    content: 'Master your Vertigo nades! Smokes and molotovs can block tight chokepoints like the ramp leading to A-site. 🔥',
  },
];

const HomeScreen = () => {
  const renderTweet = ({ item }: { item: typeof tweets[0] }) => (
    <View style={styles.tweetContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <TouchableOpacity>
        <Text style={styles.replyButton}>Reply</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>
      <FlatList
        data={tweets}
        renderItem={renderTweet}
        keyExtractor={(item) => item.id}
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
  replyButton: {
    color: '#1DA1F2',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
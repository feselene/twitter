import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

const handleSignup = async () => {
  if (!email.includes('@')) {
    Alert.alert('Invalid Email', 'Please enter a valid email address.');
    return;
  }
  if (password.length < 6) {
    Alert.alert('Weak Password', 'Password must be at least 6 characters.');
    return;
  }
  if (password !== confirmPassword) {
    Alert.alert('Passwords Do Not Match', 'Please re-enter your passwords.');
    return;
  }

  try {
    const response = await fetch('http://10.0.2.2:5000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if the response is JSON or an error page (HTML)
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'You have signed up successfully!');
        console.log('Signup Successful:', data);
      } else {
        Alert.alert('Error', data.error || 'Something went wrong. Please try again.');
        console.error('Signup Error:', data);
      }
    } else {
      // Handle unexpected non-JSON responses
      const errorText = await response.text(); // Log the raw response for debugging
      console.error('Unexpected Response:', errorText);
      Alert.alert('Error', 'Unexpected server response. Please try again later.');
    }
  } catch (error) {
    console.error('Network Error:', error);
    Alert.alert('Error', 'Unable to connect to the server. Please try again later.');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});

export default SignupScreen;

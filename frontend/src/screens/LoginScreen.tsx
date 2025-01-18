import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
      if (!email.includes('@')) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        Alert.alert('Invalid Password', 'Password must be at least 6 characters.');
        return;
      }

      try {
        // Make API call to the login endpoint
        const response = await axios.post('http://10.0.2.2:5000/api/users/login', {
          email,
          password,
        });

        // Handle successful login
        console.log('Login Successful', response.data);
        Alert.alert('Success', 'You have logged in successfully!');
        navigation.navigate('Profile', { userId: 1 });
        // Save the token if needed
        // const token = response.data.token;
      } catch (error) {
        // Handle errors
        console.error('Login Failed', error.response?.data || error.message);
        Alert.alert(
          'Login Failed',
          error.response?.data?.message || 'Something went wrong. Please try again.'
        );
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
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

export default LoginScreen;

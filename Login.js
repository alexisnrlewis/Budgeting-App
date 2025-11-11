// Login.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Fake user for testing
  const fakeUser = {
    email: 'test@gmail.com',
    password: 'pass123',
    name: 'Test User',
  };

  const handleLogin = () => {
    if (email === fakeUser.email && password === fakeUser.password) {
      navigation.navigate('Dashboard', { user: fakeUser });
    } else {
      navigation.navigate('InvalidLogin');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>💰 Budget Buddy 💰</Text>
      <Text style={styles.title}>LOGIN</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email here:"
        placeholderTextColor="#000"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Enter your password here:"
          placeholderTextColor="#000"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(prev => !prev)}
        >
          <Text style={styles.eyeText}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>
          Don't have an account? Click here to CREATE AN ACCOUNT.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.link}>
          Forgot Password? Click here to RESET YOUR PASSWORD.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 30,
  },
  input: {
    width: '25%',
    padding: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  passwordRow: {
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    marginBottom: 0,
  },
  eyeButton: {
    marginLeft: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  eyeText: {
    fontSize: 14,
    color: '#1B5E20',
  },
  button: {
    width: '25%',
    backgroundColor: '#43A047',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    marginTop: 15,
    fontSize: 15,
    color: '#388E3C',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
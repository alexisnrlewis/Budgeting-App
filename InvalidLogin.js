// InvalidLogin.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function InvalidLogin({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Invalid Login Credentials</Text>
      <Text style={styles.subText}>Please check your email and password and try again.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: 20,
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e48d8dff',
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
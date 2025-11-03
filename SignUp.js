import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [income, setIncome] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');

  const handleSignUp = () => {
    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Sign up success → redirect to login
    Alert.alert('Sign Up Successful', `Welcome, ${firstName}!`, [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Login'),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>💰 Budget Buddy</Text>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#666"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#666"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#666"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Monthly Income (Optional)"
        placeholderTextColor="#666"
        value={income}
        onChangeText={setIncome}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Savings Goal (Optional)"
        placeholderTextColor="#666"
        value={savingsGoal}
        onChangeText={setSavingsGoal}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9',
  },
  logo: { fontSize: 36, marginBottom: 10, fontWeight: 'bold', color: '#2E7D32' },
  title: { fontSize: 26, marginBottom: 20, fontWeight: '600', color: '#2E7D32' },
  input: {
    width: '90%',
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  button: {
    width: '90%',
    backgroundColor: '#43A047',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  link: { marginTop: 20, fontSize: 18, color: '#388E3C', textDecorationLine: 'underline' },
});
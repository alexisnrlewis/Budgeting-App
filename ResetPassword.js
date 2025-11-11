// ResetPassword.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // ✅ message to show after email sent
  const [errorMessage, setErrorMessage] = useState(''); // optional error message

  const validateEmail = (e) => /\S+@\S+\.\S+/.test(e);

  const handleSendReset = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();

      if (res.ok) {
        // ✅ show green inline message
        setSuccessMessage(`A password reset link has been sent to ${email}.`);
      } else {
        setErrorMessage(json.message || 'Unable to send reset email.');
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('Network error. Could not reach the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.info}>
        Enter the email associated with your account and we’ll send you a reset link.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email:"
        placeholderTextColor="#000000ff"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendReset} disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Send Link</Text>}
      </TouchableOpacity>

      {/* ✅ Inline success message */}
      {successMessage ? (
        <View style={styles.successBox}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      ) : null}

      {/* ✅ Inline error message */}
      {errorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Back to LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E8F5E9' },
  title: { fontSize: 25, color: '#2E7D32', marginBottom: 8 },
  info: { textAlign: 'center', marginBottom: 20, color: '#2E7D32', fontSize: 20 },
  input: { width: '85%', padding: 12, borderWidth: 2.5, borderColor: '#000000ff', borderRadius: 8, backgroundColor: '#fff', marginBottom: 16 },
  button: { width: '70%', padding: 14, borderRadius: 10, backgroundColor: '#43A047', alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: '800' },
  link: { color: '#388E3C', marginTop: 12, textDecorationLine: 'underline', fontSize: 22 },

  successBox: {
    width: '85%',
    padding: 12,
    backgroundColor: '#C8E6C9', // green
    borderRadius: 8,
    marginBottom: 12,
  },
  successText: { color: '#1B5E20', fontSize: 18, textAlign: 'center' },

  errorBox: {
    width: '85%',
    padding: 12,
    backgroundColor: '#FFCDD2', // red
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: { color: '#B71C1C', fontSize: 18, textAlign: 'center' },
});
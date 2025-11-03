import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function AccountSettings({ navigation, route }) {
  const [user, setUser] = useState(route.params?.user || {
    name: 'Test User',
    email: 'testuser@gmail.com',
    password: 'pass123',
  });

  const handleSave = () => {
    console.log('Saved user info:', user);
    alert('Changes saved!');
    navigation.goBack(); // Go back to Dashboard
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Account Settings</Text>

      {/* Name */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
      />

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={user.password}
        onChangeText={(text) => setUser({ ...user, password: text })}
        secureTextEntry
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20, 
    backgroundColor: '#E8F5E9', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#2E7D32', 
    marginBottom: 20 
  },
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#2E7D32', 
    alignSelf: 'flex-start', 
    marginTop: 15 
  },
  input: { 
    width: '100%', 
    padding: 10, 
    borderRadius: 8, 
    backgroundColor: '#fff', 
    marginTop: 5 
  },
  saveButton: { 
    marginTop: 20, 
    backgroundColor: '#43A047', 
    paddingVertical: 12, 
    paddingHorizontal: 25, 
    borderRadius: 8 
  },
  saveButtonText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#000' 
  },
});
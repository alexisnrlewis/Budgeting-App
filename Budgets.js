import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const categories = ['Groceries', 'Entertainment', 'Dining', 'Shopping', 'Transport', 'Healthcare', 'Utilities', 'Subscriptions'];

export default function Budgets({ income = 0 }) {
  // State for each category's budget
  const [budgets, setBudgets] = useState(
    categories.map(cat => ({ category: cat, amount: '' }))
  );

  // Update budget amount for a category
  const updateBudget = (index, value) => {
    const updated = [...budgets];
    updated[index].amount = value.replace(/[^0-9.]/g, ''); // allow only numbers and decimal
    setBudgets(updated);
  };

  // Optional: total budget calculation
  const totalBudget = budgets.reduce((sum, b) => sum + parseFloat(b.amount || 0), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Monthly Budgets</Text>

      <FlatList
        data={budgets}
        keyExtractor={(item) => item.category}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.category}>{item.category}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={item.amount}
              onChangeText={(text) => updateBudget(index, text)}
              placeholder="0"
            />
          </View>
        )}
      />

      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total Budget:</Text>
        <Text style={styles.totalAmount}>${totalBudget.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E8F5E9' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2E7D32', marginBottom: 15, textAlign: 'center' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  category: { fontSize: 16, color: '#1B5E20' },
  input: {
    width: 100,
    backgroundColor: '#E0F2F1',
    borderRadius: 8,
    padding: 6,
    textAlign: 'center',
    fontSize: 16,
  },
  totalRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
  },
  totalText: { fontSize: 18, fontWeight: '600', color: '#1B5E20' },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: '#2E7D32' },
});
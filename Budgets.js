import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';

const categories = ['Groceries', 'Entertainment', 'Shopping', 'Dining', 'Transport'];

// Predetermined fixed monthly expenses
const fixedExpenses = [
  { category: 'Rent/Mortgage', amount: 800 },
  { category: 'Gas', amount: 150 },
  { category: 'Utilities', amount: 120 },
];

export default function Budgets({ income = 0, expenses = 0 }) {
  const [budgets, setBudgets] = useState(
    categories.map(cat => ({ category: cat, amount: 0 }))
  );
  const [advice, setAdvice] = useState([]);

  const updateBudget = (index, value) => {
    const updated = [...budgets];
    updated[index].amount = parseFloat(value) || 0;
    setBudgets(updated);
  };

  // Compute advice whenever budgets, income, or expenses change
  useEffect(() => {
    const newAdvice = [];

    const totalBudgeted = budgets.reduce((sum, b) => sum + b.amount, 0) + fixedExpenses.reduce((sum, f) => sum + f.amount, 0);
    const remaining = income - expenses;

    budgets.forEach(b => {
      if (b.amount > remaining * 0.4) { // arbitrary warning if budget > 40% of remaining
        newAdvice.push(`Warning: Your budget for ${b.category} may be too high compared to your income.`);
      }
    });

    if (totalBudgeted > income) {
      newAdvice.push("Caution: Your total budgets plus fixed expenses exceed your monthly income!");
    }

    setAdvice(newAdvice);
  }, [budgets, income, expenses]);

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <Text style={styles.title}>Monthly Budgets</Text>

      {/* Fixed Expenses */}
      <Text style={styles.sectionTitle}>Fixed Expenses</Text>
      {fixedExpenses.map((f) => (
        <View key={f.category} style={styles.budgetItem}>
          <Text style={styles.category}>{f.category}</Text>
          <Text style={styles.fixedAmount}>${f.amount.toFixed(2)}</Text>
        </View>
      ))}

      {/* User Budget Categories */}
      <Text style={styles.sectionTitle}>Variable Budgets</Text>
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.category}
        renderItem={({ item, index }) => (
          <View style={styles.budgetItem}>
            <Text style={styles.category}>{item.category}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={item.amount.toString()}
              onChangeText={(text) => updateBudget(index, text)}
              placeholder="Enter budget"
            />
          </View>
        )}
      />

      {/* Advice Section */}
      {advice.length > 0 && (
        <View style={styles.adviceBox}>
          {advice.map((msg, idx) => (
            <Text key={idx} style={styles.adviceText}>• {msg}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 10, color: '#2E7D32' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 15, marginBottom: 5, color: '#1B5E20' },
  budgetItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5, backgroundColor: '#fff', padding: 12, borderRadius: 8, width: '85%' },
  category: { fontSize: 16, color: '#2E7D32' },
  input: { backgroundColor: '#E0F2F1', padding: 8, borderRadius: 8, width: 100, textAlign: 'center', fontSize: 16 },
  fixedAmount: { fontSize: 16, fontWeight: '600', color: '#1B5E20' },
  adviceBox: { marginTop: 15, backgroundColor: '#FFECB3', padding: 10, borderRadius: 8, width: '85%' },
  adviceText: { color: '#BF360C', fontWeight: '600', marginVertical: 2 },
});
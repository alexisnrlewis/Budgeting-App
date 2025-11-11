import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';

// Predetermined fixed expenses
const initialFixedExpenses = [
  { id: 'f1', title: 'Rent/Mortgage', amount: 800 },
  { id: 'f2', title: 'Gas', amount: 150 },
  { id: 'f3', title: 'Utilities', amount: 120 },
];

export default function Expenses({ onTotalChange }) {
  const [fixedExpenses, setFixedExpenses] = useState(initialFixedExpenses);
  const [expenses, setExpenses] = useState([]);
  const [editFixedId, setEditFixedId] = useState(null);
  const [tempFixedTitle, setTempFixedTitle] = useState('');
  const [tempFixedAmount, setTempFixedAmount] = useState('');
  
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDate, setNewDate] = useState('');
  const [editId, setEditId] = useState(null);
  const [tempAmount, setTempAmount] = useState('');
  const [tempTitle, setTempTitle] = useState('');
  const [tempDate, setTempDate] = useState('');

  // Update total spending whenever fixed + variable expenses change
  useEffect(() => {
    const totalFixed = fixedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalVariable = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    onTotalChange(totalFixed + totalVariable);
  }, [fixedExpenses, expenses]);

  const addExpense = () => {
    if (!newTitle || !newAmount || !newDate) {
      Alert.alert('Error', 'Please enter title, amount, and date.');
      return;
    }
    const amount = parseFloat(newAmount);
    if (isNaN(amount) || amount < 0) {
      Alert.alert('Error', 'Amount must be a positive number.');
      return;
    }
    const newExpense = {
      id: (expenses.length + 1).toString(),
      title: newTitle,
      amount,
      date: newDate,
    };
    setExpenses([...expenses, newExpense]);
    setNewTitle('');
    setNewAmount('');
    setNewDate('');
  };

  const startEditFixed = (item) => {
    setEditFixedId(item.id);
    setTempFixedTitle(item.title);
    setTempFixedAmount(item.amount.toString());
  };

  const saveEditFixed = () => {
    const amount = parseFloat(tempFixedAmount);
    if (isNaN(amount) || amount < 0) {
      Alert.alert('Error', 'Amount must be a positive number.');
      return;
    }
    setFixedExpenses(
      fixedExpenses.map(exp => exp.id === editFixedId ? { ...exp, title: tempFixedTitle, amount } : exp)
    );
    setEditFixedId(null);
    setTempFixedTitle('');
    setTempFixedAmount('');
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setTempAmount(item.amount.toString());
    setTempTitle(item.title);
    setTempDate(item.date);
  };

  const saveEdit = () => {
    const amount = parseFloat(tempAmount);
    if (isNaN(amount) || amount < 0) {
      Alert.alert('Error', 'Amount must be a positive number.');
      return;
    }
    setExpenses(expenses.map(exp => exp.id === editId ? { ...exp, amount, title: tempTitle, date: tempDate } : exp));
    setEditId(null);
    setTempAmount('');
    setTempTitle('');
    setTempDate('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const renderExpenseItem = ({ item }) => (
    <View style={styles.expenseItem}>
      {editId === item.id ? (
        <>
          <TextInput style={styles.inputSmall} value={tempTitle} onChangeText={setTempTitle} placeholder="Title" />
          <TextInput style={styles.inputSmall} value={tempAmount} keyboardType="numeric" onChangeText={setTempAmount} placeholder="Amount" />
          <TextInput style={styles.inputSmall} value={tempDate} onChangeText={setTempDate} placeholder="Date (MM/DD)" />
          <TouchableOpacity style={styles.saveButton} onPress={saveEdit}><Text style={styles.saveText}>Save</Text></TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => setEditId(null)}><Text style={styles.deleteText}>Cancel</Text></TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.expenseTitle}>{item.title} - ${item.amount.toFixed(2)} ({item.date})</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.editButton} onPress={() => startEdit(item)}><Text style={styles.editText}>Edit</Text></TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteExpense(item.id)}><Text style={styles.deleteText}>Delete</Text></TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.title}>Expenses</Text>

      {/* Fixed Expenses */}
      <Text style={styles.sectionTitle}>Fixed Expenses</Text>
      {fixedExpenses.map((exp) => (
        <View key={exp.id} style={[styles.expenseItem, { backgroundColor: '#E0F2F1' }]}>
          {editFixedId === exp.id ? (
            <>
              <TextInput style={styles.inputSmall} value={tempFixedTitle} onChangeText={setTempFixedTitle} />
              <TextInput style={styles.inputSmall} value={tempFixedAmount} keyboardType="numeric" onChangeText={setTempFixedAmount} />
              <TouchableOpacity style={styles.saveButton} onPress={saveEditFixed}><Text style={styles.saveText}>Save</Text></TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => setEditFixedId(null)}><Text style={styles.deleteText}>Cancel</Text></TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.expenseTitle}>{exp.title} - ${exp.amount.toFixed(2)}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => startEditFixed(exp)}><Text style={styles.editText}>Edit</Text></TouchableOpacity>
            </>
          )}
        </View>
      ))}

      {/* Variable Expenses */}
      <Text style={styles.sectionTitle}>Additional Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderExpenseItem}
      />

      {/* Add New Expense */}
      <TextInput style={styles.input} placeholder="Title" value={newTitle} onChangeText={setNewTitle} />
      <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={newAmount} onChangeText={setNewAmount} />
      <TextInput style={styles.input} placeholder="Date (MM/DD)" value={newDate} onChangeText={setNewDate} />
      <TouchableOpacity style={styles.addButton} onPress={addExpense}>
        <Text style={styles.addButtonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32', marginVertical: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1B5E20', marginTop: 10, marginBottom: 5 },
  expenseItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5, backgroundColor: '#fff', padding: 10, borderRadius: 8, width: '100%' },
  expenseTitle: { fontSize: 16, flex: 1 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginVertical: 5, width: '100%' },
  inputSmall: { backgroundColor: '#E0F2F1', padding: 6, borderRadius: 6, marginRight: 5, width: 80, textAlign: 'center' },
  addButton: { backgroundColor: '#43A047', padding: 12, borderRadius: 12, marginTop: 10, alignItems: 'center', width: '85%' },
  addButtonText: { color: '#fff', fontWeight: '600' },
  editButton: { backgroundColor: '#43A047', padding: 6, borderRadius: 6, marginRight: 5 },
  editText: { color: '#fff', fontWeight: '600' },
  deleteButton: { backgroundColor: '#E53935', padding: 6, borderRadius: 6, marginRight: 5 },
  deleteText: { color: '#fff', fontWeight: '600' },
  saveButton: { backgroundColor: '#1E88E5', padding: 6, borderRadius: 6, marginRight: 5 },
  saveText: { color: '#fff', fontWeight: '600' },
});
// Reports.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const months2025 = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
];

const fakeIncomeData = [3000, 3200, 3100, 2800, 3500, 3300, 3000, 3400, 3200, 3600, 3100];
const fakeExpenseData = [2500, 3000, 2800, 2900, 3400, 3200, 3100, 3300, 3250, 3500, 3000];

const getAdvice = (income, expenses) => {
  const savings = income - expenses;
  if (savings > income * 0.2) {
    return { good: 'Excellent savings!', improve: '' };
  } else if (savings >= 0) {
    return { good: 'Managed okay.', improve: 'Could save a bit more next month.' };
  } else {
    return { good: '', improve: 'Overspent! Cut back on non-essential expenses.' };
  }
};

export default function Reports() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    const data = months2025.map((month, i) => {
      const income = fakeIncomeData[i];
      const expenses = fakeExpenseData[i];
      const savings = income - expenses;
      const advice = getAdvice(income, expenses);
      return { month, income, expenses, savings, advice };
    });
    setMonthlyData(data);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Monthly Reports 2025</Text>

      <LineChart
        data={{
          labels: months2025,
          datasets: [
            { data: monthlyData.map(m => m.income), color: () => '#2E7D32', strokeWidth: 3, label: 'Income' },
            { data: monthlyData.map(m => m.expenses), color: () => '#E53935', strokeWidth: 3, label: 'Expenses' },
            { data: monthlyData.map(m => m.savings), color: () => '#43A047', strokeWidth: 3, label: 'Savings' },
          ],
          legend: ['Income', 'Expenses', 'Savings'],
        }}
        width={screenWidth - 20}
        height={300} // slightly taller for readability
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#C8E6C9',
          backgroundGradientFrom: '#E8F5E9',
          backgroundGradientTo: '#A5D6A7',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: '7', strokeWidth: '3', stroke: '#1B5E20' }, // bigger dots
        }}
        style={{ marginVertical: 12, borderRadius: 16 }}
        fromZero
        bezier
        onDataPointClick={(data) => setSelectedMonth(monthlyData[data.index])}
      />

      {selectedMonth && (
        <View style={styles.detailsBox}>
          <Text style={styles.detailsTitle}>{selectedMonth.month} 2025</Text>
          <Text style={styles.detailText}>Total Income: ${selectedMonth.income}</Text>
          <Text style={styles.detailText}>Total Expenses: ${selectedMonth.expenses}</Text>
          <Text style={styles.detailText}>Savings: ${selectedMonth.savings}</Text>
          {selectedMonth.advice.good !== '' && (
            <Text style={styles.goodFeedback}>Good: {selectedMonth.advice.good}</Text>
          )}
          {selectedMonth.advice.improve !== '' && (
            <Text style={styles.improveFeedback}>Improve: {selectedMonth.advice.improve}</Text>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedMonth(null)}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#E8F5E9' },
  title: { fontSize: 30, fontWeight: '700', color: '#2E7D32', textAlign: 'center', marginVertical: 12 },
  detailsBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  detailsTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: '#1B5E20' },
  detailText: { fontSize: 20, marginBottom: 4, color: '#2E7D32' },
  goodFeedback: { color: 'green', fontWeight: '600', marginTop: 6, fontSize: 18 },
  improveFeedback: { color: 'red', fontWeight: '600', marginTop: 6, fontSize: 18 },
  closeButton: {
    marginTop: 12,
    backgroundColor: '#43A047',
    padding: 12,
    borderRadius: 10,
    alignSelf: 'center',
  },
  closeText: { color: '#ffffffff', fontWeight: '600', fontSize: 18 },
});
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const months2025 = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Fake sample data
const fakeIncomeData = [3000, 3200, 3100, 2800, 3500, 3300, 3000, 3400, 3200, 3600, 3100, 3300];
const fakeExpenseData = [2500, 3000, 2800, 2900, 3400, 3200, 3100, 3300, 3250, 3500, 3000, 3100];

// Generate advice based on income vs expenses
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
            { data: monthlyData.map(m => m.income), color: () => '#2E7D32', strokeWidth: 2, label: 'Income' },
            { data: monthlyData.map(m => m.expenses), color: () => '#E53935', strokeWidth: 2, label: 'Expenses' },
            { data: monthlyData.map(m => m.savings), color: () => '#43A047', strokeWidth: 2, label: 'Savings' },
          ],
          legend: ['Income', 'Expenses', 'Savings'],
        }}
        width={screenWidth - 20}
        height={250}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#C8E6C9',
          backgroundGradientFrom: '#E8F5E9',
          backgroundGradientTo: '#A5D6A7',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: '5', strokeWidth: '2', stroke: '#1B5E20' },
        }}
        style={{ marginVertical: 10, borderRadius: 16 }}
        fromZero
        bezier
        onDataPointClick={(data) => setSelectedMonth(monthlyData[data.index])}
      />

      {/* Show details only when user taps a month */}
      {selectedMonth && (
        <View style={styles.detailsBox}>
          <Text style={styles.detailsTitle}>{selectedMonth.month} 2025</Text>
          <Text>Total Income: ${selectedMonth.income}</Text>
          <Text>Total Expenses: ${selectedMonth.expenses}</Text>
          <Text>Savings: ${selectedMonth.savings}</Text>
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
  container: { flex: 1, padding: 10, backgroundColor: '#E8F5E9' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32', textAlign: 'center', marginVertical: 10 },
  detailsBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#1B5E20' },
  goodFeedback: { color: 'green', fontWeight: '600', marginTop: 5 },
  improveFeedback: { color: 'red', fontWeight: '600', marginTop: 5 },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#43A047',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  closeText: { color: '#000', fontWeight: '600' },
});
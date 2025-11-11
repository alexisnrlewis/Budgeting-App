import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function Challenges() {
  const [joinedChallenges, setJoinedChallenges] = useState([]);

  // Sample savings challenges
  const challenges = [
    { id: 1, title: 'Save $50 in a week' },
    { id: 2, title: 'No coffee shop spending for 3 days' },
    { id: 3, title: 'Save $100 in a month' },
    { id: 4, title: 'Track all spending for 7 days' },
    { id: 5, title: 'No take out for 5 days' }, // fixed duplicate id
  ];

  const joinChallenge = (challenge) => {
    if (!joinedChallenges.includes(challenge.id)) {
      setJoinedChallenges([...joinedChallenges, challenge.id]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Notification Banner */}
      {joinedChallenges.length > 0 && (
        <View style={styles.notification}>
          {joinedChallenges.map((id) => {
            const c = challenges.find(ch => ch.id === id);
            return <Text key={id} style={styles.notificationText}>Challenge started: "{c.title}"</Text>
          })}
        </View>
      )}

      <Text style={styles.title}>Savings Challenges</Text>
      <ScrollView contentContainerStyle={styles.challengeList}>
        {challenges.map((challenge) => (
          <View key={challenge.id} style={styles.challengeBox}>
            <Text style={styles.challengeText}>{challenge.title}</Text>
            <TouchableOpacity
              style={[
                styles.joinButton,
                joinedChallenges.includes(challenge.id) && styles.joinedButton
              ]}
              onPress={() => joinChallenge(challenge)}
              disabled={joinedChallenges.includes(challenge.id)}
            >
              <Text style={styles.joinText}>
                {joinedChallenges.includes(challenge.id) ? 'Joined' : 'Join'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#E8F5E9' },
  notification: { backgroundColor: '#A5D6A7', padding: 12, borderRadius: 10, marginBottom: 10 },
  notificationText: { color: '#1B5E20', fontSize: 18, textAlign: 'center', marginBottom: 5 },
  title: { fontSize: 24, fontWeight: '700', color: '#2E7D32', marginBottom: 12, textAlign: 'center' },
  challengeList: { paddingBottom: 20 },
  challengeBox: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3 },
  challengeText: { fontSize: 18, color: '#2E7D32', flex: 1, marginRight: 10 },
  joinButton: { backgroundColor: '#43A047', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  joinedButton: { backgroundColor: '#A5D6A7' },
  joinText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
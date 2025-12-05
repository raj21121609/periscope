import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function InsightsScreen() {
  return (
    <LinearGradient
      colors={['#E6E6FA', '#D8BFD8']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Your Insights</Text>

        <View style={styles.insightCard}>
          <Text style={styles.cardTitle}>Stress History</Text>
          {/* Placeholder for graph */}
          <View style={styles.graphPlaceholder} />
        </View>

        <View style={styles.insightCard}>
          <Text style={styles.cardTitle}>Mood Shifts</Text>
          {/* Placeholder for graph */}
          <View style={styles.graphPlaceholder} />
        </View>

        <View style={styles.insightCard}>
          <Text style={styles.cardTitle}>Sleep-Energy Correlation</Text>
          {/* Placeholder for graph */}
          <View style={styles.graphPlaceholder} />
        </View>

        <View style={styles.suggestionsCard}>
          <Text style={styles.cardTitle}>Suggested Wellness Routines</Text>
          <Text style={styles.suggestionText}>- Try a 5-minute meditation in the morning.</Text>
          <Text style={styles.suggestionText}>- Take a 10-minute walk after lunch.</Text>
          <Text style={styles.suggestionText}>- Journal for 5 minutes before bed.</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'serif',
  },
  insightCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  graphPlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  suggestionsCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  suggestionText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
});
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#E6E6FA', '#D8BFD8']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <View style={styles.avatarCard}>
            <Image
              source={{ uri: 'https://via.placeholder.com/80' }} // Placeholder for 3D avatar
              style={styles.avatar}
            />
          </View>
        </View>

        <View style={styles.wellnessContainer}>
          <View style={styles.wellnessIndicator}>
            <Text style={styles.indicatorLabel}>Mood Score</Text>
            <Text style={styles.indicatorValue}>8.2</Text>
          </View>
          <View style={styles.wellnessIndicator}>
            <Text style={styles.indicatorLabel}>Stress Level</Text>
            <Text style={styles.indicatorValue}>Low</Text>
          </View>
          <View style={styles.wellnessIndicator}>
            <Text style={styles.indicatorLabel}>Energy Score</Text>
            <Text style={styles.indicatorValue}>High</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/stress-scan')}>
            <Text style={styles.actionText}>Run Stress Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/chatbot')}>
            <Text style={styles.actionText}>Talk to My Twin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Daily Mind Balance</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.trendsContainer}>
          <Text style={styles.trendsTitle}>Your Weekly Progress</Text>
          {/* Placeholder for trend graph */}
          <View style={styles.graphPlaceholder} />
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
  headerContainer: {
    marginBottom: 20,
  },
  avatarCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 75,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  wellnessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  wellnessIndicator: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 15,
    width: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  indicatorLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  indicatorValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  actionsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#8A2BE2',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  trendsContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
  trendsTitle: {
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
});
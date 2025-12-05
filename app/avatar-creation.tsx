import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

export default function AvatarCreationScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#D8BFD8', '#E6E6FA']}
      style={styles.container}
    >
      <Text style={styles.header}>Your Cognitive Twin is ready</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder for 3D avatar
          style={styles.avatar}
        />
      </View>

      <Text style={styles.subHeader}>It adapts to your emotional state</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/dashboard')}
      >
        <Text style={styles.buttonText}>Continue to My Space →</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'serif',
  },
  avatarContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  subHeader: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
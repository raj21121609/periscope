import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
  const [isStressCheckEnabled, setIsStressCheckEnabled] = useState(true);
  const [isAvatarUpdatesEnabled, setIsAvatarUpdatesEnabled] = useState(true);
  const [isPersonalitySyncEnabled, setIsPersonalitySyncEnabled] = useState(true);

  return (
    <LinearGradient
      colors={['#E6E6FA', '#D8BFD8']}
      style={styles.container}
    >
      <Text style={styles.header}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Periodic stress checks</Text>
        <Switch
          value={isStressCheckEnabled}
          onValueChange={setIsStressCheckEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isStressCheckEnabled ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Avatar emotional updates</Text>
        <Switch
          value={isAvatarUpdatesEnabled}
          onValueChange={setIsAvatarUpdatesEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isAvatarUpdatesEnabled ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Chatbot personality sync</Text>
        <Switch
          value={isPersonalitySyncEnabled}
          onValueChange={setIsPersonalitySyncEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isPersonalitySyncEnabled ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity style={styles.privacyButton}>
        <Text style={styles.privacyButtonText}>Privacy Policy</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'serif',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  privacyButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  privacyButtonText: {
    fontSize: 16,
    color: '#8A2BE2',
    textDecorationLine: 'underline',
  },
});
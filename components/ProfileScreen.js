// screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = 'PIXEL_PROFILE';

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({ xp: 0, unlockedItems: [] });

  useEffect(() => {
    const loadProfile = async () => {
      const stored = await AsyncStorage.getItem(PROFILE_KEY);
      if (stored) setProfile(JSON.parse(stored));
    };
    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile</Text>
      <Text style={styles.text}>XP: {profile.xp}</Text>
      <Text style={styles.text}>Unlocked: {profile.unlockedItems.join(', ') || 'None yet 🌱'}</Text>
      <Button title="Back to Journal" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: {
    fontSize: 20,
    fontFamily: 'pixel',
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    fontFamily: 'pixel',
    marginBottom: 10,
  },
});

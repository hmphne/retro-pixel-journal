// screens/JournalScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GardenView from '../components/GardenView';

SplashScreen.preventAutoHideAsync();

const STORAGE_KEY = 'PIXEL_JOURNAL_ENTRIES';
const PROFILE_KEY = 'PIXEL_PROFILE';

export default function JournalScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    pixel: require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

  const [entry, setEntry] = useState('');
  const [history, setHistory] = useState([]);
  const [profile, setProfile] = useState({ xp: 0, unlockedItems: [] });

  useEffect(() => {
    const loadData = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const profileStored = await AsyncStorage.getItem(PROFILE_KEY);
      if (stored) setHistory(JSON.parse(stored));
      if (profileStored) setProfile(JSON.parse(profileStored));
    };
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      loadData();
    }
  }, [fontsLoaded]);

  const handleSave = async () => {
    if (entry.trim()) {
      const newEntry = { text: entry, date: new Date().toISOString() };
      const newHistory = [newEntry, ...history];
      const newXP = profile.xp + 10;

      const newProfile = {
        ...profile,
        xp: newXP,
        unlockedItems: newXP >= 50 && !profile.unlockedItems.includes('🌟')
          ? [...profile.unlockedItems, '🌟']
          : profile.unlockedItems,
      };

      setHistory(newHistory);
      setEntry('');
      setProfile(newProfile);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
    }
  };

  if (!fontsLoaded) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Retro Pixel Journal</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your thoughts..."
        value={entry}
        onChangeText={setEntry}
        multiline
      />
      <Button title="Save Entry" onPress={handleSave} />
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.profileLink}>👤 View Profile</Text>
      </TouchableOpacity>
      <View style={styles.history}>
        {history.map((item, index) => (
          <Text key={index} style={styles.entry}>
            {new Date(item.date).toLocaleDateString()}: {item.text}
          </Text>
        ))}
      </View>
      <GardenView entryCount={history.length} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: {
    fontSize: 20,
    fontFamily: 'pixel',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 100,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: 'top',
    fontFamily: 'pixel',
    fontSize: 12,
  },
  history: { marginTop: 20 },
  entry: {
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontFamily: 'pixel',
    fontSize: 10,
  },
  profileLink: {
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'pixel',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

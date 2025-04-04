import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar, Card, Button as PaperButton } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GardenView from './components/GardenView';
import Profile from './components/ProfileScreen';

SplashScreen.preventAutoHideAsync();

const STORAGE_KEY = 'PIXEL_JOURNAL_ENTRIES';

const Stack = createStackNavigator();

function JournalScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    pixel: require('./assets/fonts/PressStart2P-Regular.ttf'),
  });

  const [entry, setEntry] = useState('');
  const [history, setHistory] = useState([]);

  // Load saved entries on app start
  useEffect(() => {
    const loadEntries = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setHistory(JSON.parse(stored));
    };
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      loadEntries();
    }
  }, [fontsLoaded]);

  const handleSave = async () => {
    if (entry.trim()) {
      const newEntry = {
        text: entry,
        date: new Date().toLocaleString(), // Store the current date
      };
      const newHistory = [newEntry, ...history];
      setHistory(newHistory);
      setEntry('');
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    }
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Retro Pixel Journal" />
          <Appbar.Action icon="account" onPress={() => navigation.navigate('Profile')} />
        </Appbar.Header>

        <TextInput
          style={styles.input}
          placeholder="Type your thoughts..."
          value={entry}
          onChangeText={setEntry}
          multiline
          mode="outlined"
        />
        <PaperButton
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
        >
          Save Entry
        </PaperButton>

        <View style={styles.history}>
          {history.map((item, index) => (
            <Card key={index} style={styles.card}>
              <Card.Content>
                <Text style={styles.entry}>{item.text}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        <GardenView entryCount={history.length} />
      </ScrollView>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Journal">
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
    backgroundColor: '#f5f5f5',
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
    fontSize: 14,
  },
  saveButton: {
    marginTop: 10,
    borderRadius: 8,
  },
  history: {
    marginTop: 20,
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#e0f7fa',
  },
  entry: {
    fontFamily: 'pixel',
    fontSize: 14,
    color: '#333',
  },
  date: {
    fontFamily: 'pixel',
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
});

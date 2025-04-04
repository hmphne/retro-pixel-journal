import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    pixel: require('./assets/fonts/PressStart2P-Regular.ttf'),
  });

  const [entry, setEntry] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleSave = () => {
    if (entry.trim()) {
      setHistory([entry, ...history]);
      setEntry('');
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
      <View style={styles.history}>
        {history.map((item, index) => (
          <Text key={index} style={styles.entry}>
            {item}
          </Text>
        ))}
      </View>
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
});

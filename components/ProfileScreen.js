import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useFonts } from 'expo-font';

export default function Profile({ navigation }) {
  const [fontsLoaded] = useFonts({
    pixel: require('../assets/fonts/PressStart2P-Regular.ttf'),
  });

  const [userInfo] = useState({
    username: 'John Doe',
    xp: 120, // Example XP
    level: 3, // Example Level
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.info}>Username: {userInfo.username}</Text>
      <Text style={styles.info}>XP: {userInfo.xp}</Text>
      <Text style={styles.info}>Level: {userInfo.level}</Text>

      <Button
        title="Back to Journal"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontFamily: 'pixel',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontFamily: 'pixel',
    fontSize: 16,
    marginVertical: 5,
  },
});

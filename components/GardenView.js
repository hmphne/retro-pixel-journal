import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity, Text } from 'react-native';

const plantEmojis = ["🌱", "🌿", "🌷", "🌳", "🪴", "🌵", "🌻"];

export default function GardenView({ entryCount, onPlantTap }) {
  return (
    <View style={styles.grid}>
      {Array.from({ length: entryCount }).map((_, i) => {
        const emoji = plantEmojis[i % plantEmojis.length];
        return <AnimatedPlant key={i} emoji={emoji} onPress={() => onPlantTap?.(i)} />;
      })}
    </View>
  );
}

function AnimatedPlant({ emoji, onPress }) {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.Text style={[styles.plant, { transform: [{ scale }] }]}>
        {emoji}
      </Animated.Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  plant: {
    fontSize: 32,
    margin: 6,
  },
});

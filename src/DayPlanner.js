import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const DayPlanner = () => {
  // Array representing the hours in a day
  const timeSlots = [
    '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  return (
    <ScrollView style={styles.container}>
      {timeSlots.map((time, index) => (
        <View key={index} style={styles.timeSlot}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  timeSlot: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  timeText: {
    fontSize: 18,
    color: '#333',
  },
});

export default DayPlanner;

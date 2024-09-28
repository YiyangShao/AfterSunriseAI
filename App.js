import React from 'react';
import { View, StyleSheet } from 'react-native';
import Sidebar from './src/Sidebar';

export default function App() {
  return (
    <View style={styles.container}>
      <Sidebar />
      {/* Main content goes here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',  // Ensures sidebar and content are side by side
  },
});

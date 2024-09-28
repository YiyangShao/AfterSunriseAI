import React from 'react';
import { View, StyleSheet } from 'react-native';
import Sidebar from './src/Sidebar';
import Header from './src/Header';
import TaskCategories from './src/TaskCategories';
import DayPlanner from './src/DayPlanner';
import Footer from './src/Footer';

export default function App() {
  return (
    <View style={styles.container}>
      <Sidebar />
      <DayPlanner />
      <View style={styles.mainContent}>
        <Header />
        <TaskCategories />
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 3,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
});

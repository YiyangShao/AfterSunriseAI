import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Sidebar from './src/Sidebar';
import Header from './src/Header';
import TaskCategories from './src/TaskCategories';
import DayPlanner from './src/DayPlanner';
import Footer from './src/Footer';

export default function App() {
  const [workTasks, setWorkTasks] = useState([]);
  const [personalTasks, setPersonalTasks] = useState([]);

  return (
    <View style={styles.container}>
      {/* Sidebar stays on the left */}
      <Sidebar />

      {/* Main content containing Header, Day Planner, and TaskCategories */}
      <View style={styles.mainContent}>
        {/* Header now spans across both DayPlanner and TaskCategories */}
        <Header />
        
        {/* Layout with DayPlanner on the left and TaskCategories on the right */}
        <View style={styles.plannerAndTodo}>
          {/* DayPlanner on the left */}
          <View style={styles.leftColumn}>
            <DayPlanner tasks={[...workTasks, ...personalTasks]} />
          </View>
          {/* To-Do list (TaskCategories) on the right */}
          <View style={styles.rightColumn}>
            <TaskCategories
              setWorkTasks={setWorkTasks}
              setPersonalTasks={setPersonalTasks}
            />
          </View>
        </View>
        
        {/* Footer at the bottom spanning across both columns */}
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
  },
  plannerAndTodo: {
    flexDirection: 'row',
    flex: 1,
  },
  leftColumn: {
    flex: 1, // Adjust the size of the DayPlanner
    padding: 10,
  },
  rightColumn: {
    flex: 1, // Adjust the size of the TaskCategories (To-Do List)
    padding: 10,
  },
});

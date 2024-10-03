import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Sidebar from './src/Sidebar';
import Header from './src/Header';
import TaskCategories from './src/TaskCategories';
import DayPlanner from './src/DayPlanner';
import Footer from './src/Footer';

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      category: "work",
      title: "Prepare report",
      description: "Complete the monthly sales report.",
      status: "pending",
      priority: { level: "high" },
      created_at: "2024-10-02T09:00:00Z",
      due_date: "2024-10-10T17:00:00Z",
      tags: ["report", "finance"]
    },
    {
      id: "2",
      category: "personal",
      title: "Buy groceries",
      description: "Buy milk, eggs, and bread.",
      status: "completed",
      priority: { level: "medium" },
      created_at: "2024-10-01T10:30:00Z",
      due_date: null,
      tags: ["groceries", "shopping"]
    }
  ]);

  const [showPlan, setShowPlan] = useState(false); // State to control when to show the plan

  // Function to handle the "Plan My Day" button click
  const planMyDay = () => {
    setShowPlan(true); // Show the plan once the button is clicked
  };

  return (
    <View style={styles.container}>
      <Sidebar />
      <View style={styles.mainContent}>
        <Header />
        <View style={styles.plannerAndTodo}>
          {/* DayPlanner on the left */}
          <View style={styles.leftColumn}>
            <DayPlanner
              tasks={tasks} // Pass the tasks to the DayPlanner
              showPlan={showPlan} // Pass the showPlan state to DayPlanner
            />
          </View>
          {/* To-Do list on the right */}
          <View style={styles.rightColumn}>
            <TaskCategories
              tasks={tasks} // Pass the tasks to TaskCategories
              setTasks={setTasks} // Pass the setTasks function to allow task updates
            />
            {/* "Plan My Day" Button */}
            <Button title="Plan My Day" onPress={planMyDay} />
          </View>
        </View>
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

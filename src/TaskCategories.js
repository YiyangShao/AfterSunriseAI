import React, { useState, useEffect } from 'react';
import { View, StyleSheet, LayoutAnimation, UIManager, Platform } from 'react-native';
import TaskList from './TaskList';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskCategories = ({ tasks, setTasks }) => {
  // Split tasks into work and personal categories
  const workTasks = tasks.filter(task => task.category === 'work');
  const personalTasks = tasks.filter(task => task.category === 'personal');

  // State for new task input
  const [newWorkTask, setNewWorkTask] = useState('');
  const [newPersonalTask, setNewPersonalTask] = useState('');

  // Add new work task
  const addWorkTask = () => {
    if (newWorkTask.trim()) {
      const newTask = {
        id: (tasks.length + 1).toString(),  // Generate new ID
        category: 'work',
        text: newWorkTask,
        completed: false
      };
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate task addition
      setTasks([...tasks, newTask]);  // Update tasks state in App.js
      setNewWorkTask('');  // Clear the input
    }
  };

  // Add new personal task
  const addPersonalTask = () => {
    if (newPersonalTask.trim()) {
      const newTask = {
        id: (tasks.length + 1).toString(),  // Generate new ID
        category: 'personal',
        text: newPersonalTask,
        completed: false
      };
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate task addition
      setTasks([...tasks, newTask]);  // Update tasks state in App.js
      setNewPersonalTask('');  // Clear the input
    }
  };

  // Toggle work task completion
  const toggleWorkTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      task.category === 'work' && i === index
        ? { ...task, completed: !task.completed }
        : task
    );
    setTasks(updatedTasks);  // Update tasks state in App.js
  };

  // Toggle personal task completion
  const togglePersonalTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      task.category === 'personal' && i === index
        ? { ...task, completed: !task.completed }
        : task
    );
    setTasks(updatedTasks);  // Update tasks state in App.js
  };

  // Delete work task
  const deleteWorkTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => !(tasks[i].category === 'work' && i === index));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate task deletion
    setTasks(updatedTasks);  // Update tasks state in App.js
  };

  // Delete personal task
  const deletePersonalTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => !(tasks[i].category === 'personal' && i === index));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate task deletion
    setTasks(updatedTasks);  // Update tasks state in App.js
  };

  return (
    <View style={styles.container}>
      <TaskList
        tasks={workTasks}
        category="Work"
        newTaskText={newWorkTask}
        onAddTask={addWorkTask}
        onToggleCompletion={toggleWorkTaskCompletion}
        onDelete={deleteWorkTask}
        onInputChange={setNewWorkTask}
      />
      <TaskList
        tasks={personalTasks}
        category="Personal"
        newTaskText={newPersonalTask}
        onAddTask={addPersonalTask}
        onToggleCompletion={togglePersonalTaskCompletion}
        onDelete={deletePersonalTask}
        onInputChange={setNewPersonalTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default TaskCategories;

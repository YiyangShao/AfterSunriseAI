import React, { useState, useEffect } from 'react';
import { View, StyleSheet, LayoutAnimation, UIManager, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from './TaskList';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskCategories = () => {
  // State for storing tasks
  const [workTasks, setWorkTasks] = useState([]);
  const [personalTasks, setPersonalTasks] = useState([]);
  
  // State for new task input
  const [newWorkTask, setNewWorkTask] = useState('');
  const [newPersonalTask, setNewPersonalTask] = useState('');

  // Keys for AsyncStorage
  const WORK_TASKS_KEY = 'WORK_TASKS';
  const PERSONAL_TASKS_KEY = 'PERSONAL_TASKS';

  // Load tasks when the component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedWorkTasks = await AsyncStorage.getItem(WORK_TASKS_KEY);
        const storedPersonalTasks = await AsyncStorage.getItem(PERSONAL_TASKS_KEY);
        if (storedWorkTasks) setWorkTasks(JSON.parse(storedWorkTasks));
        if (storedPersonalTasks) setPersonalTasks(JSON.parse(storedPersonalTasks));
      } catch (error) {
        console.error('Failed to load tasks from storage', error);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage
  const saveTasks = async (key, tasks) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to storage', error);
    }
  };

  // Add new work task
  const addWorkTask = () => {
    if (newWorkTask.trim()) {
      const updatedWorkTasks = [...workTasks, { text: newWorkTask, completed: false }];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate task addition
      setWorkTasks(updatedWorkTasks);
      saveTasks(WORK_TASKS_KEY, updatedWorkTasks);  // Save to storage
      setNewWorkTask('');  // Clear the input
    }
  };

  // Add new personal task
  const addPersonalTask = () => {
    if (newPersonalTask.trim()) {
      const updatedPersonalTasks = [...personalTasks, { text: newPersonalTask, completed: false }];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate task addition
      setPersonalTasks(updatedPersonalTasks);
      saveTasks(PERSONAL_TASKS_KEY, updatedPersonalTasks);  // Save to storage
      setNewPersonalTask('');  // Clear the input
    }
  };

  // Toggle work task completion
  const toggleWorkTaskCompletion = (index) => {
    const updatedWorkTasks = workTasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setWorkTasks(updatedWorkTasks);
    saveTasks(WORK_TASKS_KEY, updatedWorkTasks);
  };

  // Toggle personal task completion
  const togglePersonalTaskCompletion = (index) => {
    const updatedPersonalTasks = personalTasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setPersonalTasks(updatedPersonalTasks);
    saveTasks(PERSONAL_TASKS_KEY, updatedPersonalTasks);
  };

  // Delete work task
  const deleteWorkTask = (index) => {
    const updatedWorkTasks = workTasks.filter((_, i) => i !== index);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate task deletion
    setWorkTasks(updatedWorkTasks);
    saveTasks(WORK_TASKS_KEY, updatedWorkTasks);  // Update storage
  };

  // Delete personal task
  const deletePersonalTask = (index) => {
    const updatedPersonalTasks = personalTasks.filter((_, i) => i !== index);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate task deletion
    setPersonalTasks(updatedPersonalTasks);
    saveTasks(PERSONAL_TASKS_KEY, updatedPersonalTasks);  // Update storage
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

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, LayoutAnimation, UIManager, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const addWorkTask = () => {
    if (newWorkTask.trim()) {
      const updatedWorkTasks = [...workTasks, newWorkTask];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate task addition
      setWorkTasks(updatedWorkTasks);
      saveTasks(WORK_TASKS_KEY, updatedWorkTasks);  // Save to storage
      setNewWorkTask('');  // Clear the input
    }
  };

  const addPersonalTask = () => {
    if (newPersonalTask.trim()) {
      const updatedPersonalTasks = [...personalTasks, newPersonalTask];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate task addition
      setPersonalTasks(updatedPersonalTasks);
      saveTasks(PERSONAL_TASKS_KEY, updatedPersonalTasks);  // Save to storage
      setNewPersonalTask('');  // Clear the input
    }
  };

  const deleteWorkTask = (index) => {
    const updatedWorkTasks = workTasks.filter((_, i) => i !== index);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate task deletion
    setWorkTasks(updatedWorkTasks);
    saveTasks(WORK_TASKS_KEY, updatedWorkTasks);  // Update storage
  };

  const deletePersonalTask = (index) => {
    const updatedPersonalTasks = personalTasks.filter((_, i) => i !== index);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate task deletion
    setPersonalTasks(updatedPersonalTasks);
    saveTasks(PERSONAL_TASKS_KEY, updatedPersonalTasks);  // Update storage
  };

  return (
    <View style={styles.container}>
      {/* Work Section */}
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Work</Text>
        {workTasks.map((task, index) => (
          <View key={index} style={styles.taskContainer}>
            <Text style={styles.taskText}>- {task}</Text>
            <TouchableOpacity onPress={() => deleteWorkTask(index)}>
              <Text style={styles.deleteButton}>❌</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TextInput
          style={styles.input}
          placeholder="New work task"
          value={newWorkTask}
          onChangeText={setNewWorkTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addWorkTask}>
          <Text style={styles.addButtonText}>+ Add new work to-do</Text>
        </TouchableOpacity>
      </View>

      {/* Personal Section */}
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Personal</Text>
        {personalTasks.map((task, index) => (
          <View key={index} style={styles.taskContainer}>
            <Text style={styles.taskText}>- {task}</Text>
            <TouchableOpacity onPress={() => deletePersonalTask(index)}>
              <Text style={styles.deleteButton}>❌</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TextInput
          style={styles.input}
          placeholder="New personal task"
          value={newPersonalTask}
          onChangeText={setNewPersonalTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addPersonalTask}>
          <Text style={styles.addButtonText}>+ Add new personal to-do</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  category: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    color: '#555',
  },
  deleteButton: {
    fontSize: 18,
    color: '#ff4d4d',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default TaskCategories;

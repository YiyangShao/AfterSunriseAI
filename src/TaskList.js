import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import TaskItem from './TaskItem.js';

const TaskList = ({ tasks, category, newTaskText, onAddTask, onToggleCompletion, onDelete, onInputChange }) => {
  return (
    <View style={styles.category}>
      <Text style={styles.categoryTitle}>{category}</Text>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          onToggleCompletion={onToggleCompletion}
          onDelete={onDelete}
        />
      ))}
      <TextInput
        style={styles.input}
        placeholder={`New ${category.toLowerCase()} task`}
        value={newTaskText}
        onChangeText={onInputChange}
      />
      <TouchableOpacity style={styles.addButton} onPress={onAddTask}>
        <Text style={styles.addButtonText}>+ Add new {category.toLowerCase()} to-do</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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

export default TaskList;

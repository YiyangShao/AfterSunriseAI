import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ task, index, onToggleCompletion, onDelete }) => {
  return (
    <View key={index} style={styles.taskContainer}>
      <TouchableOpacity onPress={() => onToggleCompletion(index)} style={styles.checkbox}>
        {task.completed && <Text style={styles.checkboxText}>✔</Text>}
      </TouchableOpacity>
      <Text style={[styles.taskText, task.completed && styles.completedTaskText]}>
        {task.text}
      </Text>
      <TouchableOpacity onPress={() => onDelete(index)}>
        <Text style={styles.deleteButton}>❌</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: '#007bff',
  },
  taskText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  deleteButton: {
    fontSize: 18,
    color: '#ff4d4d',
  },
});

export default TaskItem;

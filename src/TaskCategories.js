import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskCategories = () => {
  return (
    <View style={styles.container}>
      {/* Work Section */}
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Work</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add new work to-do</Text>
        </TouchableOpacity>
      </View>

      {/* Personal Section */}
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Personal</Text>
        <TouchableOpacity style={styles.addButton}>
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

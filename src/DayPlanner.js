import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

const DayPlanner = ({ tasks }) => {
  // State to store the fetched time blocks
  const [timeBlocks, setTimeBlocks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Placeholder time block data
  const placeholderTimeBlocks = [
    { time_slot: "09:00", task_title: "Placeholder Task 1" },
    { time_slot: "10:00", task_title: "Placeholder Task 2" },
    { time_slot: "11:00", task_title: "Placeholder Task 3" },
  ];

  // Function to send tasks to the backend and fetch time blocks
  const fetchTimeBlocks = async () => {
    try {
      // Convert tasks to JSON
      const taskData = JSON.stringify({ tasks });

      // Send tasks to the backend
      const response = await fetch('https://your-backend-url/api/assign-time-blocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: taskData,
      });

      // If the response is not ok, throw an error
      if (!response.ok) throw new Error("Failed to fetch data");

      // Fetch the assigned time blocks from the backend
      const data = await response.json();

      // Set time blocks
      setTimeBlocks(data.time_blocks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching time blocks:', error);
      setError(true); // Set error state
      setTimeBlocks(placeholderTimeBlocks); // Use placeholder data
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch time blocks when the component mounts
    fetchTimeBlocks();
  }, [tasks]); // Refetch time blocks when tasks change

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      {error && (
        <Text style={styles.errorMessage}>
          Failed to fetch time blocks from backend. Displaying placeholder data.
        </Text>
      )}
      {timeBlocks.map((block, index) => (
        <View key={index} style={styles.timeSlot}>
          <Text style={styles.timeText}>{block.time_slot}</Text>
          <Text style={styles.taskText}>{block.task_title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  timeSlot: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  errorMessage: {
    color: '#ff4d4d',
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DayPlanner;

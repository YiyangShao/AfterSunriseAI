import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

const DayPlanner = ({ tasks }) => {
  // State to store the fetched time blocks
  const [timeBlocks, setTimeBlocks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Placeholder time block data
  const placeholderTimeBlocks = [
    { time_slot: "09:00", task_title: "Placeholder Task 1", duration: 1 },
    { time_slot: "10:30", task_title: "Placeholder Task 2", duration: 1.5 },
    { time_slot: "14:00", task_title: "Placeholder Task 3", duration: 2 },
  ];

  // Function to fetch time blocks from the backend
  const fetchTimeBlocks = async () => {
    try {
      const taskData = JSON.stringify({ tasks });
      const response = await fetch('https://your-backend-url/api/assign-time-blocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: taskData,
      });
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
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
    fetchTimeBlocks();
  }, [tasks]); // Refetch time blocks when tasks change

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Define the available time slots (whole day)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  // Convert time (e.g., "09:00") to number of minutes since midnight
  const timeToMinutes = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  };

  // Render the task blocks based on time slots and durations
  const renderTaskBlocks = () => {
    return timeBlocks.map((block, index) => {
      const startMinutes = timeToMinutes(block.time_slot);
      const height = block.duration * 60; // 1 hour = 60px height

      return (
        <View
          key={index}
          style={[
            styles.taskBlock,
            {
              top: startMinutes, // Position the block based on the start time
              height: height, // Set height based on task duration
            },
          ]}
        >
          <Text style={styles.taskTitle}>{block.task_title}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.errorMessage}>
          Failed to fetch time blocks from backend. Displaying placeholder data.
        </Text>
      )}
      <ScrollView contentContainerStyle={styles.calendar} showsVerticalScrollIndicator={true}>
        {/* Render the time slots */}
        {timeSlots.map((time, index) => (
          <View key={index} style={styles.timeSlot}>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        ))}
        {/* Render the task blocks */}
        {renderTaskBlocks()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    position: 'relative',
    height: '100%', // Make sure the height of the container fills the screen
  },
  calendar: {
    position: 'relative',
    height: 24 * 60, // 24 hours, 60px for each hour
  },
  timeSlot: {
    height: 60, // Each hour is 60px tall
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
    position: 'relative',
  },
  timeText: {
    position: 'absolute',
    left: 0, // Position the time labels on the left of the screen
    fontSize: 16,
    color: '#777',
    width: 50, // Ensure there's enough room for the time labels
  },
  taskBlock: {
    position: 'absolute',
    left: 60, // Position the task block to the right of the time labels
    width: '80%',
    backgroundColor: '#ffbf47',
    borderRadius: 5,
    padding: 10,
  },
  taskTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: '#ff4d4d',
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DayPlanner;

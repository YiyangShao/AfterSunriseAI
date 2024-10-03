import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

// Fake data for time blocks, mimicking the structure in dataStructures.json
const fakeTimeBlocks = [
  {
    time_slot: "2024-10-02T09:00:00Z",
    end_time: "2024-10-02T11:00:00Z",
    task_id: "1",
    task_title: "Prepare report",
    duration: 120
  },
  {
    time_slot: "2024-10-02T14:00:00Z",
    end_time: "2024-10-02T15:00:00Z",
    task_id: "2",
    task_title: "Buy groceries",
    duration: 60
  }
];

const DayPlanner = ({ tasks, showPlan }) => {
  const [timeBlocks, setTimeBlocks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchTimeBlocks = async () => {
    try {
      setLoading(true); // Show loading indicator
      const taskData = JSON.stringify({
        user: {
          user_id: "user_id_123",
          preference_type: "⚡ Quick Wins"
        },
        tasks_json_structure: { tasks }
      });

      const response = await fetch('https://your-backend-url/api/assign-time-blocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: taskData
      });

      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setTimeBlocks(data.time_blocks_json_structure.time_blocks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching time blocks:', error);
      setError(true);
      setTimeBlocks(fakeTimeBlocks); // Use fake data in case of an error
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showPlan) {
      fetchTimeBlocks(); // Fetch time blocks when "Plan My Day" is clicked
    }
  }, [showPlan, tasks]); // Fetch time blocks whenever tasks change

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Convert time to minutes since midnight (adjusted for local time)
  const timeToMinutes = (time) => {
    const date = new Date(time);
    return date.getHours() * 60 + date.getMinutes();
  };

  const renderTaskBlocks = () => {
    return timeBlocks.map((block, index) => {
      const startMinutes = timeToMinutes(block.time_slot);
      const height = block.duration; // Duration is already in minutes

      return (
        <View
          key={index}
          style={[
            styles.taskBlock,
            {
              top: startMinutes, // Position the block based on the start time
              height: height, // Set height based on task duration (in minutes)
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
      {error && <Text style={styles.errorMessage}>Error fetching time blocks. Displaying fake data.</Text>}
      <ScrollView contentContainerStyle={styles.calendar} showsVerticalScrollIndicator={true}>
        {/* Render the time slots */}
        {Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`).map((time, index) => (
          <View key={index} style={styles.timeSlot}>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        ))}
        {/* Render task blocks only when showPlan is true and timeBlocks are available */}
        {showPlan && timeBlocks && renderTaskBlocks()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    position: 'relative',
    height: '100%',
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
    left: 0,
    fontSize: 16,
    color: '#777',
    width: 50,
  },
  taskBlock: {
    position: 'absolute',
    left: 60,
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

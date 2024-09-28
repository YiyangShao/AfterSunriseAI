import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Sidebar = () => {
  return (
    <View style={styles.sidebar}>
      {/* Navigation Items */}
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>Todos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>Planning</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>Analytics</Text>
      </TouchableOpacity>

      {/* User Settings/Profile at the Bottom */}
      <TouchableOpacity style={styles.profile}>
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#e0f0f3',  // Light cyan background for the sidebar
    paddingVertical: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  navItem: {
    marginBottom: 30,
    padding: 10,
  },
  navText: {
    fontSize: 18,
    color: '#333',
  },
  profile: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default Sidebar;

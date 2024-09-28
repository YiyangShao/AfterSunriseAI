import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      {/* Left side action */}
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionText}>Plan My Day</Text>
      </TouchableOpacity>

      {/* Right side actions */}
      <View style={styles.rightActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Start Break</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Shutdown the Day</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  actionButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
  },
  rightActions: {
    flexDirection: 'row',
  },
});

export default Footer;

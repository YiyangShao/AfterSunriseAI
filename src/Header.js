import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = () => {
  const [selectedTab, setSelectedTab] = useState('Today');

  const tabs = ['Today', 'Tomorrow', 'Rest of the week', 'Later'];

  return (
    <View style={styles.header}>
      {/* Date Selector */}
      <View style={styles.dateSelector}>
        <Text style={styles.dateText}>Sat, Sep 28</Text>
        <TouchableOpacity>
          <Text style={styles.calendarIcon}>📅</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabItem,
              selectedTab === tab && styles.selectedTabItem,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.selectedTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  calendarIcon: {
    fontSize: 22,
    color: '#007bff',  // Blue color for calendar icon
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedTabItem: {
    borderBottomColor: '#007bff',  // Blue underline for selected tab
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  selectedTabText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default Header;

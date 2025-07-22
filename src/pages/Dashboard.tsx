import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../components/BackButton';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackButton
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      <Text style={styles.text}>Welcome to the Dashboard!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a2a5c',
  },
   backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    zIndex: 2,
  },
});

export default Dashboard;

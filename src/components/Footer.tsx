import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationBell from './NotificationBell';
import Profile from './Profile';

interface FooterProps {
  style?: ViewStyle;
}

const Footer: React.FC<FooterProps> = ({ style }) => {
  const navigation = useNavigation();

  const handleHomePress = () => {
    // Navigate to Dashboard screen
    (navigation as any).navigate('Dashboard');
  };

  return (
    <View style={[styles.footerWrapper, style]}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={handleHomePress}
        activeOpacity={0.7}
      >
        <Ionicons name="home-outline" size={24} color="#1a2a5c" />
        <Text style={styles.footerButtonText}>Home</Text>
      </TouchableOpacity>

      <View style={styles.rightActions}>
        <View style={styles.notificationContainer}>
          <NotificationBell />
          <Text style={styles.notificationText}>Notifications</Text>
        </View>
        <Profile />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 24, // Extra padding for safe area
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  footerButtonText: {
    color: '#1a2a5c',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  notificationText: {
    color: '#1a2a5c',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default Footer;

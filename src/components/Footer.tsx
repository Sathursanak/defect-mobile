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
        style={styles.iconButton}
        onPress={handleHomePress}
        activeOpacity={0.7}
      >
        <Ionicons name="home-outline" size={24} color="#1a2a5c" />
        <Text style={styles.iconLabel}>Home</Text>
      </TouchableOpacity>

      <View style={styles.iconButton}>
        <NotificationBell />
        <Text style={styles.iconLabel}>Notifications</Text>
      </View>

      <View style={styles.iconButton}>
        <Profile />
        <Text style={styles.iconLabel}>Profile</Text>
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
    paddingHorizontal: 32,
    paddingVertical: 20,
    paddingBottom: 28, // Extra padding for safe area
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'transparent',
    minWidth: 70,
    flex: 1,
  },
  iconLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Footer;

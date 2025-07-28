import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Animated,
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
  const [activeTab, setActiveTab] = useState('home');
  const [scaleValues] = useState({
    home: new Animated.Value(1),
    notifications: new Animated.Value(1),
    profile: new Animated.Value(1),
  });

  const handleTabPress = (tabName: string, onPress?: () => void) => {
    setActiveTab(tabName);

    // Animate the pressed tab
    Animated.sequence([
      Animated.timing(scaleValues[tabName as keyof typeof scaleValues], {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValues[tabName as keyof typeof scaleValues], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Reset other tabs
    Object.keys(scaleValues).forEach(key => {
      if (key !== tabName) {
        Animated.timing(scaleValues[key as keyof typeof scaleValues], {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      }
    });

    if (onPress) {
      onPress();
    }
  };

  const handleHomePress = () => {
    handleTabPress('home', () => {
      (navigation as any).navigate('Dashboard');
    });
  };

  return (
    <View style={[styles.footerWrapper, style]}>
      <Animated.View style={{ transform: [{ scale: scaleValues.home }] }}>
        <TouchableOpacity
          style={[
            styles.iconButton,
            activeTab === 'home' && styles.activeButton,
          ]}
          onPress={handleHomePress}
          activeOpacity={0.7}
        >
          <Ionicons
            name={activeTab === 'home' ? 'home' : 'home-outline'}
            size={24}
            color="#ffffff"
          />
          <Text style={styles.iconLabel}>Home</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={{ transform: [{ scale: scaleValues.notifications }] }}
      >
        <TouchableOpacity
          style={[
            styles.iconButton,
            activeTab === 'notifications' && styles.activeButton,
          ]}
          onPress={() => handleTabPress('notifications')}
          activeOpacity={0.7}
        >
          <NotificationBell iconColor="#ffffff" />
          <Text style={styles.iconLabel}>Notifications</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleValues.profile }] }}>
        <TouchableOpacity
          style={[
            styles.iconButton,
            activeTab === 'profile' && styles.activeButton,
          ]}
          onPress={() => handleTabPress('profile')}
          activeOpacity={0.7}
        >
          <Profile iconColor="#ffffff" />
          <Text style={styles.iconLabel}>Profile</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a2a5c', // Theme color
    paddingHorizontal: 20,
    paddingVertical: 12, // Made thinner
    paddingBottom: 20, // Reduced padding for safe area
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0, // Removed border
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 1000,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6, // Reduced padding
    paddingHorizontal: 8, // Reduced padding
    borderRadius: 8,
    backgroundColor: 'transparent',
    minWidth: 60, // Reduced width
    flex: 1,
  },
  activeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle highlight for active state
    borderRadius: 8,
  },
  iconLabel: {
    fontSize: 11, // Slightly smaller
    color: '#ffffff', // White text
    marginTop: 3, // Reduced margin
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Footer;

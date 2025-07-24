import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from './BackButton';

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
  showLogout?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  style,
  children,
  showLogout = true,
}) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Navigate back to Welcome screen (which will reset the navigation stack)
    (navigation as any).reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <View style={[styles.headerWrapper, style]}>
      {onBack && <BackButton onPress={onBack} style={styles.backButton} />}
      {title && <Text style={styles.title}>{title}</Text>}
      {showLogout && (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={24} color="#1a2a5c" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    paddingTop: 48,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 28,
    left: 0,
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a2a5c',
    marginBottom: 4,
    textAlign: 'center',
    marginTop: 8,
  },
  logoutButton: {
    position: 'absolute',
    top: 28,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  logoutText: {
    color: '#1a2a5c',
    fontSize: 16,
    marginLeft: 4,
    fontWeight: 'bold',
  },
});

export default Header;

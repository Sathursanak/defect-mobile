import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface TopHeaderProps {
  title?: string;
  style?: ViewStyle;
  backgroundColor?: string;
  titleColor?: string;
  iconColor?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  style,
  backgroundColor = '#ffffff',
  titleColor = '#1a2a5c',
  iconColor = '#1a2a5c',
}) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={backgroundColor}
        translucent={false}
      />
      <View style={[styles.container, { backgroundColor }, style]}>
        <View style={styles.content}>
          {/* Center - App icon and title */}
          <View style={styles.centerSection}>
            <View
              style={[styles.appIconContainer, { backgroundColor: '#1a2a5c' }]}
            >
              <Ionicons name="bug-outline" size={28} color="#ffffff" />
            </View>
            {title && (
              <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingTop: Platform.OS === 'ios' ? 44 : 0, // Account for status bar on iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  centerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  appIconContainer: {
    marginRight: 12,
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    // textAlign: 'center',
    flex: 1,
    flexShrink: 1,
  },
});

export default TopHeader;

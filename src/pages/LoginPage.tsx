import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import RoundIcon from '../components/RoundIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginPage = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <ImageBackground
      source={{
        uri: 'https://wallpapers.com/images/hd/rough-texture-xw675uth5ut0s1w6.jpg',
      }}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <BackButton
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <View style={styles.card}>
          <View style={styles.centeredIconWrapper}>
            <RoundIcon size={72} backgroundColor="#1a2a5c">
              <Ionicons name="bug-outline" size={40} color="#fff" />
            </RoundIcon>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to your DefectTracker account
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              <Ionicons name="person-outline" size={18} /> Username
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#6b7280"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              <Ionicons name="lock-closed-outline" size={18} /> Password
            </Text>
            <View style={styles.inputIconWrapper}>
              <TextInput
                style={[styles.input, styles.inputWithIcon]}
                placeholder="Enter your password"
                placeholderTextColor="#6b7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIconTouchable}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={22}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rowBetween}>
            <View style={styles.rowAlignCenter}>
              <TouchableOpacity
                style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.7}
              >
                {rememberMe && (
                  <Ionicons name="checkmark" size={16} color="#1a2a5c" />
                )}
              </TouchableOpacity>
              <Text style={styles.rememberMe}>Remember me</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                (navigation as any).dispatch({
                  ...Object.assign({
                    type: 'NAVIGATE',
                    payload: { name: 'ForgotPassword' },
                  }),
                })
              }
            >
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => {
              if (username === 'admin' && password === 'admin') {
                (navigation as any).navigate('Dashboard');
              } else {
                // Optionally show an error or do nothing
              }
            }}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    zIndex: 2,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a2a5c',
    textAlign: 'center',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 18,
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontWeight: 'bold',
    color: '#1a2a5c',
    marginBottom: 6,
    fontSize: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    color: '#22223b',
    marginBottom: 0,
  },
  inputWithIcon: {
    paddingRight: 40,
  },
  eyeIconTouchable: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    height: '100%',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#1a2a5c',
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#e5e7eb',
    borderColor: '#1a2a5c',
  },
  rememberMe: {
    color: '#22223b',
    fontSize: 15,
  },
  forgotPassword: {
    color: '#1a2a5c',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signInButton: {
    backgroundColor: '#1a2a5c',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  inputIconWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredIconWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default LoginPage;

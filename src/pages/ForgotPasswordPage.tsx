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

const ForgotPasswordPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
              <Ionicons name="mail-outline" size={40} color="#fff" />
            </RoundIcon>
          </View>
          <Text style={styles.title}>Reset Password</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              <Ionicons name="mail-outline" size={18} /> Email Address
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor="#6b7280"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              <Ionicons name="lock-closed-outline" size={18} /> New Password
            </Text>
            <View style={styles.inputIconWrapper}>
              <TextInput
                style={[styles.input, styles.inputWithIcon]}
                placeholder="Enter new password"
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

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              <Ionicons name="lock-closed-outline" size={18} /> Confirm Password
            </Text>
            <View style={styles.inputIconWrapper}>
              <TextInput
                style={[styles.input, styles.inputWithIcon]}
                placeholder="Confirm new password"
                placeholderTextColor="#6b7280"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIconTouchable}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={22}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.sendButton}>
            <View style={styles.sendButtonContent}>
              <Ionicons
                name="refresh-outline"
                size={20}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.sendButtonText}>Reset</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.signInLinkWrapper}>
            Remember your password?{' '}
            <Text style={styles.signInLink} onPress={() => navigation.goBack()}>
              Sign in here
            </Text>
          </Text>
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
  centeredIconWrapper: {
    alignItems: 'center',
    marginBottom: 16,
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
  sendButton: {
    backgroundColor: '#1a2a5c',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 1,
  },
  sendButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWithIcon: {
    paddingRight: 40,
  },
  inputIconWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  eyeIconTouchable: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    height: '100%',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoBox: {
    backgroundColor: '#f3f6fa',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    marginTop: 8,
  },
  infoTitle: {
    color: '#1a2a5c',
    fontWeight: 'bold',
    fontSize: 15,
  },
  infoDesc: {
    color: '#6b7280',
    fontWeight: 'normal',
    fontSize: 14,
  },
  signInLinkWrapper: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 15,
    marginTop: 8,
  },
  signInLink: {
    color: '#1a2a5c',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default ForgotPasswordPage;

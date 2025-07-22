import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Button from '../src/components/button';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Bug = () => <Ionicons name="bug-outline" size={50} color="#fff" />;
const ArrowRight = () => (
  <Ionicons name="arrow-forward-outline" size={28} color="#fff" />
);

const Welcome = () => {
  const navigateToLogin = () => {
    console.log('Navigate to Login');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/free-vector/white-abstract-background-paper-style_23-2148397044.jpg?semt=ais_hybrid&w=740',
      }}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Bug />
          </View>
          <Text style={styles.title}>DefectTracker</Text>
          <Text style={styles.subtitle}>
            Professional Defect Management Platform
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome to the Future of</Text>
          <Text style={styles.cardHighlight}>Defect Management</Text>
          <Text style={styles.cardDesc}>
            Streamline your development workflow with our Defect tracking
            solution
          </Text>

          <Button
            style={styles.ctaButton}
            textStyle={styles.ctaButtonText}
            onPress={navigateToLogin}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.ctaButtonText}>Let's Get Started </Text>
              <ArrowRight />
            </View>
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1a2a5c', // dark blue
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a2a5c', // dark blue
    marginBottom: 4,
    marginTop: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280', // gray
    marginBottom: 8,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#22223b',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardHighlight: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a2a5c', // dark blue
    textAlign: 'center',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  features: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureTitle: {
    fontWeight: 'bold',
    color: '#1a2a5c', // dark blue
    fontSize: 16,
  },
  featureDesc: {
    color: '#6b7280',
    fontSize: 13,
  },
  ctaButton: {
    backgroundColor: '#1a2a5c', // dark blue
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  trustIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  trustItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  trustValue: {
    color: '#1a2a5c', // dark blue
    fontWeight: 'bold',
    fontSize: 16,
  },
  trustLabel: {
    color: '#6b7280',
    fontSize: 12,
  },
  trustDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 8,
  },
  footer: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 13,
    marginTop: 12,
  },
});

export default Welcome;

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import RoundIcon from '../components/RoundIcon';

const Bug = () => <Ionicons name="bug-outline" size={50} color="#fff" />;
const ArrowRight = () => (
  <Ionicons name="arrow-forward-outline" size={28} color="#fff" />
);

type RootStackParamList = {
  Login: undefined;
  // add other screens here if needed
};

const Welcome = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Animation values for entrance effects
  const logoSlideAnim = useRef(new Animated.Value(-100)).current; // Start from top
  const logoOpacityAnim = useRef(new Animated.Value(0)).current;
  const titleSlideAnim = useRef(new Animated.Value(50)).current; // Start from bottom
  const titleOpacityAnim = useRef(new Animated.Value(0)).current;
  const cardSlideAnim = useRef(new Animated.Value(100)).current; // Start from bottom
  const cardOpacityAnim = useRef(new Animated.Value(0)).current;

  // State for letter-by-letter subtitle animation
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  const fullSubtitle = 'Professional Defect Management Platform';

  useEffect(() => {
    // Entrance animation sequence - runs only once when component mounts
    const entranceSequence = Animated.sequence([
      // 1. Logo slides down and fades in
      Animated.parallel([
        Animated.timing(logoSlideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),

      // 2. Title slides up and fades in
      Animated.parallel([
        Animated.timing(titleSlideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacityAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),

      // 3. Card slides up and fades in
      Animated.parallel([
        Animated.timing(cardSlideAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(cardOpacityAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ]);

    // Start the entrance animation
    entranceSequence.start();

    // Letter-by-letter subtitle animation - starts after title appears
    const subtitleTimer = setTimeout(() => {
      let currentIndex = 0;
      const letterInterval = setInterval(() => {
        if (currentIndex <= fullSubtitle.length) {
          setDisplayedSubtitle(fullSubtitle.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(letterInterval);
        }
      }, 50); // 50ms per letter

      return () => clearInterval(letterInterval);
    }, 1400); // Start after logo and title animations

    return () => {
      clearTimeout(subtitleTimer);
    };
  }, [
    cardOpacityAnim,
    cardSlideAnim,
    logoOpacityAnim,
    logoSlideAnim,
    titleOpacityAnim,
    titleSlideAnim,
  ]);

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://wallpapers.com/images/hd/rough-texture-xw675uth5ut0s1w6.jpg',
      }}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Animated Logo */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacityAnim,
                transform: [{ translateY: logoSlideAnim }],
              },
            ]}
          >
            <RoundIcon size={96} backgroundColor="#1a2a5c">
              <Bug />
            </RoundIcon>
          </Animated.View>

          {/* Animated Title and Subtitle */}
          <Animated.View
            style={[
              styles.titleContainer,
              {
                opacity: titleOpacityAnim,
                transform: [{ translateY: titleSlideAnim }],
              },
            ]}
          >
            <Text style={styles.title}>DefectTracker</Text>
            <Text style={styles.subtitle}>{displayedSubtitle}</Text>
          </Animated.View>

          {/* Animated Card */}
          <Animated.View
            style={[
              styles.card,
              {
                opacity: cardOpacityAnim,
                transform: [{ translateY: cardSlideAnim }],
              },
            ]}
          >
            <Text style={styles.cardTitle}>Welcome to the Future of</Text>
            <Text style={styles.cardHighlight}>Defect Management</Text>
            <Text style={styles.cardDesc}>
              Streamline your development workflow with our Defect tracking
              solution
            </Text>

            <TouchableOpacity
              style={styles.ctaButton}
              onPress={navigateToLogin}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.ctaButtonText}>Let's Get Started </Text>
                <ArrowRight />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
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
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
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
    color: '#4e5a70ff', // gray
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppColors } from '../../assets/appColors';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  const appColors = useAppColors();
  const styles = useStyles(appColors);

  const handleGetStarted = () => {
    navigation.navigate('RoleSelection');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gradientContainer}>
        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/Logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.brandName}>ARAG</Text>
            <Text style={styles.tagline}>Logistics Management</Text>
          </View>

          {/* Content Section */}
          <View style={styles.contentSection}>
            <View style={styles.featureContainer}>
              <View style={styles.featureItem}>
                <View style={styles.featureDot}>
                  <View style={styles.featureDotInner} />
                </View>
                <Text style={styles.featureText}>
                  Streamlined Leave Management
                </Text>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureDot}>
                  <View style={styles.featureDotInner} />
                </View>
                <Text style={styles.featureText}>
                  Real-time Employee Tracking
                </Text>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureDot}>
                  <View style={styles.featureDotInner} />
                </View>
                <Text style={styles.featureText}>
                  Professional Workforce Solutions
                </Text>
              </View>
            </View>

            <Text style={styles.welcomeText}>
              Welcome to the future of{'\n'}workforce management
            </Text>

            <Text style={styles.description}>
              Empower your organization with intelligent leave management,
              seamless employee tracking, and professional HR solutions.
            </Text>
          </View>
        </ScrollView>

        {/* Fixed Action Section at Bottom */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const useStyles = appColors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appColors.white,
    },
    gradientContainer: {
      flex: 1,
      backgroundColor: appColors.white,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 24,
      paddingBottom: 20,
    },
    logoSection: {
      flex: 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 40,
      minHeight: 200,
    },
    logoContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: appColors.white,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: appColors.black,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 8,
      marginBottom: 16,
    },
    logo: {
      width: 80,
      height: 80,
    },
    brandName: {
      fontSize: 32,
      fontWeight: 'bold',
      color: appColors.black,
      letterSpacing: 2,
      marginBottom: 4,
    },
    tagline: {
      fontSize: 16,
      color: 'gray',
      fontWeight: '500',
    },
    contentSection: {
      justifyContent: 'center',
      paddingVertical: 20,
      minHeight: 300,
    },
    featureContainer: {
      marginBottom: 16,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      paddingLeft: 8,
    },
    featureDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: appColors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    featureDotInner: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: appColors.black,
    },
    featureText: {
      fontSize: 16,
      color: 'gray',
      fontWeight: '500',
    },
    welcomeText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: appColors.black,
      textAlign: 'center',
      lineHeight: 36,
      marginBottom: 16,
    },
    description: {
      fontSize: 16,
      color: 'gray',
      textAlign: 'center',
      lineHeight: 24,
      paddingHorizontal: 8,
    },
    actionSection: {
      paddingHorizontal: 16,
      backgroundColor: appColors.white,
    },
    getStartedButton: {
      width: '100%',
      height: 56,
      borderRadius: 28,
      marginBottom: 16,
      backgroundColor: appColors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: appColors.primary,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    buttonText: {
      color: appColors.black,
      fontSize: 18,
      fontWeight: 'bold',
    },
    footerText: {
      fontSize: 14,
      color: 'gray',
      textAlign: 'center',
    },
  });

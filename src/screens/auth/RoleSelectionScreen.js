import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppColors } from '../../assets/appColors';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from '../../storage/STORAGE';
import { SvgFromXml } from 'react-native-svg';
import svgs from '../../assets/svgs';

const { width } = Dimensions.get('window');

export default function RoleSelectionScreen({ navigation }) {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const [selectedRole, setSelectedRole] = useState(null);
  const [, setStoredRole] = useMMKVStorage('selectedRole', STORAGE, 'Employee');
  const [, setOnboardingCompleted] = useMMKVStorage(
    'onboardingCompleted',
    STORAGE,
    false,
  );

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnimHeader = useRef(new Animated.Value(-50)).current;
  const slideAnimEmployee = useRef(new Animated.Value(100)).current;
  const slideAnimEmployer = useRef(new Animated.Value(100)).current;
  const slideAnimButton = useRef(new Animated.Value(100)).current;
  const scaleAnimEmployee = useRef(new Animated.Value(1)).current;
  const scaleAnimEmployer = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Initial animation sequence
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(slideAnimHeader, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.stagger(200, [
          Animated.timing(slideAnimEmployee, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnimEmployer, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(slideAnimButton, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      // Pulse animation for button when role is selected
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 3 },
      ).start();
    }
  }, [selectedRole]);

  const handleContinue = () => {
    if (selectedRole) {
      // Button press animation
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setStoredRole(selectedRole);
        setOnboardingCompleted(true);
        navigation.navigate('Login');
      });
    }
  };

  const handleRoleSelect = role => {
    setSelectedRole(role);

    // Selection animation
    const scaleAnim =
      role === 'Employee' ? scaleAnimEmployee : scaleAnimEmployer;
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 150,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[{ opacity: fadeAnim }, { flex: 1 }]}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <Animated.View
            style={[
              styles.headerSection,
              {
                transform: [{ translateY: slideAnimHeader }],
              },
            ]}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/Logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>Choose Your Role</Text>
            <Text style={styles.subtitle}>
              Select how you'll be using ARAG to get the best experience
            </Text>
          </Animated.View>

          {/* Role Selection Section */}
          <View style={styles.roleSection}>
            {/* Employee Role */}
            <Animated.View
              style={{
                transform: [
                  { translateY: slideAnimEmployee },
                  { scale: scaleAnimEmployee },
                ],
              }}
            >
              <TouchableOpacity
                style={[
                  styles.roleCard,
                  selectedRole === 'Employee' && styles.selectedRoleCard,
                ]}
                onPress={() => handleRoleSelect('Employee')}
                activeOpacity={0.7}
              >
                <View style={styles.roleCardHeader}>
                  <View style={styles.roleIconContainer}>
                    <View style={styles.employeeIcon}>
                      <Text style={styles.iconText}>👤</Text>
                    </View>
                  </View>
                  {selectedRole === 'Employee' && (
                    <Animated.View
                      style={[
                        styles.checkIcon,
                        {
                          transform: [
                            {
                              scale: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                              }),
                            },
                          ],
                        },
                      ]}
                    >
                      <Text style={styles.checkIconText}>✓</Text>
                    </Animated.View>
                  )}
                </View>

                <View style={styles.roleCardContent}>
                  <Text
                    style={[
                      styles.roleTitle,
                      selectedRole === 'Employee' && styles.selectedRoleTitle,
                    ]}
                  >
                    Employee
                  </Text>
                  <Text
                    style={[
                      styles.roleDescription,
                      selectedRole === 'Employee' &&
                        styles.selectedRoleDescription,
                    ]}
                  >
                    Access your work schedule, request leaves, and manage your
                    professional calendar
                  </Text>

                  <View style={styles.featuresContainer}>
                    <View style={styles.featureRow}>
                      <View style={styles.featureDot} />
                      <Text
                        style={[
                          styles.featureText,
                          selectedRole === 'Employee' &&
                            styles.selectedFeatureText,
                        ]}
                      >
                        Submit and track leave requests
                      </Text>
                    </View>
                    <View style={styles.featureRow}>
                      <View style={styles.featureDot} />
                      <Text
                        style={[
                          styles.featureText,
                          selectedRole === 'Employee' &&
                            styles.selectedFeatureText,
                        ]}
                      >
                        View work schedules and calendar
                      </Text>
                    </View>
                    <View style={styles.featureRow}>
                      <View style={styles.featureDot} />
                      <Text
                        style={[
                          styles.featureText,
                          selectedRole === 'Employee' &&
                            styles.selectedFeatureText,
                        ]}
                      >
                        Monitor leave balance and history
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* Employer Role */}
            <Animated.View
              style={{
                transform: [
                  { translateY: slideAnimEmployer },
                  { scale: scaleAnimEmployer },
                ],
              }}
            >
              <TouchableOpacity
                style={[
                  styles.roleCard,
                  selectedRole === 'Employer' && styles.selectedRoleCard,
                ]}
                onPress={() => handleRoleSelect('Employer')}
                activeOpacity={0.7}
              >
                <View style={styles.roleCardHeader}>
                  <View style={styles.roleIconContainer}>
                    <View style={styles.employerIcon}>
                      <Text style={styles.iconText}>👥</Text>
                    </View>
                  </View>
                  {selectedRole === 'Employer' && (
                    <Animated.View
                      style={[
                        styles.checkIcon,
                        {
                          transform: [
                            {
                              scale: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                              }),
                            },
                          ],
                        },
                      ]}
                    >
                      <Text style={styles.checkIconText}>✓</Text>
                    </Animated.View>
                  )}
                </View>

                <View style={styles.roleCardContent}>
                  <Text
                    style={[
                      styles.roleTitle,
                      selectedRole === 'Employer' && styles.selectedRoleTitle,
                    ]}
                  >
                    Employer
                  </Text>
                  <Text
                    style={[
                      styles.roleDescription,
                      selectedRole === 'Employer' &&
                        styles.selectedRoleDescription,
                    ]}
                  >
                    Manage your team, approve requests, and oversee workforce
                    operations
                  </Text>

                  <View style={styles.featuresContainer}>
                    <View style={styles.featureRow}>
                      <View style={styles.featureDot} />
                      <Text
                        style={[
                          styles.featureText,
                          selectedRole === 'Employer' &&
                            styles.selectedFeatureText,
                        ]}
                      >
                        Review and approve leave requests
                      </Text>
                    </View>
                    <View style={styles.featureRow}>
                      <View style={styles.featureDot} />
                      <Text
                        style={[
                          styles.featureText,
                          selectedRole === 'Employer' &&
                            styles.selectedFeatureText,
                        ]}
                      >
                        Manage employee schedules
                      </Text>
                    </View>
                    <View style={styles.featureRow}>
                      <View style={styles.featureDot} />
                      <Text
                        style={[
                          styles.featureText,
                          selectedRole === 'Employer' &&
                            styles.selectedFeatureText,
                        ]}
                      >
                        Access workforce analytics
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <Animated.View
          style={[
            styles.bottomContainer,
            {
              transform: [
                { translateY: slideAnimButton },
                { scale: selectedRole ? pulseAnim : 1 },
              ],
            },
          ]}
        >
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                !selectedRole && styles.disabledButton,
              ]}
              onPress={handleContinue}
              disabled={!selectedRole}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <Text
                  style={[
                    styles.continueButtonText,
                    !selectedRole && styles.disabledButtonText,
                  ]}
                >
                  Continue to Login
                </Text>
                <Text
                  style={[
                    styles.arrowIcon,
                    !selectedRole && styles.disabledArrowIcon,
                  ]}
                >
                  →
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

const useStyles = appColors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8FAFC',
    },
    scrollContainer: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    headerSection: {
      alignItems: 'center',
      paddingTop: 40,
      paddingBottom: 32,
    },
    logoContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: appColors.white,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
      shadowColor: appColors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    logo: {
      width: 40,
      height: 40,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: '#1A202C',
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#718096',
      textAlign: 'center',
      lineHeight: 24,
      maxWidth: width * 0.8,
    },
    roleSection: {
      gap: 16,
      paddingBottom: 100, // Space for fixed button
    },
    roleCard: {
      backgroundColor: appColors.white,
      borderRadius: 20,
      padding: 0,
      borderWidth: 2,
      borderColor: '#E2E8F0',
      shadowColor: appColors.black,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 6,
      overflow: 'hidden',
    },
    selectedRoleCard: {
      borderColor: appColors.primary,
      borderWidth: 3,
      shadowColor: appColors.primary,
      shadowOpacity: 0.15,
    },
    roleCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 16,
    },
    roleIconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    employeeIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#EBF8FF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    employerIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#F0FFF4',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconText: {
      fontSize: 24,
    },
    checkIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: appColors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkIconText: {
      color: appColors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    roleCardContent: {
      paddingHorizontal: 24,
      paddingBottom: 24,
    },
    roleTitle: {
      fontSize: 26,
      fontWeight: '700',
      color: '#2D3748',
      marginBottom: 12,
    },
    selectedRoleTitle: {
      color: '#2D3748',
    },
    roleDescription: {
      fontSize: 16,
      color: '#718096',
      lineHeight: 24,
      marginBottom: 20,
    },
    selectedRoleDescription: {
      color: '#718096',
    },
    featuresContainer: {
      gap: 12,
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    featureDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: appColors.primary,
    },
    featureText: {
      fontSize: 15,
      color: '#4A5568',
      fontWeight: '500',
      flex: 1,
    },
    selectedFeatureText: {
      color: '#4A5568',
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: appColors.white,
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 40,
      borderTopWidth: 1,
      borderTopColor: '#E2E8F0',
      shadowColor: appColors.black,
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
    },
    continueButton: {
      backgroundColor: appColors.primary,
      borderRadius: 16,
      paddingVertical: 18,
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
    disabledButton: {
      backgroundColor: '#CBD5E0',
      shadowOpacity: 0,
      elevation: 0,
    },
    continueButtonText: {
      color: appColors.white,
      fontSize: 18,
      fontWeight: '700',
    },
    disabledButtonText: {
      color: '#A0AEC0',
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    arrowIcon: {
      color: appColors.white,
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 4,
    },
    disabledArrowIcon: {
      color: '#A0AEC0',
    },
  });

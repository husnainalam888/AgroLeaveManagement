// src/screens/Auth/LoginScreen.js
import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../../components/InputField';
import ActionButton from '../../components/ActionButton';
import Label from '../../components/Label';
import svgs from '../../assets/svgs';
import { useAppColors } from '../../assets/appColors';
import { useLogin } from '../../hooks/useLogin';
import { showToast } from '../../utils/toast';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from '../../storage/STORAGE';
import { SvgFromXml } from 'react-native-svg';

const TAG = 'LoginScreen';

export default function LoginScreen({ navigation }) {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const [selectedRole] = useMMKVStorage('selectedRole', STORAGE, 'Employee');
  const { email, setEmail, password, setPassword, isLoading, handleLogin } =
    useLogin({ selectedRole });

  const handleBackToRoleSelection = () => {
    navigation.navigate('RoleSelection');
  };

  // Animations
  const fadeIn = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-30)).current;
  const formSlide = useRef(new Animated.Value(40)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(headerSlide, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(formSlide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeIn, headerSlide, formSlide]);

  const onLoginPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.97,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
      }),
    ]).start(() => {
      handleLogin();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header Section with Logo */}
          <Animated.View
            style={[
              styles.headerSection,
              { opacity: fadeIn, transform: [{ translateY: headerSlide }] },
            ]}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/Logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            {/* <Text style={styles.subtitle}>
              Sign in to continue as {selectedRole}
            </Text> */}
          </Animated.View>

          <View style={styles.contentContainer}>
            {/* Role Indicator */}
            <Animated.View style={{ opacity: fadeIn }}>
              <TouchableOpacity
                style={styles.roleIndicator}
                onPress={handleBackToRoleSelection}
                activeOpacity={0.8}
              >
                <View style={styles.roleIndicatorContent}>
                  <View style={styles.roleIndicatorLeft}>
                    <View style={styles.roleBadge}>
                      <Text style={styles.roleEmoji}>
                        {selectedRole === 'Employee' ? '👤' : '👥'}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.roleIndicatorText}>
                        Logging in as {selectedRole}
                      </Text>
                      <Text style={styles.roleSubtext}>
                        Access your workspace
                      </Text>
                    </View>
                  </View>
                  <View style={styles.changeRoleButton}>
                    <Text style={styles.changeRoleText}>Change</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* Form Section */}
            <Animated.View
              style={[
                styles.formSection,
                { opacity: fadeIn, transform: [{ translateY: formSlide }] },
              ]}
            >
              <View style={styles.formCard}>
                <View style={styles.formHeader}>
                  <Text style={styles.formTitle}>Sign In</Text>
                  <Text style={styles.formSubtitle}>
                    Enter your credentials to access your account
                  </Text>
                </View>

                <View style={styles.inputContainer}>
                  <Label label="Email Address" />
                  <InputField
                    placeholder="Enter your email"
                    iconLeftXml={svgs.emailIcon}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Label label="Password" />
                  <InputField
                    placeholder="Enter your password"
                    secureTextEntry
                    iconLeftXml={svgs.lockIcon}
                    iconRightXml={svgs.eyeIcon}
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

                {/* <TouchableOpacity style={styles.forgotPasswordContainer}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity> */}

                <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                  <ActionButton
                    label={isLoading ? 'Signing In...' : 'Sign In'}
                    onPress={onLoginPress}
                    disabled={isLoading}
                    style={styles.loginButton}
                    icon={!isLoading ? '→' : undefined}
                  />
                </Animated.View>
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const useStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingBottom: 30,
    },
    headerSection: {
      alignItems: 'center',
      paddingTop: 36,
      paddingBottom: 16,
    },
    logoContainer: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: colors.cardBackground,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: colors.shadowColor,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 8,
    },
    logo: {
      width: 50,
      height: 50,
    },
    brandName: {
      fontSize: 32,
      fontWeight: '900',
      color: colors.textPrimary,
      letterSpacing: 0.5,
      marginBottom: 8,
    },
    welcomeText: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.welcomeTextColor,
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 16,
      color: colors.subtitleColor,
      textAlign: 'center',
      maxWidth: 280,
      lineHeight: 22,
    },
    contentContainer: {
      flex: 1,
      maxWidth: 400,
      alignSelf: 'center',
      width: '100%',
    },
    roleIndicator: {
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      paddingVertical: 16,
      paddingHorizontal: 18,
      marginBottom: 28,
      borderWidth: 1,
      borderColor: colors.roleIndicatorBorder,
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
    },
    roleIndicatorContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    },
    roleIndicatorLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: 14,
      minWidth: 0, // Allow text to shrink properly
    },
    roleBadge: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.roleBadgeBg,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors.primary,
      flexShrink: 0, // Prevent icon from shrinking
    },
    roleEmoji: {
      fontSize: 20,
    },
    roleIndicatorText: {
      color: colors.roleIndicatorTextColor,
      fontSize: 13,
      fontWeight: '700',
      marginBottom: 2,
      flexShrink: 1, // Allow text to shrink if needed
    },
    roleSubtext: {
      color: colors.roleSubtextColor,
      fontSize: 12,
      fontWeight: '500',
      flexShrink: 1, // Allow text to shrink if needed
    },
    changeRoleButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      flexShrink: 0, // Prevent button from shrinking
    },
    changeRoleText: {
      color: colors.white,
      fontSize: 13,
      fontWeight: '700',
    },
    formSection: {
      flex: 1,
    },
    formCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 20,
      padding: 24,
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    formHeader: {
      marginBottom: 28,
      alignItems: 'center',
    },
    formTitle: {
      fontSize: 24,
      fontWeight: '800',
      color: colors.formTitleColor,
      marginBottom: 6,
    },
    formSubtitle: {
      fontSize: 15,
      color: colors.formSubtitleColor,
      textAlign: 'center',
      lineHeight: 20,
    },
    inputContainer: {
      marginBottom: 24,
      gap: 8,
    },
    forgotPasswordContainer: {
      alignSelf: 'flex-end',
      marginBottom: 8,
      marginTop: -8,
      paddingVertical: 4,
    },
    forgotPasswordText: {
      color: colors.forgotPasswordColor,
      fontSize: 14,
      fontWeight: '600',
    },
    loginButton: {
      marginTop: 8,
      borderRadius: 14,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
  });

// src/screens/Auth/LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import HeadingLabel from '../../components/HeadingLable';
import InputField from '../../components/InputField';
import ActionButton from '../../components/ActionButton';
import Label from '../../components/Label';
import svgs from '../../assets/svgs';
import { useAppColors } from '../../assets/appColors';
import { useLogin } from '../../hooks/useLogin';
import { showToast } from '../../utils/toast';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from '../../storage/STORAGE';

const TAG = 'LoginScreen';

export default function LoginScreen({ navigation }) {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const [selectedRole, setSelectedRole] = useMMKVStorage(
    'selectedRole',
    STORAGE,
    'Employee',
  );
  const { email, setEmail, password, setPassword, isLoading, handleLogin } =
    useLogin({ selectedRole });

  return (
    <View style={styles.main}>
      <View style={styles.footerContainer}>
        <View style={styles.roleContainer}>
          <TouchableOpacity
            onPress={() => {
              setSelectedRole('Employee');
            }}
            style={[
              styles.roleButton,
              selectedRole === 'Employee' && styles.selectedRoleButton,
            ]}
          >
            <Text
              style={[
                styles.roleButtonText,
                selectedRole === 'Employee' && styles.selectedRoleButtonText,
              ]}
            >
              Employee
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedRole('Employer');
            }}
            style={[
              styles.roleButton,
              selectedRole === 'Employer' && styles.selectedRoleButton,
            ]}
          >
            <Text
              style={[
                styles.roleButtonText,
                selectedRole === 'Employer' && styles.selectedRoleButtonText,
              ]}
            >
              Employer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <HeadingLabel
          title="Sign In Your Account"
          subtitle="Elevate Your Employee Management with ARGO."
          iconXml={svgs.avatarIcon}
        />
        <View style={styles.formContainer}>
          <Label label="Email" />
          <InputField
            placeholder="Email"
            iconLeftXml={svgs.emailIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Label label="Password" />
          <InputField
            placeholder="Password"
            secureTextEntry
            iconLeftXml={svgs.lockIcon}
            iconRightXml={svgs.eyeIcon}
            value={password}
            onChangeText={setPassword}
          />
          <ActionButton
            label={
              isLoading
                ? 'Logging In…'
                : selectedRole === 'Employee'
                ? 'Login as Employee'
                : 'Login as Employer'
            }
            onPress={handleLogin}
            disabled={isLoading}
          />
        </View>
      </View>
    </View>
  );
}

const useStyles = colors =>
  StyleSheet.create({
    main: {
      flex: 1,
    },
    container: {
      marginTop: -20,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.white,
      paddingHorizontal: 20,
    },
    formContainer: {
      gap: 14,
      marginBottom: 20,
    },
    footerContainer: {
      gap: 10,
      paddingHorizontal: 16,
      paddingVertical: 16,
      zIndex: 1,
      backgroundColor: colors.white,
    },
    roleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.accent,
      borderRadius: 10,
    },
    roleButton: {
      padding: 10,
      borderColor: colors.black,
      borderRadius: 10,
      flex: 1,
    },
    roleButtonText: {
      fontSize: 12,
      textAlign: 'center',
      color: colors.gray,
    },
    selectedRoleButton: {
      backgroundColor: colors.primary,
    },
    selectedRoleButtonText: {
      color: colors.white,
    },
  });

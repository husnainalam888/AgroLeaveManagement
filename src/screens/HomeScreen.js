import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import svgs from '../assets/svgs';
import DepartWiseEmployeeList from '../components/DepartWiseEmployeeList.js';
import Fab from '../components/Fab.js';
import { useAppColors } from '../assets/appColors';
import { useEmployees, useCreateEmployee, useLogin } from '../hooks/api';

export const menuOptions = [
  { label: 'Sort by heading', onSelect: () => console.log('Sort by heading') },
  { label: 'Sort by ID', onSelect: () => console.log('Sort by ID') },
  {
    label: 'Sort by Department',
    onSelect: () => console.log('Sort by Department'),
  },
  {
    label: 'Sort by Designation',
    onSelect: () => console.log('Sort by Designation'),
  },
  { label: 'Sort by Status', onSelect: () => console.log('Sort by Status') },
];

const HomeScreen = () => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);

  const { data: employees, isLoading, error, refetch } = useEmployees();
  const createEmployee = useCreateEmployee();
  const login = useLogin();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={appColors.primary} />
        <Text style={styles.loadingText}>Loading employees...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Error loading employees</Text>
        <Text style={styles.retryText} onPress={refetch}>
          Tap to retry
        </Text>
      </View>
    );
  }

  const departWiseEmployeeList = employees?.data || [];

  return (
    <View style={styles.container}>
      <Header
        startIcon={svgs.logoIcon}
        threeDotOptions={menuOptions}
        label="Employees"
      />
      <DepartWiseEmployeeList data={departWiseEmployeeList} />
      <Fab />
    </View>
  );
};

export default HomeScreen;

const useStyles = appColors => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
    centerContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: appColors.text,
    },
    errorText: {
      fontSize: 16,
      color: appColors.error,
      textAlign: 'center',
    },
    retryText: {
      marginTop: 8,
      fontSize: 14,
      color: appColors.primary,
      textDecorationLine: 'underline',
    },
  });
};

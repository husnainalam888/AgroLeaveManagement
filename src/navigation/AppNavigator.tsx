import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen.js';
import BottomTabs from './BottomTabs.tsx';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useAppColors } from '../assets/appColors.js';
import EmployeeCalander from '../screens/EmployeeCalander';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.View}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: appColors.white },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="EmployeeCalander" component={EmployeeCalander} />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  );
}

const useStyles = appColors => {
  return StyleSheet.create({
    SafeAreaView: {
      flex: 1,
      backgroundColor: appColors.white,
    },
    View: {
      flex: 1,
      backgroundColor: appColors.white,
    },
  });
};

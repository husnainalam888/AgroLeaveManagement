import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useAppColors } from '../assets/appColors';
import LeaveRequests from '../components/LeaveRequests';

const Tab = createMaterialTopTabNavigator();
const TAB_NAMES = ['Pending', 'Approved', 'Rejected'];

const CustomTabBar = ({ state, navigation }) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tabItem, isFocused && styles.activeTab]}
          >
            <Text style={[styles.tabText, isFocused && styles.activeText]}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function NotificationTabs() {
  const appColors = useAppColors();
  const screenOptions = {
    headerShown: false,
    sceneStyle: { backgroundColor: appColors.white },
    tabBarPosition: 'top',
  };

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBar={props => <CustomTabBar {...props} />}
    >
      {TAB_NAMES.map(name => (
        <Tab.Screen key={name} name={name} component={LeaveRequests} />
      ))}
    </Tab.Navigator>
  );
}

const useStyles = appColors => {
  return StyleSheet.create({
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: appColors.secondary,
      margin: 16,
      borderRadius: 10,
      overflow: 'hidden',
    },
    tabItem: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabText: {
      fontWeight: '500',
      color: appColors.black,
    },
    activeTab: {
      backgroundColor: appColors.primary,
    },
    activeText: {
      fontWeight: '600',
      color: appColors.white,
    },
  });
};

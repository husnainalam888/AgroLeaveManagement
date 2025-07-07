import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useAppColors } from '../assets/appColors';
import LeaveRequests from '../components/LeaveRequests';
import {
  LeaveRequestsProvider,
  useLeaveRequests,
} from '../hooks/useLeaveRequests';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { STORAGE } from '../storage/STORAGE';
import Fab from '../components/Fab';
import AddLeaveActionSheet from '../components/AddLeaveActionSheet';

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

function LeaveTabsComponent() {
  const [selectedRole, setSelectedRole] = useMMKVStorage(
    'selectedRole',
    STORAGE,
    'Employee',
  );
  const appColors = useAppColors();
  const screenOptions = {
    headerShown: false,
    sceneStyle: { backgroundColor: appColors.white },
    tabBarPosition: 'top',
  };
  const addLeaveActionSheetRef = useRef(null);
  const { getLeaveRequests, leaveRequests, handleAddLeave, addingLeave } =
    useLeaveRequests();
  useEffect(() => {
    getLeaveRequests();
    console.log(
      'LeaveTabsComponent : useEffect : getLeaveRequests',
      leaveRequests,
    );
  }, []);

  const handleFabPress = () => {
    addLeaveActionSheetRef.current?.show();
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={screenOptions}
        tabBar={props => <CustomTabBar {...props} />}
      >
        {TAB_NAMES.map(name => (
          <Tab.Screen
            key={name}
            name={name}
            component={LeaveRequests}
            initialParams={{ status: name }}
          />
        ))}
      </Tab.Navigator>
      {selectedRole == 'Employee' && <Fab onPress={handleFabPress} />}
      <AddLeaveActionSheet
        actionSheetRef={addLeaveActionSheetRef}
        onAddLeavePress={handleAddLeave}
      />
    </>
  );
}

const LeaveTabs = props => {
  return (
    <LeaveRequestsProvider>
      <LeaveTabsComponent {...props} />
    </LeaveRequestsProvider>
  );
};

export default LeaveTabs;

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

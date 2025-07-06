import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import svgs from '../assets/svgs';
import { useAppColors } from '../assets/appColors';
import LeaveTabs from '../navigation/LeaveTabs';

const LeaveRequestScreen = () => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <View style={styles.container}>
      <Header startIcon={svgs.logoIcon} label="Leave Requests" />
      <View style={styles.leaveTabsContainer}>
        <LeaveTabs />
      </View>
    </View>
  );
};

export default LeaveRequestScreen;

const useStyles = appColors => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appColors.white,
      paddingHorizontal: 20,
    },
    leaveTabsContainer: {
      flex: 1,
      marginHorizontal: -12,
    },
  });
};

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { useAppColors } from '../assets/appColors';
import LeaveTabs from '../navigation/LeaveTabs';
import Logo from '../assets/Logo.png';

const LeaveRequestScreen = () => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.headerContainer}>
        <View style={styles.mainHeader}>
          <View style={styles.headerTop}>
            <View style={styles.titleSection}>
              <View style={styles.titleRow}>
                <Image source={Logo} style={styles.logo} resizeMode="contain" />
                <Text style={styles.headerTitle}>Leave Requests</Text>
              </View>
              <Text style={styles.headerSubtitle}>
                Manage employee leave applications
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Leave Tabs */}
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
      backgroundColor: appColors.background,
    },

    // Header Styles
    headerContainer: {
      paddingBottom: 20,
    },
    mainHeader: {
      backgroundColor: appColors.cardBackground,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 16 : 50,
      paddingHorizontal: 20,
      paddingBottom: 24,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      elevation: 2,
      shadowColor: appColors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    titleSection: {
      flex: 1,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
      gap: 12,
    },
    logo: {
      width: 40,
      height: 40,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: '800',
      color: appColors.black,
      marginBottom: 4,
      flex: 1,
    },
    headerSubtitle: {
      fontSize: 16,
      color: appColors.gray,
      marginTop: 5,
    },

    leaveTabsContainer: {
      flex: 1,
      marginHorizontal: 20,
    },
  });
};

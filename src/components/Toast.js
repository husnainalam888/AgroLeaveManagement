import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppColors } from '../assets/appColors';
import { SvgFromXml } from 'react-native-svg';
import svgs from '../assets/svgs';

const Toast = ({ type, text1, text2, props }) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return svgs.checkIcon || svgs.successIcon;
      case 'error':
        return svgs.errorIcon || svgs.closeIcon;
      case 'warning':
        return svgs.warningIcon || svgs.alertIcon;
      default:
        return svgs.infoIcon || svgs.notificationIcon;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      case 'warning':
        return '#FF9800';
      default:
        return appColors.primary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.iconContainer}>
        <SvgFromXml
          xml={getIcon()}
          width={20}
          height={20}
          color={appColors.white}
        />
      </View>
      <View style={styles.textContainer}>
        {text1 && <Text style={styles.title}>{text1}</Text>}
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>
    </View>
  );
};

const useStyles = appColors => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginHorizontal: 16,
      marginTop: 50,
      borderRadius: 8,
      shadowColor: appColors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    iconContainer: {
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      color: appColors.white,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,
    },
    message: {
      color: appColors.white,
      fontSize: 14,
      opacity: 0.9,
    },
  });
};

export default Toast;

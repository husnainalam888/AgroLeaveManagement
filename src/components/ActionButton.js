import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { useAppColors } from '../assets/appColors';

export default function ActionButton({
  label,
  onPress,
  style,
  secondary,
  small,
  loading,
  disabled,
  primaryOutline,
  icon,
}) {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.5}
      style={[
        styles.button,
        style,
        secondary && styles.secondary,
        small && styles.small,
        primaryOutline && styles.primaryOutline,
      ]}
      onPress={!loading && !disabled ? onPress : undefined}
    >
      <View style={styles.content}>
        <Text
          style={[
            styles.text,
            secondary && styles.secondaryText,
            small && styles.smallText,
            primaryOutline && styles.primaryOutlineText,
          ]}
        >
          {label}
        </Text>
        {icon && !loading && (
          <Text
            style={[
              styles.icon,
              secondary && styles.secondaryIcon,
              primaryOutline && styles.primaryOutlineIcon,
            ]}
          >
            {icon}
          </Text>
        )}
        {loading && <ActivityIndicator size="small" color={appColors.white} />}
      </View>
    </TouchableOpacity>
  );
}

const useStyles = appColors => {
  return StyleSheet.create({
    button: {
      backgroundColor: appColors.primary,
      padding: 15,
      borderRadius: 30,
      alignItems: 'center',
      marginVertical: 8,
      justifyContent: 'center',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    secondary: {
      borderWidth: 1,
      borderColor: appColors.darkGray,
      backgroundColor: 'transparent',
    },
    secondaryText: {
      color: appColors.darkGray,
    },
    text: { color: appColors.white, fontWeight: 'bold', fontSize: 16 },
    small: {
      padding: 10,
      borderRadius: 20,
    },
    smallText: {
      fontSize: 14,
    },
    primaryOutline: {
      borderWidth: 1,
      borderColor: appColors.primary,
      backgroundColor: 'transparent',
      color: appColors.primary,
    },
    primaryOutlineText: {
      color: appColors.primary,
    },
    icon: {
      color: appColors.white,
      fontSize: 18,
      fontWeight: 'bold',
    },
    secondaryIcon: {
      color: appColors.darkGray,
    },
    primaryOutlineIcon: {
      color: appColors.primary,
    },
  });
};

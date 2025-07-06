import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
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
      {loading && <ActivityIndicator size="small" color={appColors.white} />}

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
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
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
  });
};

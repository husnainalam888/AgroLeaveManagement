import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppColors } from '../assets/appColors';

export default function ActionButton({
  label,
  onPress,
  style,
  secondary,
  small,
}) {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        secondary && styles.secondary,
        small && styles.small,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          secondary && styles.secondaryText,
          small && styles.smallText,
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
  });
};

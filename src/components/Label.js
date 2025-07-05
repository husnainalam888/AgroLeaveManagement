import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { useAppColors } from '../assets/appColors';
const Label = ({ label, style }) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return <Text style={[styles.label, style]}>{label}</Text>;
};

export default Label;

const useStyles = appColors => {
  return StyleSheet.create({
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: appColors.black,
    },
  });
};

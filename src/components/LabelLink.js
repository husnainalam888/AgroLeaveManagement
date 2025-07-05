import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useAppColors } from '../assets/appColors';

export default function LabelLink({ label, linkText, onPress }) {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <Text style={styles.base}>
      {label}
      <Text style={styles.link} onPress={onPress}>
        {' '}
        {linkText}
      </Text>
    </Text>
  );
}

const useStyles = appColors => {
  return StyleSheet.create({
    base: {
      textAlign: 'center',
      fontSize: 14,
      color: appColors.darkGray,
    },
    link: {
      color: appColors.primary,
      fontWeight: '600',
    },
  });
};

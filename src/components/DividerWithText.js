import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppColors } from '../assets/appColors';
export default function DividerWithText({ text = 'or' }) {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
}

const useStyles = appColors => {
  return StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center' },
    line: { flex: 1, height: 1, backgroundColor: appColors.borderColor },
    text: { marginHorizontal: 10, color: appColors.darkGray },
  });
};

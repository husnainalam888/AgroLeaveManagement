import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgFromXml } from 'react-native-svg';
import { useAppColors } from '../assets/appColors';
export default function HeadingLabel({ title, subtitle, iconXml }) {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title} <SvgFromXml xml={iconXml} width={20} height={20} />
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const useStyles = appColors =>
  StyleSheet.create({
    container: { marginBottom: 20 },
    title: { fontSize: 26, fontWeight: 'bold', color: appColors.black },
    subtitle: { color: appColors.darkGray, marginTop: 8 },
  });

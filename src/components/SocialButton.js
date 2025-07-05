import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgFromXml } from 'react-native-svg';
import { useAppColors } from '../assets/appColors';
export default function SocialButton({ label, iconXml, onPress }) {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <SvgFromXml xml={iconXml} width={20} height={20} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const useStyles = appColors => {
  return StyleSheet.create({
    button: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 12,
      alignItems: 'center',
      marginBottom: 10,
    },
    text: { marginLeft: 10, fontSize: 14, color: appColors.black },
  });
};

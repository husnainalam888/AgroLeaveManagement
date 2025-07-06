import { StyleSheet, Text, TouchableO, TouchableOpacity } from 'react-native';
import React from 'react';
import { SvgFromXml } from 'react-native-svg';
import svgs from '../assets/svgs';
import { useAppColors } from '../assets/appColors';
const Fab = ({ onPress }) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <SvgFromXml xml={svgs.pluseIcon} width={24} height={24} />
    </TouchableOpacity>
  );
};

export default Fab;

const useStyles = appColors => {
  return StyleSheet.create({
    fab: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: appColors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
  });
};

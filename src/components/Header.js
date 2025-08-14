import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SvgFromXml } from 'react-native-svg';
import { useAppColors } from '../assets/appColors';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import svgs from '../assets/svgs';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Header = ({
  startIcon = svgs.logoIcon,
  backButton,
  threeDotOptions,
  label,
  footer,
}) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {backButton && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color={appColors.black} />
        </TouchableOpacity>
      )}
      {!backButton && (
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      )}
      <Text style={[styles.label, { marginLeft: -34 }]}>{label}</Text>
      {threeDotOptions ? (
        // <MenuComp options={threeDotOptions} />
        <View style={styles.threeDotIcon} />
      ) : (
        <View style={styles.threeDotIcon} />
      )}
      {footer && <View style={styles.footer}>{footer()}</View>}
    </View>
  );
};

const MenuComp = ({ options }) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <Menu>
      <MenuTrigger>
        <SvgFromXml xml={svgs.threeDotIcon} width={20} height={20} />
      </MenuTrigger>
      <MenuOptions>
        {options.map((option, index) => (
          <MenuOption
            style={styles.menuOption}
            key={index}
            onSelect={() => option.onSelect}
          >
            <Text>{option.label}</Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default Header;

const useStyles = appColors => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: appColors.black,
    },
    menuOption: {
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    logo: {
      height: 30,
      width: 30,
      resizeMode: 'contain',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
  });
};

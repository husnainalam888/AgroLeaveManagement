import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { SvgFromXml } from 'react-native-svg';
import svgs from '../assets/svgs';
import { useAppColors } from '../assets/appColors';
const { eyeIcon, closedEyeIcon } = svgs;
export default function InputField({
  placeholder,
  iconLeftXml,
  iconRightXml,
  secureTextEntry,
}) {
  const [showPassword, setShowPassword] = React.useState(secureTextEntry);
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  let endIcon = iconRightXml;
  if (secureTextEntry) {
    endIcon = !showPassword ? closedEyeIcon : eyeIcon;
  }
  const handleEndIconPress = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={styles.inputContainer}>
      {iconLeftXml && (
        <SvgFromXml
          xml={iconLeftXml}
          width={20}
          height={20}
          style={styles.iconLeft}
        />
      )}
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={showPassword}
        placeholderTextColor={appColors.gray}
      />
      {iconRightXml && (
        <SvgFromXml
          onPress={handleEndIconPress}
          xml={endIcon}
          width={20}
          height={20}
          style={styles.iconRight}
        />
      )}
    </View>
  );
}

const useStyles = appColors => {
  return StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    iconLeft: { marginRight: 8 },
    iconRight: { marginLeft: 'auto' },
    input: { flex: 1, fontSize: 14, color: appColors.black },
  });
};

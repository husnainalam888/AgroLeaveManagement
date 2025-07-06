import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SvgFromXml } from 'react-native-svg';
import svgs from '../assets/svgs';
import { useAppColors } from '../assets/appColors';
const { eyeIcon, closedEyeIcon } = svgs;
export default function InputField({
  placeholder,
  iconLeftXml,
  iconRightXml,
  secureTextEntry,
  value,
  onChangeText,
  renderRightElement,
  disabled,
  textArea,
  onPress,
  ...props
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
    <TouchableOpacity
      style={styles.inputContainer}
      onPress={onPress}
      disabled={!onPress}
    >
      {iconLeftXml && (
        <SvgFromXml
          xml={iconLeftXml}
          width={20}
          height={20}
          style={styles.iconLeft}
        />
      )}

      {!onPress ? (
        <TextInput
          multiline={textArea}
          placeholder={placeholder}
          style={[styles.input, textArea && { height: 100 }]}
          secureTextEntry={showPassword}
          placeholderTextColor={appColors.gray}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          {...props}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={[styles.input, { flex: 1 }]}>
            {value || placeholder}
          </Text>
        </View>
      )}
      {iconRightXml && (
        <SvgFromXml
          onPress={handleEndIconPress}
          xml={endIcon}
          width={20}
          height={20}
          style={styles.iconRight}
        />
      )}
      {renderRightElement && renderRightElement}
    </TouchableOpacity>
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

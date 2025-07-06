import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Label from './Label';
import { useAppColors } from '../assets/appColors';

const DropDownPicker = ({ data, label, value, setValue }) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Label label={label} />
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: appColors.overlayColor },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.containerStyle}
        itemContainerStyle={styles.itemContainerStyle}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        activeColor={appColors.darkGray}
        mode="auto"
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select ' + label : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderItem={(item, selected) => (
          <View style={[styles.item]}>
            <Text style={[styles.itemHeading]}>{item.label}</Text>
            {item?.subLabel && (
              <Text style={[styles.itemSubHeading]}>{item?.subLabel}</Text>
            )}
          </View>
        )}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? appColors.primary : appColors.black}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropDownPicker;

const useStyles = appColors => {
  return StyleSheet.create({
    container: {
      backgroundColor: appColors.white,
      gap: 16,
    },
    dropdown: {
      height: 50,
      borderColor: appColors.borderColor,
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: appColors.white,
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      color: appColors.gray,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: appColors.black,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      borderRadius: 5,
    },
    containerStyle: {
      backgroundColor: appColors.white,
      borderRadius: 10,
    },
    itemContainerStyle: {},
    itemTextStyle: {
      color: appColors.black,
    },
    item: {
      padding: 16,
      gap: 8,
      justifyContent: 'space-between',
    },
    itemHeading: {
      fontSize: 16,
      color: appColors.black,
    },
    itemSubHeading: {
      fontSize: 12,
      color: appColors.lightGray,
    },
  });
};

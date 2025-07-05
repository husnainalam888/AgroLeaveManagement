import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { SvgFromXml } from 'react-native-svg';
import svgs from '../assets/svgs';
import EmployeeList from './EmployeeList';
import { useAppColors } from '../assets/appColors';

const EmployeeItem = ({ item, isOpened, toggle, isShift, onEdit }) => {
  const appColors = useAppColors();
  const stylesObj = getStyles(isShift, appColors);

  return (
    <View style={stylesObj.container}>
      <TouchableOpacity
        onPress={toggle}
        style={[
          stylesObj.header,
          isOpened ? stylesObj.openedHeader : stylesObj.closedHeader,
        ]}
      >
        <Text style={stylesObj.headerText}>{item.heading}</Text>
        {!isShift && (
          <SvgFromXml
            xml={isOpened ? svgs.arrowUpIcon : svgs.arrowDownIcon}
            width={20}
            height={20}
          />
        )}
      </TouchableOpacity>
      {isOpened && <EmployeeList useMap data={item.subList} onEdit={onEdit} />}
    </View>
  );
};

const getStyles = (isShift = false, appColors) =>
  StyleSheet.create({
    container: {
      padding: isShift ? 0 : 16,
      borderWidth: isShift ? 0 : 1,
      borderColor: appColors.borderColor,
      borderRadius: 8,
      gap: 4,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      paddingHorizontal: isShift ? 0 : 8,
    },
    openedHeader: {
      paddingBottom: 16,
      borderBottomWidth: isShift ? 0 : 1,
      borderBottomColor: appColors.borderColor,
    },
    closedHeader: {
      paddingBottom: 0,
    },
    headerText: {
      fontSize: isShift ? 14 : 16,
      fontWeight: '500',
      color: isShift ? appColors.gray : appColors.black,
    },
  });

export default EmployeeItem;

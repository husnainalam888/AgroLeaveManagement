import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppColors } from '../assets/appColors';
import { SvgFromXml } from 'react-native-svg';
import svgs from '../assets/svgs';

export default function CustomBottomTabBarItem({
  state,
  descriptors,
  navigation,
}: any) {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const svgIcon = isFocused
          ? svgs[label.toLowerCase()]
          : svgs[label.toLowerCase() + 'Outline'];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
          >
            <SvgFromXml xml={svgIcon} height={24} width={24} />
            <Text style={[styles.label, isFocused ? styles.focused : {}]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const useStyles = appColors => {
  return StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 5,
      backgroundColor: appColors.secondary,
      borderTopWidth: 1,
      borderTopColor: appColors.borderColor,
    },
    container: {
      alignItems: 'center',
      padding: 5,
      flex: 1,
    },
    label: {
      fontSize: 12,
      color: appColors.darkGray,
    },
    focused: {
      color: appColors.primary,
      fontWeight: 'bold',
    },
  });
};

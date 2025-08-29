import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppColors } from '../assets/appColors';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';

export default function CustomBottomTabBarItem({
  state,
  descriptors,
  navigation,
}: any) {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dock}>
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;

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

          // Get vector icon names
          const getTabIcon = (tabName: string, focused: boolean) => {
            const iconName = tabName.toLowerCase();
            switch (iconName) {
              case 'employees':
                return focused ? 'people' : 'people-outline';
              case 'leaves':
                return focused ? 'document-text' : 'document-text-outline';
              case 'shifts':
                return focused ? 'time' : 'time-outline';
              case 'menu':
                return focused ? 'settings' : 'settings-outline';
              default:
                return 'people-outline';
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.container, isFocused && styles.focusedContainer]}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconContainer,
                  isFocused && styles.focusedIconContainer,
                ]}
              >
                <Icon
                  name={getTabIcon(label, isFocused)}
                  size={24}
                  color={isFocused ? appColors.primary : '#8E8E93'}
                />
              </View>
              <Text style={[styles.label, isFocused && styles.focusedLabel]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const useStyles = (appColors: any) => {
  return StyleSheet.create({
    mainContainer: { borderTopWidth: 1, borderColor: appColors.primary },
    dock: {
      flexDirection: 'row',
      alignItems: 'center',

      justifyContent: 'space-around',
      backgroundColor: appColors.background,
      // borderRadius: 100,
      paddingVertical: 4,
      // paddingHorizontal: 12,
      shadowColor: appColors.black,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 24,
      // elevation: 4,
    },
    container: {
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 16,
      minWidth: 60,
      position: 'relative',
      zIndex: 1,
      backgroundColor: 'transparent',
    },
    focusedContainer: {
      backgroundColor: 'transparent',
    },
    iconContainer: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    focusedIconContainer: {
      backgroundColor: 'transparent',
    },
    label: {
      fontSize: 12,
      color: '#8E8E93',
      fontWeight: '500',
      textAlign: 'center',
    },
    focusedLabel: {
      color: appColors.primary,
      fontWeight: '600',
    },
  });
};

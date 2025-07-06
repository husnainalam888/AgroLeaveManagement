import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';
import { useAppColors } from '../assets/appColors';
import svgs from '../assets/svgs';
import { SvgFromXml } from 'react-native-svg';
import { STORAGE } from '../storage/STORAGE';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { ImageWithPlaceholder } from './AddEmployeeSheet';
const EmployeeList = ({ data, useMap = false, onEdit }) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return useMap ? (
    <View style={styles.flatListContent}>
      {data.map(item => (
        <SingleEmployeeItem key={item.id} item={item} onEdit={onEdit} />
      ))}
    </View>
  ) : (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      style={styles.flatList}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatListContent}
      renderItem={({ item }) => (
        <SingleEmployeeItem item={item} onEdit={onEdit} />
      )}
    />
  );
};

export const SingleEmployeeItem = ({ item, hideEditIcon = false, onEdit }) => {
  const [isDarkMode] = useMMKVStorage('isDarkMode', STORAGE, false);
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <View style={styles.container}>
      <ImageWithPlaceholder
        image={item.image}
        style={styles.image}
        size={30}
        containerStyle={{ marginTop: 10 }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.heading}</Text>
        <Text style={styles.email}>{item.label}</Text>
      </View>
      {!hideEditIcon && (
        <TouchableOpacity
          onPress={() =>
            onEdit
              ? onEdit(item)
              : console.log('SingleEmployeeItem : onEdit : not defined')
          }
        >
          <SvgFromXml
            color={appColors.primary}
            xml={isDarkMode ? svgs.editIconLight : svgs.editIcon}
            width={20}
            height={20}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmployeeList;

const useStyles = appColors => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: appColors.accent,
    },
    flatList: {
      marginTop: 16,
    },
    flatListContent: {
      flexGrow: 1,
      gap: 10,
      paddingVertical: 8,
    },
    infoContainer: {
      flex: 1,
      gap: 4,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: appColors.black,
    },
    email: {
      fontSize: 14,
      color: appColors.darkGray,
    },
  });
};

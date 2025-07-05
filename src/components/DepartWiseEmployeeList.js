import React, { useState, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import EmployeeItem from './EmployeeItem.js';
import { context as contextConstants } from '../constants/constants';

const DepartWiseEmployeeList = ({ data, context, onEdit }) => {
  const [closedDepartments, setClosedDepartments] = useState(new Set());
  const isShift = context === contextConstants.shift;

  const toggleDepartment = useCallback(id => {
    setClosedDepartments(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <EmployeeItem
        item={item}
        isOpened={!closedDepartments.has(item.id)}
        toggle={() => toggleDepartment(item.id)}
        isShift={isShift}
        onEdit={onEdit}
      />
    ),
    [closedDepartments, isShift, toggleDepartment],
  );

  const stylesObj = useMemo(() => getStyles(isShift), [isShift]);

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      style={stylesObj.flatList}
      contentContainerStyle={stylesObj.flatListContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

const getStyles = (isShift = false) =>
  StyleSheet.create({
    flatList: {
      marginTop: 16,
    },
    flatListContent: {
      flexGrow: 1,
      gap: isShift ? 32 : 16,
      paddingTop: 8,
      paddingBottom: 92, // 16 + 76
    },
  });

export default DepartWiseEmployeeList;

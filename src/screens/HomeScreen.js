import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import React, { useRef, useState, useMemo } from 'react';
// LinearGradient removed - using regular styling instead
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppColors } from '../assets/appColors';
import { useHomeScreen } from '../hooks/useHomeScreen';
import AddEmployeeSheet from '../components/AddEmployeeSheet';
import { SingleEmployeeItem } from '../components/EmployeeList';

export const departWiseEmployeeList = [
  {
    id: 1,
    heading: 'Product',
    subList: [
      {
        id: 1,
        heading: 'Jennie Nolan',
        label: 'jennie.nolan@example.com',
        image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww',
      },
      {
        id: 2,
        heading: 'Will Smith',
        label: 'will.smith@example.com',
        image:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 3,
        heading: 'Emma Watson',
        label: 'emma.watson@example.com',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    id: 2,
    heading: 'Marketing',
    subList: [
      {
        id: 7,
        heading: 'Nova Peris',
        label: 'nova.peris@example.com',
        image:
          'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },

      {
        id: 4,
        heading: 'James Doe',
        label: 'james.doe@example.com',
        image:
          'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 6,
        heading: 'Tom Hardy',
        label: 'tom.hardy@example.com',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
];
const { width } = Dimensions.get('window');

const ItemSeparator = () => <View style={{ height: 16 }} />;

const HomeScreen = () => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);

  const actionSheetRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    employeeList,
    handleAddEmployee,
    addingEmployee,
    loadingEmployeeList,
    handleEditEmployee,
    employeeToEdit,
    setEmployeeToEdit,
    getEmployeeList,
  } = useHomeScreen({ actionSheetRef });

  // Flatten employee data for search
  const flatEmployeeList = useMemo(() => {
    const employees = [];
    employeeList.forEach(department => {
      if (department.subList) {
        department.subList.forEach(employee => {
          employees.push({
            ...employee,
            department: department.heading,
          });
        });
      }
    });
    return employees;
  }, [employeeList]);

  // Filter employees based on search query
  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) return flatEmployeeList;

    const query = searchQuery.toLowerCase();
    return flatEmployeeList.filter(
      employee =>
        employee.heading?.toLowerCase().includes(query) ||
        employee.label?.toLowerCase().includes(query) ||
        employee.department?.toLowerCase().includes(query),
    );
  }, [flatEmployeeList, searchQuery]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getEmployeeList();
    setRefreshing(false);
  };

  const renderEmployee = ({ item, index }) => (
    <View style={styles.employeeItemContainer}>
      <View style={styles.employeeCard}>
        <SingleEmployeeItem item={item} onEdit={handleEditEmployee} />
        <View style={styles.departmentTag}>
          <Text style={styles.departmentText}>{item.department}</Text>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.gradientHeader}>
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Icon name="people" size={28} color={appColors.primary} />
            <Text style={styles.headerTitle}>Employees</Text>
            <View style={styles.employeeCount}>
              <Text style={styles.employeeCountText}>
                {flatEmployeeList.length}
              </Text>
            </View>
          </View>
        </View>

        {/* Enhanced Search Bar */}
        <View
          style={[
            styles.searchContainer,
            {
              borderColor: isSearchFocused
                ? appColors.primary
                : appColors.borderColor,
              borderWidth: isSearchFocused ? 2 : 1,
            },
          ]}
        >
          <Icon
            name="search"
            size={20}
            color={isSearchFocused ? appColors.primary : appColors.gray}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search employees, departments..."
            placeholderTextColor={appColors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Icon name="close-circle" size={20} color={appColors.gray} />
            </TouchableOpacity>
          )}
        </View>

        {/* Search Results Count */}
        {searchQuery.length > 0 && (
          <View style={styles.searchResults}>
            <Text style={styles.searchResultsText}>
              {filteredEmployees.length} result
              {filteredEmployees.length !== 1 ? 's' : ''} found
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="people-outline" size={80} color={appColors.gray} />
      <Text style={styles.emptyStateTitle}>
        {searchQuery ? 'No employees found' : 'No employees yet'}
      </Text>
      <Text style={styles.emptyStateSubtitle}>
        {searchQuery
          ? 'Try adjusting your search terms'
          : 'Add your first employee to get started'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredEmployees}
        keyExtractor={item => item.id.toString()}
        renderItem={renderEmployee}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!loadingEmployeeList ? renderEmptyState : null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.flatListContent,
          filteredEmployees.length === 0 && styles.emptyListContent,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[appColors.primary]}
            tintColor={appColors.primary}
          />
        }
        ItemSeparatorComponent={ItemSeparator}
      />

      {/* Enhanced Floating Action Button */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => actionSheetRef.current?.show()}
          activeOpacity={0.8}
        >
          <View style={styles.fabGradient}>
            <Icon name="add" size={28} color={appColors.white} />
          </View>
        </TouchableOpacity>
      </View>

      <AddEmployeeSheet
        title={employeeToEdit?.id ? 'Edit Employee' : 'Add Employee'}
        actionSheetRef={actionSheetRef}
        primaryButtonText={employeeToEdit?.id ? 'Update' : 'Add'}
        onPrimaryButtonPress={handleAddEmployee}
        secondaryButtonText="Cancel"
        addingEmployee={addingEmployee}
        itemToEdit={employeeToEdit}
        onClose={() => setEmployeeToEdit(null)}
      />
    </View>
  );
};

export default HomeScreen;

const useStyles = appColors => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appColors.white,
    },

    // Header Styles
    headerContainer: {
      paddingBottom: 16,
    },
    gradientHeader: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 16 : 50,
      paddingHorizontal: 20,
      marginHorizontal: -20,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: appColors.black,
      marginLeft: 12,
      flex: 1,
    },
    employeeCount: {
      backgroundColor: appColors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      minWidth: 36,
      alignItems: 'center',
    },
    employeeCountText: {
      color: appColors.white,
      fontSize: 14,
      fontWeight: '600',
    },
    menuButton: {
      padding: 8,
      borderRadius: 12,
      backgroundColor: appColors.accent,
    },

    // Search Styles
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: appColors.white,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: appColors.borderColor,
      elevation: 2,
      shadowColor: appColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    searchIcon: {
      marginRight: 12,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: appColors.black,
      paddingVertical: 0,
    },
    clearButton: {
      padding: 4,
      marginLeft: 8,
    },
    searchResults: {
      paddingHorizontal: 4,
      marginBottom: 4,
    },
    searchResultsText: {
      fontSize: 14,
      color: appColors.gray,
      fontStyle: 'italic',
    },

    // List Styles
    flatListContent: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingBottom: 110,
    },
    emptyListContent: {
      flex: 1,
    },
    separator: {
      height: 16,
    },

    // Employee Card Styles
    employeeItemContainer: {
      marginBottom: 0,
    },
    employeeCard: {
      backgroundColor: appColors.white,
      borderRadius: 16,
      padding: 16,
      elevation: 3,
      shadowColor: appColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      borderWidth: 1,
      borderColor: appColors.borderColor + '40',
      position: 'relative',
    },
    departmentTag: {
      position: 'absolute',
      top: 12,
      right: 12,
      backgroundColor: appColors.primary + '20',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    departmentText: {
      fontSize: 12,
      fontWeight: '500',
      color: appColors.primary,
    },

    // Empty State
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 60,
    },
    emptyStateTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: appColors.black,
      marginTop: 24,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptyStateSubtitle: {
      fontSize: 16,
      color: appColors.gray,
      textAlign: 'center',
      lineHeight: 22,
      maxWidth: width * 0.8,
    },

    // FAB Styles
    fabContainer: {
      position: 'absolute',
      bottom: 32,
      right: 20,
    },
    fab: {
      width: 60,
      height: 60,
      borderRadius: 30,
      elevation: 2,
      shadowColor: appColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    fabGradient: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: appColors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

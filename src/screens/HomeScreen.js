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
  Image,
} from 'react-native';
import React, { useRef, useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppColors } from '../assets/appColors';
import { useHomeScreen } from '../hooks/useHomeScreen';
import AddEmployeeSheet from '../components/AddEmployeeSheet';
import { SingleEmployeeItem } from '../components/EmployeeList';

// Shimmer Component
const ShimmerItem = ({ appColors }) => {
  const styles = useShimmerStyles(appColors);
  return (
    <View style={styles.shimmerContainer}>
      <View style={styles.shimmerCard}>
        <View style={styles.shimmerAvatar} />
        <View style={styles.shimmerContent}>
          <View style={styles.shimmerName} />
          <View style={styles.shimmerEmail} />
        </View>
        <View style={styles.shimmerDepartment} />
      </View>
    </View>
  );
};

const ShimmerList = ({ appColors, count = 6 }) => {
  const styles = useShimmerStyles(appColors);
  return (
    <View style={styles.shimmerList}>
      {Array.from({ length: count }).map((_, index) => (
        <ShimmerItem key={index} appColors={appColors} />
      ))}
    </View>
  );
};
import Logo from '../assets/Logo.png';
const { width } = Dimensions.get('window');

const ItemSeparator = () => <View style={{ height: 16 }} />;

const HomeScreen = () => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);

  const actionSheetRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  const handleFilterPress = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = filter => {
    setSelectedFilter(filter);
    setShowFilters(false);
  };

  const getFilteredEmployees = () => {
    if (selectedFilter === 'all') return filteredEmployees;
    return filteredEmployees.filter(emp => emp.department === selectedFilter);
  };

  const renderEmployee = ({ item, index }) => (
    <View style={styles.employeeItemContainer}>
      <View style={styles.employeeCard}>
        <View style={styles.employeeCardContent}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Icon name="person" size={24} color={appColors.gray} />
            </View>
          </View>

          {/* Employee Info */}
          <View style={styles.employeeInfo}>
            <Text style={styles.employeeName} numberOfLines={1}>
              {item.heading}
            </Text>
            <Text style={styles.employeeEmail} numberOfLines={1}>
              {item.label}
            </Text>
            <View style={styles.employeeMeta}>
              <Icon name="calendar-outline" size={14} color={appColors.gray} />
              <Text style={styles.employeeMetaText}>
                {item.start_date || 'Start Date'}
              </Text>
            </View>
          </View>

          {/* Actions Section */}
          <View style={styles.actionsSection}>
            <View style={styles.roleTag}>
              <Text style={styles.roleText}>{item.department}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditEmployee(item)}
            >
              <Icon name="create-outline" size={18} color={appColors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Main Header */}
      <View style={styles.mainHeader}>
        <View style={styles.headerTop}>
          <View style={styles.titleSection}>
            <View style={styles.titleRow}>
              <Image source={Logo} style={styles.logo} resizeMode="contain" />
              <Text style={styles.headerTitle}>Employees</Text>
              <View style={styles.headerActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleFilterPress()}
                >
                  <Icon name="filter" size={20} color={appColors.black} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.headerSubtitle}>Manage your team members</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{flatEmployeeList.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {
                flatEmployeeList.filter(emp => emp.department === 'Manager')
                  .length
              }
            </Text>
            <Text style={styles.statLabel}>Managers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {
                flatEmployeeList.filter(emp => emp.department === 'Employee')
                  .length
              }
            </Text>
            <Text style={styles.statLabel}>Employees</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <View
            style={[
              styles.searchContainer,
              {
                borderColor: isSearchFocused
                  ? appColors.primary
                  : appColors.borderLight + '40',
                backgroundColor: isSearchFocused
                  ? appColors.cardBackground
                  : appColors.searchBackground,
              },
            ]}
          >
            <Icon
              name="search"
              size={20}
              color={
                isSearchFocused ? appColors.primary : appColors.textSecondary
              }
              style={styles.searchIcon}
            />
            <TextInput
              style={[styles.searchInput, { color: appColors.textPrimary }]}
              placeholder="Search by name, email, or role..."
              placeholderTextColor={appColors.textTertiary}
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
                <Icon
                  name="close-circle"
                  size={20}
                  color={appColors.textSecondary}
                />
              </TouchableOpacity>
            )}
          </View>
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

        {/* Filter Dropdown */}
        {showFilters && (
          <View style={styles.filterDropdown}>
            <TouchableOpacity
              style={[
                styles.filterOption,
                selectedFilter === 'all' && styles.filterOptionActive,
              ]}
              onPress={() => handleFilterChange('all')}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  selectedFilter === 'all' && styles.filterOptionTextActive,
                ]}
              >
                All Employees
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                selectedFilter === 'Manager' && styles.filterOptionActive,
              ]}
              onPress={() => handleFilterChange('Manager')}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  selectedFilter === 'Manager' && styles.filterOptionTextActive,
                ]}
              >
                Managers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                selectedFilter === 'Employee' && styles.filterOptionActive,
              ]}
              onPress={() => handleFilterChange('Employee')}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  selectedFilter === 'Employee' &&
                    styles.filterOptionTextActive,
                ]}
              >
                Employees
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOption,
                selectedFilter === 'Clerk' && styles.filterOptionActive,
              ]}
              onPress={() => handleFilterChange('Clerk')}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  selectedFilter === 'Clerk' && styles.filterOptionTextActive,
                ]}
              >
                Clerks
              </Text>
            </TouchableOpacity>
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

  // Show shimmer while loading
  if (loadingEmployeeList) {
    return (
      <View style={styles.flatListContent}>
        {renderHeader()}
        <ShimmerList appColors={appColors} count={8} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={getFilteredEmployees()}
        keyExtractor={item => item.id.toString()}
        renderItem={renderEmployee}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.flatListContent,
          getFilteredEmployees().length === 0 && styles.emptyListContent,
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
      backgroundColor: appColors.background,
    },

    // Header Styles
    headerContainer: {
      paddingBottom: 20,
    },
    logoSection: {
      alignItems: 'center',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 8 : 42,
      paddingBottom: 16,
      backgroundColor: appColors.cardBackground,
    },
    logo: {
      width: 40,
      height: 40,
    },
    logoDivider: {
      height: 1,
      backgroundColor: appColors.borderColor + '20',
      marginHorizontal: 20,
      marginBottom: 16,
    },
    mainHeader: {
      backgroundColor: appColors.cardBackground,
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingBottom: 24,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      ...(appColors.background === '#1A1A1A'
        ? {
            // Dark mode: use subtle borders and glows
            borderWidth: 1,
            borderColor: '#ffffff25',
            elevation: 0,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
          }
        : {
            // Light mode: use shadows
            elevation: 4,
            shadowColor: appColors.shadowColor,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
            borderWidth: 1,
            borderColor: appColors.borderLight + '30',
          }),
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 20,
    },
    titleSection: {
      flex: 1,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
      gap: 12,
    },
    titleTextContainer: {
      marginLeft: 12,
      flex: 1,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: '800',
      color: appColors.textPrimary,
      marginBottom: 4,
      flex: 1,
    },
    headerSubtitle: {
      fontSize: 16,
      color: appColors.textSecondary,
      marginTop: 5,
    },
    headerActions: {
      flexDirection: 'row',
      gap: 8,
    },
    actionButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: appColors.actionButtonBg,
      justifyContent: 'center',
      alignItems: 'center',
      ...(appColors.background === '#1A1A1A'
        ? {
            // Dark mode: use subtle borders
            borderWidth: 1,
            borderColor: '#ffffff25',
            elevation: 0,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
          }
        : {
            // Light mode: use shadows
            elevation: 2,
            shadowColor: appColors.shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            borderWidth: 1,
            borderColor: appColors.borderLight + '20',
          }),
    },

    // Stats Row
    statsRow: {
      flexDirection: 'row',
      backgroundColor: appColors.cardBackground,
      borderRadius: 16,
      padding: 16,
      marginBottom: 20,
      ...(appColors.background === '#1A1A1A'
        ? {
            // Dark mode: use subtle borders
            borderWidth: 1,
            borderColor: '#ffffff25',
            elevation: 0,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
          }
        : {
            // Light mode: use shadows
            elevation: 3,
            shadowColor: appColors.shadowColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            borderWidth: 1,
            borderColor: appColors.borderLight + '25',
          }),
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 24,
      fontWeight: '700',
      color: appColors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      fontWeight: '500',
      color: appColors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    statDivider: {
      width: 1,
      backgroundColor: '#ffffff25',
      marginHorizontal: 8,
    },

    // Search Styles
    searchWrapper: {
      marginBottom: 8,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderWidth: 2,
      ...(appColors.background === '#1A1A1A'
        ? {
            // Dark mode: no shadows
            elevation: 0,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
          }
        : {
            // Light mode: use shadows
            elevation: 2,
            shadowColor: appColors.shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 4,
          }),
    },
    searchIcon: {
      marginRight: 12,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: appColors.textPrimary,
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
      color: appColors.textSecondary,
      fontStyle: 'italic',
    },

    // Filter Styles
    filterDropdown: {
      backgroundColor: appColors.cardBackground,
      borderRadius: 16,
      padding: 16,
      marginTop: 12,
      ...(appColors.background === '#1A1A1A'
        ? {
            // Dark mode: use subtle borders
            borderWidth: 1,
            borderColor: '#ffffff25',
            elevation: 0,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
          }
        : {
            // Light mode: use shadows
            elevation: 4,
            shadowColor: appColors.shadowColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 8,
            borderWidth: 1,
            borderColor: appColors.borderLight + '25',
          }),
    },
    filterOption: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginBottom: 8,
      backgroundColor: appColors.searchBackground,
      borderWidth: 1,
      borderColor: appColors.borderLight + '20',
    },
    filterOptionActive: {
      backgroundColor: appColors.primary + '15',
      borderWidth: 1,
      borderColor: appColors.primary + '40',
    },
    filterOptionText: {
      fontSize: 16,
      fontWeight: '500',
      color: appColors.textPrimary,
      textAlign: 'center',
    },
    filterOptionTextActive: {
      color: appColors.primary,
      fontWeight: '600',
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
      backgroundColor: appColors.cardBackground,
      borderRadius: 20,
      padding: 20,
      ...(appColors.background === '#1A1A1A'
        ? {
            // Dark mode: use subtle borders
            borderWidth: 1,
            borderColor: '#ffffff25',
            elevation: 0,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
          }
        : {
            // Light mode: use shadows
            elevation: 3,
            shadowColor: appColors.shadowColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            borderWidth: 1,
            borderColor: appColors.borderLight + '25',
          }),
    },
    employeeCardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarSection: {
      position: 'relative',
      marginRight: 16,
    },
    avatarContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: appColors.searchBackground,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: appColors.primary + '30',
      ...(appColors.background === '#1A1A1A'
        ? {
            // Dark mode: no shadows
            elevation: 0,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
          }
        : {
            // Light mode: use shadows
            elevation: 1,
            shadowColor: appColors.shadowColor,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
          }),
    },
    employeeInfo: {
      flex: 1,
      marginRight: 16,
    },
    employeeName: {
      fontSize: 18,
      fontWeight: '600',
      color: appColors.textPrimary,
      marginBottom: 4,
    },
    employeeEmail: {
      fontSize: 14,
      color: appColors.textSecondary,
      marginBottom: 8,
    },
    employeeMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    employeeMetaText: {
      fontSize: 12,
      color: appColors.textTertiary,
      fontWeight: '500',
    },
    actionsSection: {
      alignItems: 'flex-end',
      gap: 8,
    },
    roleTag: {
      backgroundColor: appColors.primary + '15',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: appColors.primary + '35',
      ...(appColors.background === '#1A1A1A'
        ? {
            // Dark mode: no shadows
            elevation: 0,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
          }
        : {
            backgroundColor: 'transparent',
            borderColor: appColors.primary,
          }),
    },
    roleText: {
      fontSize: 12,
      fontWeight: '600',
      color: appColors.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    editButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: appColors.actionButtonBg,
      justifyContent: 'center',
      alignItems: 'center',
      ...(appColors.background === '#1A1A1A'
        ? {
            // Dark mode: use subtle borders
            borderWidth: 1,
            borderColor: '#ffffff25',
            elevation: 0,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
          }
        : {
            // Light mode: use shadows
            elevation: 1,
            shadowColor: appColors.shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            borderWidth: 1,
            borderColor: appColors.borderLight + '20',
            backgroundColor: 'white',
          }),
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
      color: appColors.textPrimary,
      marginTop: 24,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptyStateSubtitle: {
      fontSize: 16,
      color: appColors.textSecondary,
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
      ...(appColors.background === '#1A1A1A'
        ? {
            // Dark mode: use subtle glow effect
            elevation: 0,
            shadowColor: appColors.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
          }
        : {
            // Light mode: use shadows
            elevation: 12,
            shadowColor: appColors.shadowColor,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
          }),
    },
    fabGradient: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: appColors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: appColors.primary + '40',
    },
  });
};

const useShimmerStyles = appColors => {
  return StyleSheet.create({
    shimmerContainer: {
      marginBottom: 16,
    },
    shimmerCard: {
      backgroundColor: appColors.cardBackground,
      borderRadius: 16,
      padding: 16,
      ...(appColors.background === '#1A1A1A'
        ? {
            // Dark mode: use subtle borders
            borderWidth: 1,
            borderColor: '#ffffff25',
            elevation: 0,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
          }
        : {
            // Light mode: use shadows
            elevation: 3,
            shadowColor: appColors.shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            borderWidth: 1,
            borderColor: appColors.borderLight + '30',
          }),
      flexDirection: 'row',
      alignItems: 'center',
    },
    shimmerAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: appColors.borderLight + '25',
      marginRight: 12,
    },
    shimmerContent: {
      flex: 1,
    },
    shimmerName: {
      width: '80%',
      height: 20,
      backgroundColor: appColors.borderLight + '25',
      borderRadius: 8,
      marginBottom: 4,
    },
    shimmerEmail: {
      width: '60%',
      height: 16,
      backgroundColor: appColors.borderLight + '25',
      borderRadius: 8,
    },
    shimmerDepartment: {
      width: 80,
      height: 20,
      backgroundColor: appColors.borderLight + '25',
      borderRadius: 8,
      marginLeft: 'auto',
    },
    shimmerList: {
      marginTop: 16,
    },
  });
};

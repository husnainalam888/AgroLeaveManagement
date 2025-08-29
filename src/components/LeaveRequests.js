import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { SvgFromXml } from 'react-native-svg';
import React, { useRef, useState } from 'react';
import { leaves } from '../mockData'; // your mock data
import svgs from '../assets/svgs';
import { useAppColors } from '../assets/appColors';
import ActionButton from './ActionButton';
import { useLeaveRequests } from '../hooks/useLeaveRequests';
import { ImageWithPlaceholder } from './AddEmployeeSheet';
import RejectReasonSheet from './RejectReasonSheet.js';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { STORAGE } from '../storage/STORAGE';
import { useMMKVStorage } from 'react-native-mmkv-storage';

const { chatIconXml, phoneIconXml, fileIconXml, downLoadIcon } = svgs;

const IconButton = ({ xml, style, onPress }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <SvgFromXml xml={xml} width={20} height={20} />
  </TouchableOpacity>
);

export const LeaveItem = ({ item, style, onApprovePress, onRejectPress }) => {
  const [selectedRole] = useMMKVStorage('selectedRole', STORAGE, 'Employee');
  const { document_url: attachment, reason, type } = item;
  const id = item?.id;
  const status = item?.status;
  const note = item?.note;
  const start_date = item?.start_date;
  const end_date = item?.end_date;
  const isRejected = status === 'rejected';
  const isApproved = status === 'approved';
  const isPending = status === 'pending';
  const totalDays =
    new Date(end_date).getTime() - new Date(start_date).getTime();
  console.log('LeaveItem : totalDays', totalDays);
  const image = item?.employee?.image;
  const name = item?.employee?.name;
  const role = item?.employee?.job_role;

  console.log('LeaveItem : item', item);
  const appColors = useAppColors();
  const styles = useStyles(appColors);

  const onMessagePress = () => {
    console.log('LeaveItem : onMessagePress');
    Linking.openURL(`sms:${item.employee.phone}`);
  };

  const onPhonePress = () => {
    console.log('LeaveItem : onPhonePress');
    Linking.openURL(`tel:${item.employee.phone}`);
  };

  const onAttachmentPress = () => {
    console.log('LeaveItem : onAttachmentPress');
    Linking.openURL(attachment);
  };

  const getStatusColor = () => {
    if (isApproved) return appColors.statusActive;
    if (isRejected) return appColors.statusInactive;
    return appColors.primary;
  };

  const getStatusText = () => {
    if (isApproved) return 'Approved';
    if (isRejected) return 'Rejected';
    return 'Pending';
  };

  return (
    <View style={[styles.card, style]} key={id}>
      {/* Employee Header Section */}
      {item?.employee && (
        <View style={styles.employeeHeader}>
          <View style={styles.employeeInfo}>
            <ImageWithPlaceholder
              image={image}
              style={styles.avatar}
              size={48}
            />
            <View style={styles.employeeDetails}>
              <Text style={styles.employeeName}>{name}</Text>
              <Text style={styles.employeeRole}>{role}</Text>
            </View>
          </View>

          {/* Status Badge */}
          <View
            style={{
              alignItems: 'center',
              gap: 12,
              justifyContent: 'space-between',
            }}
          >
            {/* <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor() + '15' },
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor() },
                ]}
              />
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {getStatusText()}
              </Text>
            </View> */}
            {/* Communication Actions */}
            <View style={styles.communicationActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={onMessagePress}
              >
                <Icon
                  name="chatbubble-outline"
                  size={20}
                  color={appColors.gray}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={onPhonePress}
              >
                <Icon name="call-outline" size={20} color={appColors.gray} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Leave Details */}
      <View style={styles.leaveDetails}>
        {!!type && (
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon
                name="calendar-outline"
                size={16}
                color={appColors.primary}
              />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Leave Type</Text>
              <Text style={styles.detailValue}>
                {type == 'sick' ? 'Sick Leave' : 'Free Day Leave'}
              </Text>
            </View>
          </View>
        )}

        {!!start_date && !!end_date && (
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon name="time-outline" size={16} color={appColors.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>
                {start_date} - {end_date}
              </Text>
              <Text style={styles.durationText}>
                Total {Math.ceil(totalDays / (1000 * 60 * 60 * 24))} days
              </Text>
            </View>
          </View>
        )}

        {!!note && (
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon
                name="document-text-outline"
                size={16}
                color={appColors.primary}
              />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Notes</Text>
              <Text style={styles.detailValue}>{note}</Text>
            </View>
          </View>
        )}

        {!!attachment && (
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon name="attach-outline" size={16} color={appColors.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Attachment</Text>
              <TouchableOpacity
                style={styles.attachmentButton}
                onPress={onAttachmentPress}
              >
                <MaterialIcons
                  name="description"
                  size={16}
                  color={appColors.primary}
                />
                <Text style={styles.attachmentText} numberOfLines={1}>
                  {attachment}
                </Text>
                <Icon
                  name="download-outline"
                  size={16}
                  color={appColors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!!reason && (
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon
                name="alert-circle-outline"
                size={16}
                color={appColors.statusInactive}
              />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Rejection Reason</Text>
              <Text
                style={[
                  styles.detailValue,
                  { color: appColors.statusInactive },
                ]}
              >
                {reason}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      {isPending && selectedRole === 'Employer' ? (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.rejectBtn]}
            onPress={() => onRejectPress(id)}
          >
            <Icon name="close" size={18} color={appColors.statusInactive} />
            <Text
              style={[
                styles.actionBtnText,
                { color: appColors.statusInactive },
              ]}
            >
              Reject
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.approveBtn]}
            onPress={() => onApprovePress({ id, status: 'approved' })}
          >
            <Icon name="checkmark" size={18} color={appColors.white} />
            <Text style={[styles.actionBtnText, { color: appColors.white }]}>
              Approve
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.statusDisplay}>
          <View
            style={[
              styles.statusChip,
              { backgroundColor: getStatusColor() + '15' },
            ]}
          >
            <Text style={[styles.statusChipText, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default function LeaveList({ data = leaves, route }) {
  const { status } = route.params;
  console.log('LeaveList : status', status);
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectId, setRejectId] = useState(null);
  const rejectReasonSheet = useRef(null);
  const { leaveRequests, isLoading, handleStatusChange } = useLeaveRequests();
  const leaves = leaveRequests.filter(
    leave => leave.status.toLowerCase() === status.toLowerCase(),
  );

  const handleRejectPress = id => {
    setRejectId(id);
    rejectReasonSheet.current?.show();
  };

  return (
    <>
      <FlatList
        data={leaves}
        keyExtractor={({ id }) => id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <LeaveItem
            onApprovePress={handleStatusChange}
            item={item}
            styles={styles}
            onRejectPress={handleRejectPress}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color={appColors.primary} />
            ) : (
              <View style={styles.emptyContent}>
                <Icon
                  name="document-outline"
                  size={80}
                  color={appColors.gray}
                />
                <Text style={styles.emptyTitle}>No leave requests found</Text>
                <Text style={styles.emptySubtitle}>
                  {status === 'Pending'
                    ? 'No pending requests at the moment'
                    : `No ${status.toLowerCase()} requests found`}
                </Text>
              </View>
            )}
          </View>
        }
      />
      <RejectReasonSheet
        actionSheetRef={rejectReasonSheet}
        onRejectPress={({ reason, onSuccess }) =>
          handleStatusChange({
            id: rejectId,
            status: 'rejected',
            reason,
            onSuccess,
          })
        }
      />
    </>
  );
}

const useStyles = appColors => {
  return StyleSheet.create({
    listContainer: {
      paddingHorizontal: 0,
      flexGrow: 1,
      backgroundColor: appColors.background,
      paddingBottom: 16,
    },
    separator: {
      height: 16,
    },

    // Card Styles
    card: {
      backgroundColor: appColors.cardBackground,
      borderRadius: 20,
      padding: 20,
      borderWidth: 1,
      borderColor: '#ffffff20',
      ...(appColors.white != '#000' && {
        elevation: 1,
        shadowColor: appColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      }),
    },

    // Employee Header
    employeeHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    employeeInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 16,
    },
    employeeDetails: {
      flex: 1,
    },
    employeeName: {
      fontSize: 18,
      fontWeight: '700',
      color: appColors.black,
      marginBottom: 4,
    },
    employeeRole: {
      fontSize: 14,
      color: appColors.gray,
      marginBottom: 6,
    },
    employeeId: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    employeeIdText: {
      fontSize: 12,
      color: appColors.gray,
      fontWeight: '500',
    },

    // Status Badge
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      gap: 6,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },

    // Communication Actions
    communicationActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 12,
    },
    actionButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: appColors.searchBackground,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
      shadowColor: appColors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },

    // Leave Details
    leaveDetails: {
      marginBottom: 4,
      marginTop: 1,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    detailIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: appColors.primary + '10',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      marginTop: 2,
    },
    detailContent: {
      flex: 1,
    },
    detailLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: appColors.gray,
      marginBottom: 4,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    detailValue: {
      fontSize: 14,
      fontWeight: '500',
      color: appColors.black,
      lineHeight: 20,
    },
    durationText: {
      fontSize: 12,
      color: appColors.gray,
      marginTop: 2,
      fontStyle: 'italic',
    },

    // Attachment Button
    attachmentButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: appColors.searchBackground,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
      gap: 8,
      marginTop: 6,
    },
    attachmentText: {
      flex: 1,
      fontSize: 12,
      color: appColors.black,
      fontWeight: '500',
    },

    // Action Buttons
    actionButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    actionBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 16,
      gap: 8,
    },
    rejectBtn: {
      backgroundColor: appColors.searchBackground,
      borderWidth: 1,
      borderColor: appColors.statusInactive + '30',
    },
    approveBtn: {
      backgroundColor: appColors.statusActive,
    },
    actionBtnText: {
      fontSize: 14,
      fontWeight: '600',
    },

    // Status Display
    statusDisplay: {
      alignItems: 'center',
    },
    statusChip: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
    },
    statusChipText: {
      fontSize: 14,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },

    // Empty State
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyContent: {
      alignItems: 'center',
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: appColors.black,
      marginTop: 16,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 14,
      color: appColors.gray,
      textAlign: 'center',
      lineHeight: 20,
    },
  });
};

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
  return (
    <View style={[styles.card, style]} key={id}>
      {item?.employee && (
        <View style={styles.header}>
          <ImageWithPlaceholder image={image} style={styles.avatar} size={30} />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{role}</Text>
          </View>
          <View style={styles.actions}>
            <IconButton xml={chatIconXml} onPress={onMessagePress} />
            <IconButton
              xml={phoneIconXml}
              style={styles.iconSpacing}
              onPress={onPhonePress}
            />
          </View>
        </View>
      )}
      {!!type && (
        <View style={styles.typeContainer}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.notes}>
            {type == 'sick' ? 'Sick' : 'Free Day'} Leave Request
          </Text>
        </View>
      )}
      {!!start_date && !!end_date && (
        <View style={styles.dateContainer}>
          <Text style={styles.notes}>
            From <Text style={styles.date}>{start_date}</Text> To{' '}
            <Text style={styles.date}>{end_date}</Text>
            {'\n'}
            (Total {Math.ceil(totalDays / (1000 * 60 * 60 * 24))} days)
          </Text>
        </View>
      )}
      {!!note && (
        <>
          <Text style={styles.label}>Notes:</Text>
          <Text style={styles.notes}>{note}</Text>
        </>
      )}

      {!!attachment && (
        <>
          <Text style={styles.label}>Attachment:</Text>
          <TouchableOpacity
            onPress={onAttachmentPress}
            style={styles.attachmentBox}
          >
            <SvgFromXml xml={fileIconXml} width={20} height={20} />
            <Text numberOfLines={1} style={styles.attachmentText}>
              {attachment}
            </Text>
            <SvgFromXml xml={downLoadIcon} width={20} height={20} />
          </TouchableOpacity>
        </>
      )}

      {!!reason && (
        <View style={styles.reasonContainer}>
          <Text style={styles.label}>Rejected Reason:</Text>
          <Text style={styles.notes}>{reason}</Text>
        </View>
      )}
      {isPending && selectedRole === 'Employer' ? (
        <View style={styles.buttonsContainer}>
          <ActionButton
            style={styles.button}
            label={'Reject'}
            secondary
            small
            onPress={() => onRejectPress(id)}
          />
          <ActionButton
            style={styles.button}
            label={'Approve'}
            small
            onPress={() => onApprovePress({ id, status: 'approved' })}
          />
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <ActionButton
            style={styles.button}
            label={
              isRejected ? 'Rejected' : isApproved ? 'Approved' : 'Pending'
            }
            secondary
            small
            onPress={() => onRejectPress(id)}
            disabled
            primaryOutline={isApproved}
          />
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
          <View style={styles.flex}>
            {isLoading ? (
              <ActivityIndicator size="large" color={appColors.primary} />
            ) : (
              <Text style={styles.emptyText}>No leaves requests found</Text>
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
      paddingHorizontal: 16,
      flexGrow: 1,
    },
    separator: {
      height: 1,
      backgroundColor: appColors.secondary,
      marginVertical: 12,
    },
    card: {
      backgroundColor: appColors.white,
      paddingTop: 10,
      borderRadius: 12,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 12,
      marginTop: 12,
    },
    userInfo: {
      flex: 1,
    },
    name: {
      fontSize: 14,
      fontWeight: '600',
      color: appColors.black,
    },
    role: {
      fontSize: 12,
      color: appColors.gray,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    button: {
      flex: 1,
    },
    iconSpacing: {
      marginLeft: 10,
    },
    label: {
      marginTop: 10,
      marginBottom: 2,
      fontWeight: '500',
      color: appColors.black,
    },
    notes: {
      fontSize: 12,
      lineHeight: 20,
      color: appColors.black,
    },
    attachmentBox: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      gap: 5,
      borderRadius: 8,
      marginTop: 6,
    },
    attachmentText: {
      flex: 1,
      marginLeft: 8,
      fontSize: 12,
      color: appColors.black,
    },
    flex: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: appColors.black,
    },
    reasonContainer: {
      marginBottom: 10,
      marginTop: 2,
      fontWeight: '500',
      color: appColors.black,
    },
    typeContainer: {
      marginBottom: 10,
      marginTop: 2,
      fontWeight: '500',
      color: appColors.black,
    },
    date: {
      fontWeight: '500',
    },
    dateContainer: {
      marginTop: 0,
      fontWeight: '500',
      color: appColors.black,
    },
  });
};

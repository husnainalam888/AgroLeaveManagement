import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SvgFromXml } from 'react-native-svg';
import React from 'react';
import { leaves } from '../mockData'; // your mock data
import svgs from '../assets/svgs';
import { useAppColors } from '../assets/appColors';
import ActionButton from './ActionButton';

const { chatIconXml, phoneIconXml, fileIconXml, downLoadIcon } = svgs;

const IconButton = ({ xml, style, onPress }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <SvgFromXml xml={xml} width={20} height={20} />
  </TouchableOpacity>
);

export const LeaveItem = ({
  item: { id, avatar, name, role, notes, attachment },
  style,
}) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <View style={[styles.card, style]} key={id}>
      <View style={styles.header}>
        <Image source={avatar} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>
        <View style={styles.actions}>
          <IconButton xml={chatIconXml} />
          <IconButton xml={phoneIconXml} style={styles.iconSpacing} />
        </View>
      </View>

      {!!notes && (
        <>
          <Text style={styles.label}>Notes:</Text>
          <Text style={styles.notes}>{notes}</Text>
        </>
      )}

      {!!attachment && (
        <>
          <Text style={styles.label}>Attachment:</Text>
          <View style={styles.attachmentBox}>
            <SvgFromXml xml={fileIconXml} width={20} height={20} />
            <Text style={styles.attachmentText}>{attachment}</Text>
            <SvgFromXml xml={downLoadIcon} width={20} height={20} />
          </View>
        </>
      )}
      <View style={styles.buttonsContainer}>
        <ActionButton
          style={styles.button}
          label={'Reject'}
          secondary
          small
          onPress={() => {}}
        />
        <ActionButton
          style={styles.button}
          label={'Approve'}
          small
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default function LeaveList({ data = leaves }) {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <FlatList
      data={data}
      keyExtractor={({ id }) => id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <LeaveItem item={item} styles={styles} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const useStyles = appColors => {
  return StyleSheet.create({
    listContainer: {
      paddingHorizontal: 16,
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
  });
};

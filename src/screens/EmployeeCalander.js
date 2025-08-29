import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { Agenda } from 'react-native-calendars';
import useAppColors from '../assets/appColors';
import { LeaveItem } from '../components/LeaveRequests';
import RejectReasonSheet from '../components/RejectReasonSheet';
import { leaves } from '../mockData';
import {
  LeaveRequestsProvider,
  useLeaveRequests,
} from '../hooks/useLeaveRequests';

const EmployeeCalander = () => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const [initialDate, setInitialDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [rejectId, setRejectId] = useState(null);
  const rejectReasonSheet = useRef(null);
  const handleRejectPress = id => {
    setRejectId(id);
    rejectReasonSheet.current?.show();
  };
  const { leaveRequests, getLeaveRequests, isLoading, handleStatusChange } =
    useLeaveRequests();
  useEffect(() => {
    console.log('EmployeeCalander : useEffect : leaveRequests', leaveRequests);
    if (!leaveRequests || leaveRequests.length === 0) return;

    const maxDate = leaveRequests.reduce((currMax, leave) => {
      const start = new Date(leave.start_date);
      const end = new Date(leave.end_date);
      const candidate = start > end ? start : end;
      return candidate > currMax ? candidate : currMax;
    }, new Date(0));

    setInitialDate(maxDate.toISOString().slice(0, 10));
  }, [leaveRequests]);

  function mapLeavesByDate(leaves) {
    const dateMap = {};
    leaves.forEach(leave => {
      let start = new Date(leave.start_date);
      let end = new Date(leave.end_date);
      console.log('mapLeavesByDate : start', start.toDateString());
      console.log('mapLeavesByDate : end', end.toDateString());
      if (start > end) [start, end] = [end, start];
      for (
        let day = new Date(start);
        day <= end;
        day.setDate(day.getDate() + 1)
      ) {
        const iso = day.toISOString().slice(0, 10);
        if (!dateMap[iso]) dateMap[iso] = [];
        dateMap[iso].push(leave);
      }
    });
    console.log('mapLeavesByDate : dateMap', dateMap);
    return dateMap;
  }
  return (
    <View style={styles.container}>
      <Header label="Employee Calendar" backButton />
      <Agenda
        items={mapLeavesByDate(leaveRequests)}
        style={styles.calendar}
        selected={initialDate}
        showClosingKnob={true}
        extraData={leaveRequests}
        disableVirtualization={true}
        renderItem={item => {
          console.log(item);
          return (
            <LeaveItem
              onApprovePress={handleStatusChange}
              item={item}
              style={styles.item}
              onRejectPress={handleRejectPress}
            />
          );
        }}
        theme={{
          backgroundColor: appColors.white,
          calendarBackground: appColors.white,
          textSectionTitleColor: appColors.gray,
          textSectionTitleDisabledColor: appColors.lightGray,
          arrowColor: appColors.primary,
          monthTextColor: appColors.primary,
          indicatorColor: appColors.primary,

          dayTextColor: appColors.black,
          todayTextColor: appColors.primary,
          selectedDayBackgroundColor: appColors.primary,
          selectedDayTextColor: appColors.white,
          textDisabledColor: appColors.lightGray,
          dotColor: appColors.primary,
          selectedDotColor: appColors.white,

          agendaDayTextColor: appColors.white,
          agendaDayNumColor: appColors.white,
          agendaTodayColor: appColors.white,
          agendaKnobColor: appColors.secondary,
          // 'stylesheet.agenda.list': {
          //   container: {
          //     backgroundColor: appColors.white,
          //   },
          // },
        }}
        contentContainerStyle={{
          backgroundColor: appColors.white,
        }}
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
    </View>
  );
};
const EmployeeCalanderWithProvider = () => {
  return (
    <LeaveRequestsProvider>
      <EmployeeCalander />
    </LeaveRequestsProvider>
  );
};

export default EmployeeCalanderWithProvider;

const useStyles = appColors =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    calendar: {
      marginHorizontal: -16,
      marginTop: 8,
    },
    item: {
      padding: 16,
      marginEnd: 16,
      marginVertical: 8,
    },
  });

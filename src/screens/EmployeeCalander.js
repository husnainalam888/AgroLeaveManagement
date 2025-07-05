import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import { Agenda } from 'react-native-calendars';
import useAppColors from '../assets/appColors';
import { LeaveItem } from '../components/LeaveRequests';
import { leaves } from '../mockData';

const EmployeeCalander = () => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  return (
    <View style={styles.container}>
      <Header label="Employee Calendar" backButton />
      <Agenda
        items={{
          '2025-05-22': leaves,
          '2025-05-23': leaves,
          '2025-05-24': leaves,
          '2025-05-25': leaves,
          '2025-06-28': leaves,
        }}
        style={styles.calendar}
        showClosingKnob={true}
        renderItem={item => {
          console.log(item);
          return <LeaveItem item={item} style={styles.item} />;
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
    </View>
  );
};

export default EmployeeCalander;

const useStyles = appColors =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
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

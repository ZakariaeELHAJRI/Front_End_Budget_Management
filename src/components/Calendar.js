import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const DatePicker = () => {
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedRange, setSelectedRange] = useState({});
  const [selectedWeek, setSelectedWeek] = useState({});
  const [selectedMonth, setSelectedMonth] = useState({});

  const handleDayPress = (day) => {
    const { dateString } = day;
    const updatedDates = { ...selectedDates };

    if (selectedRange.startDate && selectedRange.endDate) {
      setSelectedRange({});
      setSelectedDates({ [dateString]: { selected: true } });
    } else if (selectedWeek.startingDate && selectedWeek.endingDate) {
      setSelectedWeek({});
      setSelectedDates({ [dateString]: { selected: true } });
    } else if (selectedMonth.year && selectedMonth.month) {
      setSelectedMonth({});
      setSelectedDates({ [dateString]: { selected: true } });
    } else {
      if (selectedDates[dateString]) {
        delete updatedDates[dateString];
      } else {
        updatedDates[dateString] = { selected: true };
      }

      setSelectedDates(updatedDates);
    }
  };

  const handleRangePress = (day) => {
    const { dateString } = day;
    const { startDate, endDate } = selectedRange;

    if (!startDate) {
      setSelectedRange({ startDate: dateString, endDate: '' });
    } else if (!endDate) {
      const newRange = { startDate, endDate: dateString };
      if (new Date(startDate) <= new Date(dateString)) {
        const updatedDates = {};

        for (let date = new Date(startDate); date <= new Date(dateString); date.setDate(date.getDate() + 1)) {
          const dateKey = date.toISOString().slice(0, 10);
          updatedDates[dateKey] = { selected: true };
        }

        setSelectedRange({});
        setSelectedDates(updatedDates);
      } else {
        setSelectedRange({ startDate: dateString, endDate: '' });
      }
    }
  };

  const handleWeekPress = (week) => {
    const { startingDate, endingDate } = week;
    const updatedDates = {};

    for (let date = new Date(startingDate); date <= new Date(endingDate); date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().slice(0, 10);
      updatedDates[dateString] = { selected: true };
    }

    setSelectedWeek({ startingDate, endingDate });
    setSelectedDates(updatedDates);
  };

  const handleMonthPress = (selectedMonth) => {
    const { year, month } = selectedMonth;
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const updatedDates = {};

    for (let date = firstDay; date <= lastDay; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().slice(0, 10);
      updatedDates[dateString] = { selected: true };
    }

    setSelectedMonth({ year, month });
    setSelectedDates(updatedDates);
  };

  return (
    <View>
      <Calendar
        markedDates={selectedDates}
        onDayLongPress={handleRangePress}
        onDayPress={(day) => {
          handleDayPress(day);
          handleRangePress(day);
          handleWeekPress(day);
          handleMonthPress(day);
        }}
      />
    </View>
  );
};

export default DatePicker;

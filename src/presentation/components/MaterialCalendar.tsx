import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {useTheme} from 'react-native-paper';
import {globalVariables} from '../../config/theme/global-theme';

interface Props {
  onTouchDay?: (day: string) => void;
  exaltedDays?: Date[];
}

export const MaterialCalendar = (props: Props) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const theme = useTheme();

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  return (
    <Calendar
      theme={{
        backgroundColor: theme.colors.elevation.level1,
        calendarBackground: theme.colors.elevation.level1,
        textSectionTitleColor: theme.colors.onBackground,
        selectedDayBackgroundColor: theme.colors.primary,
        selectedDayTextColor: theme.colors.onPrimary,
        todayTextColor: theme.colors.primary,
        dayTextColor: theme.colors.onBackground,
        textDisabledColor: theme.colors.onBackground,
        dotColor: theme.colors.primary,
        selectedDotColor: theme.colors.onPrimary,
        arrowColor: theme.colors.primary,
        monthTextColor: theme.colors.primary,
        indicatorColor: theme.colors.primary,
      }}
      style={{
        borderRadius: globalVariables.containerBorderRadius,
      }}
      onDayPress={(day: DateData) => {
        props.onTouchDay && props.onTouchDay(day.dateString);
      }}
      markedDates={(props.exaltedDays || []).reduce((acc, day) => {
        acc[day.toISOString().split('T')[0]] = {
          selected: true,
          selectedColor: theme.colors.primary,
        };
        return acc;
      }, {} as {[key: string]: any})}
    />
  );
};

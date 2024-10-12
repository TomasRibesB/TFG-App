import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from 'react-native-paper';
import { globalVariables } from '../../config/theme/global-theme';

export const MaterialCalendar = () => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const theme = useTheme();

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  return (
    <Calendar
      theme={{
        backgroundColor: theme.colors.background,
        calendarBackground: theme.colors.background,
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
    />
  );
};
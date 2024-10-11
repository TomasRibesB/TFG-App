import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { globalVariables } from '../../config/theme/global-theme';

export const MaterialCalendar = () => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  return (
    <Calendar
      theme={{
        backgroundColor: isDarkMode ? MD3DarkTheme.colors.background : MD3LightTheme.colors.background,
        calendarBackground: isDarkMode ? MD3DarkTheme.colors.background : MD3LightTheme.colors.background,
        textSectionTitleColor: isDarkMode ? MD3DarkTheme.colors.onBackground : MD3LightTheme.colors.onBackground,
        selectedDayBackgroundColor: isDarkMode ? MD3DarkTheme.colors.primary : MD3LightTheme.colors.primary,
        selectedDayTextColor: isDarkMode ? MD3DarkTheme.colors.onPrimary : MD3LightTheme.colors.onPrimary,
        todayTextColor: isDarkMode ? MD3DarkTheme.colors.primary : MD3LightTheme.colors.primary,
        dayTextColor: isDarkMode ? MD3DarkTheme.colors.onBackground : MD3LightTheme.colors.onBackground,
        textDisabledColor: isDarkMode ? MD3DarkTheme.colors.onBackground : MD3LightTheme.colors.onBackground,
        dotColor: isDarkMode ? MD3DarkTheme.colors.primary : MD3LightTheme.colors.primary,
        selectedDotColor: isDarkMode ? MD3DarkTheme.colors.onPrimary : MD3LightTheme.colors.onPrimary,
        arrowColor: isDarkMode ? MD3DarkTheme.colors.primary : MD3LightTheme.colors.primary,
        monthTextColor: isDarkMode ? MD3DarkTheme.colors.primary : MD3LightTheme.colors.primary,
        indicatorColor: isDarkMode ? MD3DarkTheme.colors.primary : MD3LightTheme.colors.primary,
      }}
      style={{
        borderRadius: globalVariables.containerBorderRadius,
      }}
    />
  );
};
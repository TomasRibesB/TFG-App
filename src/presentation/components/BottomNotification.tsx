import {Snackbar, useTheme} from 'react-native-paper';
import React, {Component} from 'react';

interface Props {
  visible: boolean;
  message: string;
  action: {
    label: string;
    onPress: () => void;
  };
  onDismiss: () => void;
  duration?: number;
  type?: 'error' | 'success' | 'info';
  icon?: string;
  onIconPress?: () => void;
}

export const BottomNotification = ({
  message,
  action,
  onDismiss,
  duration = 5000,
  type = 'info',
  visible = false,
  icon,
  onIconPress,
}: Props) => {
  const theme = useTheme();
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      action={action}
      icon={icon}
      onIconPress={onIconPress}
      duration={duration}>
      {message}
    </Snackbar>
  );
};

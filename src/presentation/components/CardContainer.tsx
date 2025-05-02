import {Text, Card, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {Component, useContext} from 'react';
import {globalTheme, globalVariables} from '../../config/theme/global-theme';
import {StyleProp, View, ViewStyle} from 'react-native';

interface Props {
  children: React.ReactNode;
  title?: string;
  icon?: string;
  contentStyle?: StyleProp<ViewStyle>;
  onAction?: () => void;
  actionLabel?: string;
  actionIcon?: string;
  isLoadingAction?: boolean;
}

export const CardContainer = ({
  children,
  title,
  icon,
  contentStyle,
  onAction,
  actionLabel,
  actionIcon,
  isLoadingAction,
}: Props) => {
  return (
    <Card
      style={[
        {width: '100%', marginBottom: globalVariables.margin},
        title ? {} : {paddingTop: globalVariables.padding},
      ]}
      elevation={1}>
      {title && (
        <Card.Title
          title={title}
          titleNumberOfLines={5}
          right={props => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {onAction && actionLabel && (
                <Button
                  onPress={onAction}
                  labelStyle={{fontSize: 12}}
                  mode="contained-tonal"
                  icon={actionIcon ? actionIcon : ''}
                  loading={isLoadingAction}
                  style={{marginRight: 16}}>
                  {actionLabel}
                </Button>
              )}
              {icon && <Icon name={icon} size={24} style={{marginRight: 16}} />}
            </View>
          )}
        />
      )}
      <Card.Content style={[contentStyle]}>{children}</Card.Content>
    </Card>
  );
};

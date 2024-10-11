import {Text, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {Component, useContext} from 'react';
import {globalTheme, globalVariables} from '../../config/theme/global-theme';
import {StyleProp, View, ViewStyle} from 'react-native';

interface Props {
  children: React.ReactNode;
  title?: string;
  icon?: string;
  contentStyle?: StyleProp<ViewStyle>;
}

export const CardContainer = ({children, title, icon, contentStyle}: Props) => {
  return (
    <Card
      style={[
        {width: '98%'},
        title ? {} : {paddingTop: globalVariables.padding},
      ]}
      elevation={1}
      >
      {title && (
        <Card.Title
          title={title}
          right={props => icon && <Icon name={icon} size={24}
          style={{marginRight: 16}}
          />}
        />
      )}
      <Card.Content
      style={[ contentStyle ]}
      >{children}</Card.Content>
    </Card>
  );
};

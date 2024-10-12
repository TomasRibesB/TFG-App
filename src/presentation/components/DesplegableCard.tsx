import React, { useState, useRef } from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalVariables } from '../../config/theme/global-theme';

interface Props {
  children: React.ReactNode;
  title?: string;
  icon?: string;
  contentStyle?: StyleProp<ViewStyle>;
}

export const DesplegableCard = ({
  children,
  title,
  icon,
  contentStyle,
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);

  const toggleExpand = () => {
    if (contentHeight === 0) return; // No hacer nada si la altura del contenido aún no se ha medido.

    const initialValue = expanded ? 1 : 0;
    const finalValue = expanded ? 0 : 1;

    setExpanded(!expanded);
    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(rotateAnimation, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <Card style={styles.card} elevation={1}>
      <TouchableOpacity onPress={toggleExpand}>
        <Card.Title
          title={title}
          right={props =>
            icon && (
              <View style={{ flexDirection: 'row' }}>
                <Icon name={icon} size={24} style={{ marginRight: 16 }} />
                <Animated.View style={{ transform: [{ rotate }] }}>
                  <Icon
                    name="chevron-forward"
                    size={24}
                    style={{ marginRight: 16 }}
                  />
                </Animated.View>
              </View>
            )
          }
        />
      </TouchableOpacity>

      {/* Vista oculta para medir la altura del contenido */}
      <View style={{ position: 'absolute', opacity: 0, zIndex: -1, width: '100%' }}>
        <View
          onLayout={event => {
            const height = event.nativeEvent.layout.height;
            if (height > 0 && height !== contentHeight) {
              setContentHeight(height);
            }
          }}>
          <Card.Content>{children}</Card.Content>
        </View>
      </View>

      {/* Contenido animado */}
      {contentHeight > 0 && (
        <Animated.View
          style={[{ height: animatedHeight, overflow: 'hidden' }, contentStyle]}>
          <Card.Content>{children}</Card.Content>
        </Animated.View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: globalVariables.margin,
  },
});

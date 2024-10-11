import {useNavigation} from '@react-navigation/native';
import {ScrollView, StyleProp, useColorScheme, View, ViewStyle} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';

interface Props {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
  stylesHeader?: StyleProp<ViewStyle>;
  stylesChild?: StyleProp<ViewStyle>;
}

export const MainLayout = ({
  title,
  subtitle,
  children = null,
  styles,
  stylesHeader,
  stylesChild,
}: Props) => {
  const {top} = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';

  const childrenView = (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: 14,
        },
        stylesChild,
      ]}>
      {children}
    </View>
  );

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: isDarkMode
            ? MD3DarkTheme.colors.background
            : MD3LightTheme.colors.background,
        },
        styles,
      ]}>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            paddingTop: title ? top + 16 : 0,
            paddingHorizontal: 14,
          },
          stylesHeader,
        ]}>
        <View style={{flex: 1}}>
          {title && <Text variant="displaySmall">{title}</Text>}
          {subtitle && <Text variant="titleSmall">{subtitle}</Text>}
        </View>
        {title && <Avatar.Icon icon="person-outline" size={48} />}
      </View>
      {title ? (
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
          {childrenView}
        </ScrollView>
      ) : (
        childrenView
      )}
    </View>
  );
};
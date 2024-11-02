import {useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  StyleProp,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import {Text} from 'react-native-paper';
import {Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'react-native-paper';
import { globalVariables } from '../../config/theme/global-theme';

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
  const theme = useTheme();

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
          backgroundColor: theme.colors.background,
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
        {title &&         <Image
          source={require('../../assets/logo.png')}
          style={{
            width: 48,
            height: 48,
          }}
        />}
      </View>
      {title ? (
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          {childrenView}
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          {childrenView}
        </ScrollView>
      )}
    </View>
  );
};

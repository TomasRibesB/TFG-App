import {useNavigation} from '@react-navigation/native';
import {useColorScheme, View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

interface Props {
  title?: string;
  subtitle?: string;

  children?: React.ReactNode;
}

export const MainLayout = ({title, subtitle, children = null}: Props) => {
  const {top} = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        flex: 1,
        paddingTop: title? top + 16 : 0,
        paddingHorizontal: 16,
        backgroundColor: isDarkMode ? MD3DarkTheme.colors.background : MD3LightTheme.colors.background,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}>
        <View style={{flex: 1}}>
          {title && <Text variant='displaySmall'>{title}</Text>}
          {subtitle && <Text variant='titleSmall'>{subtitle}</Text>}
        </View>
        {title && <Avatar.Icon icon="person-outline" size={48} />}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 16,
        }}>
        {children}
      </View>
    </View>
  );
};

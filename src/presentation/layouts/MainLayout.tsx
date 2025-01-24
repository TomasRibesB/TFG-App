import {useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  StyleProp,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import {Text, FAB, Menu, Divider} from 'react-native-paper';
import {Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'react-native-paper';
import {useState} from 'react';
import { StorageAdapter } from '../../config/adapters/storage-adapter';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigator';

interface Props {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
  stylesHeader?: StyleProp<ViewStyle>;
  stylesChild?: StyleProp<ViewStyle>;
  scrolleable?: boolean;
  back?: boolean;
}

export const MainLayout = ({
  title,
  subtitle,
  children = null,
  styles,
  stylesHeader,
  stylesChild,
  scrolleable = true,
  back = false,
}: Props) => {
  const {top} = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const handleLogout = () => {
    StorageAdapter.removeItem('token');
    navigation.navigate('AuthFlow');
  };
  const handleProfile = () => {
    closeMenu();
  };

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
        {title && (
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity
                style={{flex: 1, alignItems: 'flex-end'}}
                onPress={openMenu}>
                <Image
                  source={require('../../assets/logo.png')}
                  style={{
                    width: 48,
                    height: 48,
                  }}
                />
              </TouchableOpacity>
            }
            anchorPosition="bottom">
            <Menu.Item onPress={handleProfile} title="Perfil" />
            <Divider />
            <Menu.Item onPress={handleLogout} title="Cerrar sesión" />
          </Menu>
        )}
      </View>
      {scrolleable ? (
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={{flex: 1}}
          scrollEnabled={scrolleable}
          showsVerticalScrollIndicator={false}>
          {childrenView}
        </ScrollView>
      ) : (
        <View style={{flex: 1}}>{childrenView}</View>
      )}
      {back && (
        <FAB
          style={{
            position: 'absolute',
            left: 16,
            bottom: 16,
          }}
          icon="arrow-back-outline"
          onPress={() => navigation.goBack()}
          mode="flat"
          size="small"
        />
      )}
    </View>
  );
};

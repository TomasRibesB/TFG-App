import React, {useRef} from 'react';
import {ScrollView, StyleProp, View, ViewStyle, Image} from 'react-native';
import {Text, FAB, IconButton, Drawer, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {
  MainStackParams,
  RootStackParams,
} from '../navigation/StackNavigator';
import {useAuth} from '../hooks/useAuth';
import {DrawerLayout} from 'react-native-gesture-handler';

interface Props {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
  stylesHeader?: StyleProp<ViewStyle>;
  stylesChild?: StyleProp<ViewStyle>;
  scrolleable?: boolean;
  back?: boolean;
  blockProfile?: boolean;
  blockTickets?: boolean;
  menu?: boolean;
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
  blockProfile = false,
  blockTickets = false,
  menu = true,
}: Props) => {
  const {top} = useSafeAreaInsets();
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const navigation2 = useNavigation<StackNavigationProp<MainStackParams>>();
  const {logout} = useAuth();
  const drawerRef = useRef<DrawerLayout>(null);
  // Colores inactive / active
  const unselectedBg = theme.colors.onPrimary;
  const selectedBg = theme.colors.primaryContainer;

  const handleLogout = async () => {
    drawerRef.current?.closeDrawer();
    await logout();
  };

  const renderDrawer = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: top + 16,
        paddingBottom: 16,
      }}>
      {/* Sección de Perfil y Tickets */}

      <Drawer.Item
        label="Inicio"
        icon="home-outline"
        active={false}
        onPress={() => {
          console.log('blockProfile', blockProfile);
          console.log('blockTickets', blockTickets);
          if (blockProfile || blockTickets) {
            // Se cambia && por ||
            console.log('blockProfile || blockTickets');
            navigation2.navigate('BotTabNavigator');
            drawerRef.current?.closeDrawer();
          }
        }}
        style={{
          backgroundColor:
            !blockProfile && !blockTickets ? selectedBg : unselectedBg,
          borderColor:
            blockProfile || blockTickets ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
          borderWidth: blockProfile || blockTickets ? 1 : 0,
          marginBottom: 8,
        }}
      />

      <Drawer.Item
        label="Tickets"
        icon="ticket-outline"
        active={blockTickets}
        onPress={() => {
          if (!blockTickets) {
            navigation2.navigate('TicketListScreen');
            drawerRef.current?.closeDrawer();
          }
        }}
        style={{
          backgroundColor: blockTickets ? selectedBg : unselectedBg,
          borderColor: !blockTickets ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
          borderWidth: !blockTickets ? 1 : 0,
          marginBottom: 8,
        }}
      />

      <Drawer.Item
        label="Perfil"
        icon="person-outline"
        active={blockProfile}
        onPress={() => {
          if (!blockProfile) {
            navigation2.navigate('ProfileScreen');
            drawerRef.current?.closeDrawer();
          }
        }}
        style={{
          backgroundColor: blockProfile ? selectedBg : unselectedBg,
          borderColor: !blockProfile ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
          borderWidth: !blockProfile ? 1 : 0,
          marginBottom: 8,
        }}
      />

      {/* Espaciador */}
      <View style={{flex: 1}} />

      {/* Cerrar sesión abajo */}
      <Drawer.Item
        label="Cerrar sesión"
        icon="log-out-outline"
        onPress={handleLogout}
        style={{
          backgroundColor: theme.colors.errorContainer,
        }}
      />
    </View>
  );

  const childrenView = (
    <View
      style={[
        {flex: 1, flexDirection: 'column', paddingHorizontal: 14, paddingTop: 16},
        stylesChild,
      ]}>
      {children}
    </View>
  );

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={280}
      drawerPosition="left"
      renderNavigationView={renderDrawer}>
      <View
        style={[{flex: 1, backgroundColor: theme.colors.background}, styles]}>
        {/* HEADER */}
        {title && (
          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
                paddingTop: title ? top + 16 : 0,
                paddingHorizontal: 14,
              },
              stylesHeader,
            ]}>
            <Image
              source={require('../../assets/logo.png')}
              style={{width: 48, height: 48, marginRight: 12}}
            />
            <View style={{flex: 1}}>
              {title && <Text variant="displaySmall">{title}</Text>}
              {subtitle && <Text variant="titleSmall">{subtitle}</Text>}
            </View>
            {title && menu && (
              <IconButton
                icon="menu"
                size={28}
                onPress={() => drawerRef.current?.openDrawer()}
              />
            )}
          </View>
        )}

        {/* CONTENIDO */}
        {scrolleable ? (
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}>
            {childrenView}
          </ScrollView>
        ) : (
          <View style={{flex: 1}}>{childrenView}</View>
        )}

        {/* BOTÓN BACK */}
        {back && (
          <FAB
            style={{position: 'absolute', left: 16, bottom: 16}}
            icon="arrow-back-outline"
            onPress={() => navigation.goBack()}
            mode="flat"
            size="small"
          />
        )}
      </View>
    </DrawerLayout>
  );
};

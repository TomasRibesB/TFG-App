Solucion a errores de librerias:
Warning: A props object containing a "key" prop is being spread into JSX:
  let props = {key: someKey, position: ..., route: ..., navigationState: ..., getAccessibilityLabel: ..., getAccessible: ..., getLabelText: ..., getTestID: ..., renderBadge: ..., renderIcon: ..., renderLabel: ..., activeColor: ..., inactiveColor: ..., pressColor: ..., pressOpacity: ..., onLayout: ..., onPress: ..., onLongPress: ..., labelStyle: ..., style: ..., defaultTabWidth: ..., android_ripple: ...};
  <TabBarItem {...props} />
  https://github.com/react-navigation/react-navigation/issues/11989
  editar TabBar.tsx en node_modules\react-native-tab-view\src\TabBar.tsx

  Warning: A props object containing a "key" prop is being spread into JSX: let props = {key: someKey, route: ..., borderless: ..., centered: ..., rippleColor: ..., onPress: ..., onLongPress: ..., testID: ..., accessibilityLabel: ..., accessibilityRole: ..., accessibilityState: ..., style: ..., children: ...}; <Touchable {...props} /> React keys must be passed directly to JSX without using spread: let props = {route: ..., borderless: ..., centered: ..., rippleColor: ..., onPress: ..., onLongPress: ..., testID: ..., accessibilityLabel: ..., accessibilityRole: ..., accessibilityState: ..., style: ..., children: ...}; <Touchable key={someKey} {...props} /> in BottomNavigation.Bar (created by BottomNavigation) in RCTView (created by View)
  https://github.com/callstack/react-native-paper/issues/4401
  editar node_modules/src/components/BottomNavigation/BottomNavigationBar.tsx
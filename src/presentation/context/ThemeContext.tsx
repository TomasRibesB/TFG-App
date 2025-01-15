import {PropsWithChildren} from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';

export const ThemecontextProvider = ({children}: PropsWithChildren) => {

  return (
    <PaperProvider
      settings={{icon: props => <IonIcon {...props} />}}>
      <NavigationContainer>
          {children}
      </NavigationContainer>
    </PaperProvider>
  );
};

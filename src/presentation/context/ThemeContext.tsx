import { createContext, PropsWithChildren } from "react";

import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';
import { useColorScheme } from "react-native";

import IonIcon from 'react-native-vector-icons/Ionicons';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

export const ThemeContext = createContext({
    isDark: false,
    theme: LightTheme,
})


export const ThemecontextProvider = ({ children }: PropsWithChildren) => {

    const colorScheme = useColorScheme();

    const isDark = colorScheme === 'dark';


    const theme = isDark ? DarkTheme : LightTheme;

    return (
        <PaperProvider settings={{ icon: props => <IonIcon {...props} /> }} theme={theme}>
            <NavigationContainer theme={theme}>
                <ThemeContext.Provider value={{ isDark: isDark, theme }}>
                    {children}
                </ThemeContext.Provider>
            </NavigationContainer>
        </PaperProvider>
    )
}
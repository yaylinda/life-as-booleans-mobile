import {
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_300Light_Italic,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_500Medium,
    Nunito_500Medium_Italic,
    Nunito_600SemiBold,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black,
    Nunito_900Black_Italic
} from '@expo-google-fonts/nunito';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import config from './nativebase.config';
import { AppStackNavigator, AuthStackNavigator } from './src/navigators';
import SplashScreen from './src/screens/SplashScreen';
import useUserStore from './src/stores/userStore';
import { theme } from './src/theme';

const App = () => {
    const { loading, user,  init } = useUserStore();

    const [fontsLoaded] = useFonts({
        Nunito_200ExtraLight,
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_500Medium,
        Nunito_600SemiBold,
        Nunito_700Bold,
        Nunito_800ExtraBold,
        Nunito_900Black,
        Nunito_200ExtraLight_Italic,
        Nunito_300Light_Italic,
        Nunito_400Regular_Italic,
        Nunito_500Medium_Italic,
        Nunito_600SemiBold_Italic,
        Nunito_700Bold_Italic,
        Nunito_800ExtraBold_Italic,
        Nunito_900Black_Italic
    });

    React.useEffect(() => {
        init();
    }, [init]);

    return (
        <NativeBaseProvider theme={theme} config={config}>
            {
                (!fontsLoaded || loading) ? <SplashScreen /> : (
                    <NavigationContainer>
                        {user ? <AppStackNavigator /> : <AuthStackNavigator />}
                    </NavigationContainer>
                )
            }
        </NativeBaseProvider>
    );
};

export default App;

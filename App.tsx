import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { AppStackNavigator, AuthStackNavigator } from './src/navigators';
import SplashScreen from './src/screens/SplashScreen';
import useUserStore from './src/stores/userStore';
import config from './nativebase.config';

const App = () => {
    const { loading, user, init } = useUserStore();

    React.useEffect(() => {
        init();
    }, [init]);

    return (
        <NativeBaseProvider config={config}>
            {
                loading ? <SplashScreen /> : (
                    <NavigationContainer>
                        {user ? <AppStackNavigator /> : <AuthStackNavigator />}
                    </NavigationContainer>
                )
            }
        </NativeBaseProvider>
    );
};

export default App;

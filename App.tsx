
import {NavigationContainer} from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {AppStackNavigator, AuthStackNavigator} from './src/navigators';
import SplashScreen from './src/screens/SplashScreen';
import useAuthStore from './src/stores/authStore';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
    const {loading, user, init} = useAuthStore();

    React.useEffect(() => {
        init();
    }, [init]);

    if (loading) {
        return <SplashScreen/>;
    }

    return (

        <NavigationContainer>
            {
                user ? <AppStackNavigator/> : <AuthStackNavigator/>
            }
        </NavigationContainer>
    );
}


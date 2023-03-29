import {NativeBaseProvider} from "native-base";
import * as WebBrowser from 'expo-web-browser';
import {NavigationContainer} from "@react-navigation/native";
import useAuthStore from "./src/stores/authStore";
import React from "react";
import SplashScreen from "./src/screens/SplashScreen";
import {AppStackNavigator, AuthStackNavigator} from "./src/navigators";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
    const {loading, user, init} = useAuthStore();

    React.useEffect(() => {
        init();
    }, []);

    if (loading) {
        return <SplashScreen/>
    }

    return (
        <NativeBaseProvider>
            <NavigationContainer>
                {
                    user ? <AppStackNavigator/> : <AuthStackNavigator/>
                }
            </NavigationContainer>
        </NativeBaseProvider>
    );
}


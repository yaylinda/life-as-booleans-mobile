import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, Spinner, VStack } from 'native-base';
import React from 'react';
import config from './nativebase.config';
import { AppStackNavigator } from './src/navigators';
import LoadingScreen from './src/screens/LoadingScreen';
import useUserStore from './src/stores/userStore';
import { theme } from './src/theme';

const App = () => {
    const { init, loadingFonts, loadingData, gradientColors } = useUserStore();

    const loading = loadingFonts || loadingData;

    React.useEffect(() => {
        init();
    }, [init]);

    return (
        <NativeBaseProvider theme={theme} config={config}>
            <NavigationContainer>
                <AppStackNavigator />
            </NavigationContainer>
        </NativeBaseProvider>
    );
};

export default App;

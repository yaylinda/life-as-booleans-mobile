import {NativeBaseProvider, Text, View} from 'native-base';
import React from 'react';

const LoginScreen = () => (
    <NativeBaseProvider>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>LoginScreen</Text>
        </View>
    </NativeBaseProvider>
);

export default LoginScreen;

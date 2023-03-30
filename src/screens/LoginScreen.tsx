import React from 'react';
import {NativeBaseProvider, Text, View} from 'native-base';

const LoginScreen = () => (
    <NativeBaseProvider>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>LoginScreen</Text>
        </View>
    </NativeBaseProvider>
);

export default LoginScreen;

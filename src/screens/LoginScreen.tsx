import { Center, NativeBaseProvider, Text } from 'native-base';
import React from 'react';

const LoginScreen = () => (
    <NativeBaseProvider>
        <Center style={{ flex: 1 }}>
            <Text>Login</Text>
        </Center>
    </NativeBaseProvider>
);

export default LoginScreen;

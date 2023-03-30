import { Button, Center, Icon, NativeBaseProvider } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';

const LoginScreen = () => {
    return (
        <NativeBaseProvider>
            <Center style={{ flex: 1 }}>
                <Button
                    variant="outline"
                    leftIcon={<Icon as={AntDesign} name="google" />}
                >
                    Login with Google
                </Button>
            </Center>
        </NativeBaseProvider>
    );
};

export default LoginScreen;

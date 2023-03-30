
import {  Center,  Text, useColorMode } from 'native-base';
import React from 'react';
import { getRandomGradient } from '../gradients';

const LoginScreen = () => {
    const { colorMode } = useColorMode();
    const gradColors = getRandomGradient(colorMode!);

    return (
        <Center
            bg={{
                linearGradient: {
                    colors: gradColors,
                    start: [0, 0],
                    end: [0, 1]
                }
            }}
            style={{ flex: 1 }}
        >
            <Text>Login</Text>
        </Center>
    );
};

export default LoginScreen;

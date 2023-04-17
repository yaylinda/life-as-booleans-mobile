import { Spinner, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';

const LoadingScreen = () => {

    const { gradientColors } = useUserStore();

    return (
        <VStack
            bg={{
                linearGradient: {
                    colors: gradientColors,
                    start: [0, 0],
                    end: [0, 1],
                },
            }}
            h="full"
            w="full"
            justifyContent='center'
            alignItems='center'
        >
            <Spinner size="lg" color="white" />
        </VStack>
    );
};

export default LoadingScreen;

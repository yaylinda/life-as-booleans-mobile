import { Spinner, VStack } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import useUserStore from '../stores/userStore';

interface ScreenWrapperProps {
    children?: JSX.Element | JSX.Element[];
}

const ScreenWrapper = ({children}: ScreenWrapperProps) => {
    const { loadingData, loadingFonts, gradientColors } = useUserStore();

    const loading = loadingData || loadingFonts;

    return (
        <VStack
            bg={{
                linearGradient: {
                    colors: gradientColors,
                    start: [0, 0],
                    end: [0, 1]
                }
            }}
            flex={1}
        >
            <SafeAreaView>
                {loading ? <Spinner size="lg" color="white" /> : children }
            </SafeAreaView>
        </VStack>
    );
};

export default ScreenWrapper;
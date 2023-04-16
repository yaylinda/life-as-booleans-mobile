import { Center, Spinner, VStack } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import useUserStore from '../stores/userStore';

interface ScreenWrapperProps {
    children: React.ReactNode;
}

const ScreenWrapper = ({ children }: ScreenWrapperProps) => {

    // TODO - fix font loading. need to move one level higher

    const { loadingData, loadingFonts, gradientColors } = useUserStore();

    const loading = loadingData || loadingFonts;

    return (
        <VStack
            bg={{
                linearGradient: {
                    colors: gradientColors,
                    start: [0, 0],
                    end: [0, 1],
                },
            }}
            flex={1}
        >
            <SafeAreaView>
                {
                    loading ? (
                        <Center>
                            <Spinner size="lg" color="white" />
                        </Center>
                    ) : (
                        <VStack>
                            {children}
                        </VStack>
                    )
                }
            </SafeAreaView>
        </VStack>
    );
};

export default ScreenWrapper;
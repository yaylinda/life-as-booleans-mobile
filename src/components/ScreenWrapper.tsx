import { Box, Center, Spinner, VStack } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import useUserStore from '../stores/userStore';
// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface ScreenWrapperProps {
    children?: JSX.Element | JSX.Element[];
}

const ScreenWrapper = ({children}: ScreenWrapperProps) => {
    // const tabBarHeight = useBottomTabBarHeight();
    // console.log(`tabBarHeight=${tabBarHeight}`);

    // TODO - fix scrolling with bottom tab bar

    // TODO - fix font loading. need to move one level higher

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
                {
                    loading ? (
                        <Center>
                            <Spinner size="lg" color="white" />
                        </Center>
                    ) : (
                        <VStack space={2} paddingX={2}>
                            {children}
                            <Box height={`${79}px`} />
                        </VStack>
                    )
                }
            </SafeAreaView>
        </VStack>
    );
};

export default ScreenWrapper;
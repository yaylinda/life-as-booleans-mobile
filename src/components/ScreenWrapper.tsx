import { BlurView } from 'expo-blur';
import { HStack, useSafeArea, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';
import { UNIT_PX } from '../styles';

interface ScreenWrapperProps {
    header: React.ReactNode;
    content: React.ReactNode;
}

const ScreenWrapper = ({ header, content }: ScreenWrapperProps) => {

    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
    });

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
        >
            <BlurView tint="dark" intensity={50} style={{ padding: 2 * UNIT_PX }}>
                <HStack {...safeAreaProps} justifyContent="space-between" alignItems="center">
                    {header}
                </HStack>
            </BlurView>
            {content}
        </VStack>
    );
};

export default ScreenWrapper;

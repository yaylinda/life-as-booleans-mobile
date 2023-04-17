import { HStack, useSafeArea, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';

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
            <HStack
                justifyContent="space-between"
                alignItems="center"
                padding={2}
                {...safeAreaProps}
            >
                {header}
            </HStack>
            {content}
        </VStack>
    );
};

export default ScreenWrapper;

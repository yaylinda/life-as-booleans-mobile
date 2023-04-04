import { Center } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';

const SummaryScreen = () => {

    const { gradientColors } = useUserStore();

    return (
        <Center
            bg={{
                linearGradient: {
                    colors: gradientColors,
                    start: [0, 0],
                    end: [0, 1]
                }
            }}
            style={{ flex: 1 }}
        />
    );
};
export default SummaryScreen;
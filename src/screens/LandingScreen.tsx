import { Center, Spinner } from 'native-base';
import React from 'react';
import Welcome from '../components/Welcome';
import useUserStore from '../stores/userStore';

const LandingScreen = () => {
    const { loadingData, loadingFonts, gradientColors, user } = useUserStore();
    const loading = loadingData || loadingFonts;

    const renderContent = () => {
        return (
            <>
            </>
        );
    };

    return (
        <Center
            bg={{
                linearGradient: {
                    colors: gradientColors,
                    start: [0, 0],
                    end: [0, 1]
                }
            }}
            style={{ flex: 1 }}>
            {loading ? <Spinner size="lg" color="white" /> : user ? renderContent() : <Welcome />}
        </Center>
    );
};

export default LandingScreen;

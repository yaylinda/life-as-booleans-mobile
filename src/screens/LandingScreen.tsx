import { FontAwesome } from '@expo/vector-icons';
import { Center, Heading, HStack, IconButton, Spinner, VStack } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import WeekView from '../components/WeekView';
import Welcome from '../components/Welcome';
import useUserStore from '../stores/userStore';
import { getWeekStart } from '../utilities';
import type moment from 'moment';

interface HeaderProps {
    startDate: moment.Moment;
    prevWeek: () => void;
    nextWeek: () => void;
}

const Header = ({startDate, prevWeek, nextWeek}: HeaderProps) => {
    return (
        <HStack w='100%' justifyContent='space-between' alignItems='center'>
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome,
                    name: 'chevron-left',
                    color: 'coolGray.50',
                }}
                onPress={prevWeek}
            />
            <Heading>Week of {startDate.format('MMM DD')}</Heading>
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome,
                    name: 'chevron-right',
                    color: 'coolGray.50',
                }}
                onPress={nextWeek}
            />
        </HStack>
    );
};

const LandingScreen = () => {
    const { loadingData, loadingFonts, gradientColors, user } = useUserStore();
    const loading = loadingData || loadingFonts;

    const [weekStartDate, setWeekStartDate] = React.useState<moment.Moment>(getWeekStart());

    const prevWeek = () => {
        setWeekStartDate((date) => date.clone().subtract(1, 'week'));
    };

    const nextWeek = () => {
        setWeekStartDate((date) => date.clone().add(1, 'week'));
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
            style={{ flex: 1 }}
        >
            {loading ? <Spinner size="lg" color="white" /> : user ? (
                <SafeAreaView>
                    <VStack paddingX={5}>
                        <Header startDate={weekStartDate} prevWeek={prevWeek} nextWeek={nextWeek} />
                        <WeekView startDate={weekStartDate} />
                    </VStack>
                </SafeAreaView>
            ) : <Welcome />}
        </Center>
    );
};

export default LandingScreen;

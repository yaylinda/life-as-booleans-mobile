import { FontAwesome } from '@expo/vector-icons';

import moment from 'moment';
import { Button, Center, Heading, HStack, IconButton, Slide, Spinner, useSafeArea, VStack } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';

import WeekDataContainer from '../components/WeekDataContainer';
import Welcome from '../components/Welcome';
import useUserStore from '../stores/userStore';
import { getWeekStart } from '../utilities';

interface HeaderProps {
    startDate: moment.Moment;
    isCurrentWeek: boolean;
    prevWeek: () => void;
    nextWeek: () => void;
}

const Header = ({ startDate, isCurrentWeek, prevWeek, nextWeek }: HeaderProps) => {

    return (
        <HStack w="100%" justifyContent="space-between" alignItems="center">
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome,
                    name: 'chevron-left',
                    color: 'coolGray.50'
                }}
                onPress={prevWeek}
            />
            <Heading>Week of {startDate.format('MMM DD')}</Heading>
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome,
                    name: 'chevron-right',
                    color: isCurrentWeek ? 'coolGray.50:alpha.10' : 'coolGray.50'
                }}
                onPress={nextWeek}
                disabled={isCurrentWeek}
            />
        </HStack>
    );
};

const LandingScreen = () => {
    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
        safeAreaBottom: true
    });

    const { loadingData, loadingFonts, gradientColors, user } = useUserStore();
    const [weekStartDate, setWeekStartDate] = React.useState<moment.Moment>(getWeekStart());

    const isCurrentWeek = weekStartDate.isSame(moment(), 'week');
    const loading = loadingData || loadingFonts;

    const prevWeek = () => {
        setWeekStartDate((date) =>
            date
                .clone()
                .subtract(1, 'week')
                .startOf('day')
        );
    };

    const nextWeek = () => {
        setWeekStartDate((date) =>
            date
                .clone()
                .add(1, 'week')
                .startOf('day')
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
            style={{ flex: 1 }}
        >
            {loading ? <Spinner size="lg" color="white" /> : user ? (
                <SafeAreaView>
                    <VStack paddingX={5} space={5}>
                        <Header
                            startDate={weekStartDate}
                            isCurrentWeek={isCurrentWeek}
                            prevWeek={prevWeek}
                            nextWeek={nextWeek}
                        />
                        <WeekDataContainer weekStart={weekStartDate} isCurrentWeek={isCurrentWeek} />
                    </VStack>
                    <Slide in={!isCurrentWeek} placement="bottom">
                        <Center w="100%" position="absolute" bottom={0} {...safeAreaProps}>
                            <Button onPress={() => setWeekStartDate(getWeekStart)}>
                                Today
                            </Button>
                        </Center>
                    </Slide>
                </SafeAreaView>
            ) : <Welcome />}
        </Center>
    );
};

export default LandingScreen;

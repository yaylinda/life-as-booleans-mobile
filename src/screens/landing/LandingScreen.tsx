import moment from 'moment';
import { Button, Center, Slide, Spinner, useSafeArea, VStack } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';

import Welcome from '../../components/Welcome';
import useUserStore from '../../stores/userStore';
import { getWeekStart } from '../../utilities';
import LandingScreenHeader from './LandingScreenHeader';
import WeekDataContainer from './WeekDataContainer';

const LandingScreen = () => {
    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
        safeAreaBottom: true
    });

    const { loadingData, loadingFonts, gradientColors, user } = useUserStore();
    const [weekStartDate, setWeekStartDate] = React.useState<moment.Moment>(getWeekStart());

    const isFirstWeek = user ? weekStartDate.isSameOrBefore(moment(user.createdDateEpoch), 'week') : true;
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
                        <LandingScreenHeader
                            startDate={weekStartDate}
                            isFirstWeek={isFirstWeek}
                            isCurrentWeek={isCurrentWeek}
                            prevWeek={prevWeek}
                            nextWeek={nextWeek}
                        />
                        <WeekDataContainer
                            weekStart={weekStartDate}
                            isCurrentWeek={isCurrentWeek}
                        />
                    </VStack>
                    <Slide in={!isCurrentWeek} placement="bottom">
                        <Center w="100%" position="absolute" bottom={0} {...safeAreaProps}>
                            <Button
                                bg="black:alpha.50"
                                _pressed={{
                                    bg: 'black:alpha.40'
                                }}
                                onPress={() => setWeekStartDate(getWeekStart)}
                            >
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

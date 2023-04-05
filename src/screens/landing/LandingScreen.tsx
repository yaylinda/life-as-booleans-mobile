import moment from 'moment';
import { Button, Center, Slide, useSafeArea } from 'native-base';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import useUserStore from '../../stores/userStore';
import { getWeekStart } from '../../utilities';
import LandingScreenHeader from './LandingScreenHeader';
import WeekDataContainer from './WeekDataContainer';

const LandingScreen = () => {
    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
        safeAreaBottom: true
    });

    const { user } = useUserStore();
    const [weekStartDate, setWeekStartDate] = React.useState<moment.Moment>(getWeekStart());

    const isFirstWeek = user ? weekStartDate.isSameOrBefore(moment(user.createdDateEpoch), 'week') : true;
    const isCurrentWeek = weekStartDate.isSame(moment(), 'week');

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
        <>
            <ScreenWrapper>
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
            </ScreenWrapper>
            <Slide in={!isCurrentWeek} placement="bottom" position="absolute">
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
        </>
    );
};

export default LandingScreen;

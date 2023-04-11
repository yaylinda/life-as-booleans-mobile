import moment from 'moment';

import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { getWeekStart } from '../../utilities';
import HomeScreenHeader from './HomeScreenHeader';
import WeekDataList from './WeekDataList';
import YearDataActionSheet from './YearDataActionSheet';

const HomeScreen = () => {
    // const safeAreaProps = useSafeArea({
    //     safeAreaTop: true,
    //     safeAreaBottom: true
    // });

    const [weekStartDate, setWeekStartDate] = React.useState<moment.Moment>(getWeekStart());

    const isCurrentWeek = weekStartDate.isSame(moment(), 'week');

    const prevWeek = () => {
        setWeekStartDate((date) =>
            date
                .clone()
                .subtract(1, 'week')
                .startOf('day'),
        );
    };

    const nextWeek = () => {
        setWeekStartDate((date) =>
            date
                .clone()
                .add(1, 'week')
                .startOf('day'),
        );
    };

    return (
        <>
            <ScreenWrapper>
                <HomeScreenHeader
                    startDate={weekStartDate}
                    isCurrentWeek={isCurrentWeek}
                    prevWeek={prevWeek}
                    nextWeek={nextWeek}
                />
                <WeekDataList
                    weekStart={weekStartDate}
                    isCurrentWeek={isCurrentWeek}
                />
            </ScreenWrapper>
            <YearDataActionSheet />
            {/*<Slide in={!isCurrentWeek} placement="bottom" position="absolute">*/}
            {/*    <Center w="100%" position="absolute" bottom={0} {...safeAreaProps}>*/}
            {/*        <Button*/}
            {/*            bg="black:alpha.50"*/}
            {/*            _pressed={{*/}
            {/*                bg: 'black:alpha.40'*/}
            {/*            }}*/}
            {/*            onPress={() => setWeekStartDate(getWeekStart)}*/}
            {/*        >*/}
            {/*            Today*/}
            {/*        </Button>*/}
            {/*    </Center>*/}
            {/*</Slide>*/}
        </>
    );
};

export default HomeScreen;

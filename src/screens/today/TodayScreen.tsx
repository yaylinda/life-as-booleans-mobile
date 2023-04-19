import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';
import { IconButton } from 'native-base';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import AddOrEditTrackerDialog from '../../components/tracker/AddOrEditTrackerDialog';
import useUserStore from '../../stores/userStore';
import { BG, PRESSED_BUTTON_BG } from '../../styles';
import { DayNavigation } from '../../types';
import TodayScreenHeader from './TodayScreenHeader';
import TrackerList from './TrackerList';



const TodayScreen = () => {

    const { openAddTrackerDialog, setDayNavigation } = useUserStore();

    const [date, setDate] = React.useState<moment.Moment>(moment().startOf('day'));

    const isToday = moment().isSame(date, 'day');

    const prevDay = () => {
        setDayNavigation(DayNavigation.PREV);
        setDate((date) =>
            date
                .clone()
                .subtract(1, 'day')
                .startOf('day'),
        );
    };

    const nextDay = () => {
        setDayNavigation(DayNavigation.NEXT);
        setDate((date) =>
            date
                .clone()
                .add(1, 'day')
                .startOf('day'),
        );
    };

    const goToTodayButton = (
        <IconButton
            bg={BG}
            borderRadius="full"
            _icon={{
                as: FontAwesome5,
                name: 'calendar-day',
                color: 'white',
                textAlign: 'center',
            }}
            _pressed={{
                bg: PRESSED_BUTTON_BG,
            }}
            onPress={() => setDate(moment().startOf('day'))}
        />
    );

    const addTrackerButton = (
        <IconButton
            bg={BG}
            borderRadius="full"
            _icon={{
                as: FontAwesome5,
                name: 'plus',
                color: 'white',
                textAlign: 'center',
            }}
            _pressed={{
                bg: PRESSED_BUTTON_BG,
            }}
            onPress={openAddTrackerDialog}
        />
    );

    return (
        <ScreenWrapper
            header={
                <TodayScreenHeader
                    date={date}
                    prevDay={prevDay}
                    nextDay={nextDay}
                />
            }
            content={
                <>
                    <TrackerList date={date} />
                    {/*{isToday ? addTrackerButton : goToTodayButton}*/}
                </>
            }
            dialogs={
                <AddOrEditTrackerDialog />
            }
        />
    );
};

export default TodayScreen;
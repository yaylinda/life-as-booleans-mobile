import moment from 'moment';
import { Pressable } from 'native-base';
import React from 'react';
import { EventRegister } from 'react-native-event-listeners';
import ScreenWrapper from '../../components/ScreenWrapper';
import AddOrEditTrackerDialog from '../../components/tracker/AddOrEditTrackerDialog';
import { Events } from '../../events';

import TodayScreenHeader from './TodayScreenHeader';
import TrackerList from './TrackerList';


const TodayScreen = () => {

    const [date, setDate] = React.useState<moment.Moment>(moment().startOf('day'));

    const prevDay = () => {
        setDate((date) =>
            date
                .clone()
                .subtract(1, 'day')
                .startOf('day'),
        );
    };

    const nextDay = () => {
        setDate((date) =>
            date
                .clone()
                .add(1, 'day')
                .startOf('day'),
        );
    };

    const goToToday = () => {
        setDate(moment().startOf('day'));
    };

    return (
        <Pressable
            onPress={() => {
                EventRegister.emit(Events.CLOSE_TRACKER_OPTIONS);
            }}
        >
            <ScreenWrapper
                header={
                    <TodayScreenHeader
                        date={date}
                        prevDay={prevDay}
                        nextDay={nextDay}
                    />
                }
                content={
                    <TrackerList date={date} goToToday={goToToday} />
                }
                dialogs={
                    <AddOrEditTrackerDialog />
                }
            />
        </Pressable>
    );
};

export default TodayScreen;
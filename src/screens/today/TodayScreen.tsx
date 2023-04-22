import moment from 'moment';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import AddOrEditTrackerDialog from '../../components/tracker/AddOrEditTrackerDialog';
import YearDataActionSheet from '../../components/year/YearDataActionSheet';

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
                <>
                    <AddOrEditTrackerDialog />
                    <YearDataActionSheet />
                </>
            }
        />
    );
};

export default TodayScreen;
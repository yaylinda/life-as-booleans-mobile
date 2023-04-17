import moment from 'moment';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import TrackerFullWidth from '../../components/tracker/TrackerFullWidth';
import useUserStore, { DEFAULT_TRACKERS } from '../../stores/userStore';
import TodayScreenHeader from './TodayScreenHeader';


const TodayScreen = () => {

    const {  } = useUserStore();

    const [date, setDate] = React.useState<moment.Moment>(moment());

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
                    <TrackerFullWidth value={{
                        tracker: DEFAULT_TRACKERS['overall_mood'],
                        date,
                    }} />
                </>
            }
        />
    );
};

export default TodayScreen;
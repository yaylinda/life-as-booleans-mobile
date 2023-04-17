import moment from 'moment';
import { ScrollView } from 'native-base';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import TrackerFullWidth from '../../components/tracker/TrackerFullWidth';
import useUserStore, { DEFAULT_TRACKERS } from '../../stores/userStore';
import TodayScreenHeader from './TodayScreenHeader';


const TodayScreen = () => {

    const { trackers } = useUserStore();

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
                <ScrollView showsVerticalScrollIndicator={false} paddingX={2}>
                    <TrackerFullWidth value={{
                        trackerId: DEFAULT_TRACKERS['overall_mood'].id,
                        date,
                    }} />
                </ScrollView>
            }
        />
    );
};

export default TodayScreen;
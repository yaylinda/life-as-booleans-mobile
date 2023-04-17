import { chunk } from 'lodash';
import moment from 'moment';
import { ScrollView } from 'native-base';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import TrackerRow from '../../components/tracker/TrackerRow';
import useUserStore, { DEFAULT_TRACKERS } from '../../stores/userStore';
import TodayScreenHeader from './TodayScreenHeader';

const NUM_TRACKERS_PER_ROW = 2;

const TodayScreen = () => {

    const { trackers } = useUserStore();

    const [date, setDate] = React.useState<moment.Moment>(moment());

    const trackerIdRows: string[][] = React.useMemo(() => {
        const nonDefaultTrackerIds = Object.keys(trackers)
            .filter((trackerId) => !DEFAULT_TRACKERS[trackerId]);
        return chunk(nonDefaultTrackerIds, NUM_TRACKERS_PER_ROW);
    }, [trackers]);

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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    paddingX={2}
                >
                    <TrackerRow
                        date={date}
                        trackerIds={[DEFAULT_TRACKERS['overall_mood'].id]}
                    />
                    {trackerIdRows.map((trackerIds) => (
                        <TrackerRow
                            key={`${trackerIds}_${date.valueOf()}`}
                            date={date}
                            trackerIds={trackerIds}
                        />
                    ))}
                </ScrollView>
            }
        />
    );
};

export default TodayScreen;
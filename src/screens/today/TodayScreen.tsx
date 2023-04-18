import { chunk } from 'lodash';
import moment from 'moment';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { DEFAULT_TRACKERS } from '../../defaultTrackers';
import useUserStore from '../../stores/userStore';
import TodayScreenContent from './TodayScreenContent';
import TodayScreenHeader from './TodayScreenHeader';



const NUM_COLUMNS = 2;

const TodayScreen = () => {

    const { trackers } = useUserStore();

    const [date, setDate] = React.useState<moment.Moment>(moment().startOf('day'));

    const trackerIdRows: string[][] = React.useMemo(() => {
        const nonDefaultTrackerIds = Object.keys(trackers)
            .filter((trackerId) => !DEFAULT_TRACKERS[trackerId]);

        // const chunkSize = nonDefaultTrackerIds.length / NUM_COLUMNS;

        const chunked = chunk(nonDefaultTrackerIds, NUM_COLUMNS);
        return [[...Object.keys(DEFAULT_TRACKERS)] , ...chunked];
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
                <TodayScreenContent
                    date={date}
                    trackerIdRows={trackerIdRows}
                />
            }
        />
    );
};

export default TodayScreen;
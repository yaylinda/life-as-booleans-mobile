import moment from 'moment';
import { Divider, HStack, VStack } from 'native-base';
import React from 'react';

import { withContext } from '../../withContext';
import DayData from './DayData';
import WeekDataHeader from './WeekDataHeader';
import { WeekTrackerProvider } from './WeekTrackerContext';
import { useWeekTracker } from './useWeekTracker';

interface WeekDataProps {
    isNew: boolean;
}

const WeekTracker = ({ isNew }: WeekDataProps) => {
    // const [tracker, setTracker] = React.useState<Tracker>((!isNew && trackerId)
    //     ? useUserStore((state) => state.trackers[trackerId])
    //     : EMPTY_TRACKER());

    const { trackerId,  weekStart } = useWeekTracker();

    const dates: moment.Moment[] = React.useMemo(() => {
        const start = moment(weekStart).startOf('day');
        const end = start.clone().add(1, 'week').startOf('day');

        const dates: moment.Moment[] = [];
        while (start.isBefore(end)) {
            dates.push(start.clone());
            start.add(1, 'day');
        }

        return dates;
    }, [weekStart]);

    // const updateTrackerField = (fieldName: string, value: string) => {
    //     setTracker((tracker) => produce(tracker, (draft) => {
    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         // @ts-ignore
    //         draft[fieldName] = value;
    //     }));
    // };

    return (
        <VStack
            mb={4}
            padding={4}
            space={2}
            bg="black:alpha.20"
            borderRadius="3xl"
        >
            <WeekDataHeader isNew={isNew} />

            <Divider bg="white:alpha.50" />

            <HStack justifyContent="space-between">
                {dates.map((date) => (
                    <DayData
                        key={`day_${date.valueOf()}_${trackerId}`}
                        date={date}
                        isNew={isNew}
                    />
                ))}
            </HStack>
        </VStack>
    );
};

export default withContext(WeekTracker, WeekTrackerProvider);

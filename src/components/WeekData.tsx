import moment from 'moment';
import { Divider, HStack, Text, VStack } from 'native-base';
import React from 'react';
import useUserStore, { DEFAULT_TRACKERS } from '../stores/userStore';

import DayData from './DayData';

interface WeekDataProps {
    weekStart: moment.Moment;
    trackerId: string;
}

const WeekData = ({weekStart, trackerId}: WeekDataProps) => {
    const tracker = useUserStore((state) => state.trackers[trackerId]);

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

    return (
        <VStack
            mb={4}
            padding={4}
            space={2}
            bg="white:alpha.20"
            borderRadius="3xl"
        >
            <Text
                textTransform='capitalize'
                fontWeight='bold'
                fontSize='lg'
            >
                {tracker.displayName}
            </Text>

            <Divider bg="white:alpha.50"/>

            <HStack justifyContent='space-between'>
                {
                    dates.map((date) => (
                        <DayData
                            key={`day_${date.valueOf()}_${trackerId}`}
                            isDefaultTracker={!!DEFAULT_TRACKERS[trackerId]}
                            date={date}
                            tracker={tracker}
                        />
                    ))
                }
            </HStack>
        </VStack>
    );
};

export default WeekData;

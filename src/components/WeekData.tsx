import moment from 'moment';
import { Divider, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { DEFAULT_TRACKERS } from '../stores/userStore';
import DayData from './DayData';

interface WeekDataProps {
    weekStart: moment.Moment;
    tracker: string;
}

const WeekData = ({weekStart, tracker}: WeekDataProps) => {

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
            bg="coolGray.50:alpha.20"
            borderRadius="3xl"
        >
            <Text
                textTransform='capitalize'
                fontWeight='bold'
                fontSize='lg'
            >
                {tracker}
            </Text>

            <Divider bg="coolGray.50:alpha.50"/>

            <HStack justifyContent='space-between'>
                {
                    dates.map((date) => (
                        <DayData
                            key={`day_${date.valueOf()}_${tracker}`}
                            isDefaultTracker={DEFAULT_TRACKERS.includes(tracker)}
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

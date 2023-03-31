import moment from 'moment';
import { Divider, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { DEFAULT_DATA_KEYS } from '../stores/userStore';
import DayData from './DayData';

interface WeekDataProps {
    weekStart: moment.Moment;
    dataKey: string;
}

const WeekData = ({weekStart, dataKey}: WeekDataProps) => {

    const dayEpochs = React.useMemo(() => {
        const start = moment(weekStart).startOf('day');
        const end = start.clone().add(1, 'week').startOf('day');

        const dates: string[] = [];
        while (start.isBefore(end)) {
            dates.push(`${start.clone().valueOf()}`);
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
                {dataKey}
            </Text>

            <Divider bg="coolGray.50:alpha.50"/>

            <HStack justifyContent='space-between'>
                {
                    dayEpochs.map((dayEpoch) => (
                        <DayData
                            key={`day_${dayEpoch}_${dataKey}`}
                            isDefaultDataKey={DEFAULT_DATA_KEYS.includes(dataKey)}
                            dayEpoch={dayEpoch}
                            dataKey={dataKey}
                        />
                    ))
                }
            </HStack>
        </VStack>
    );
};

export default WeekData;

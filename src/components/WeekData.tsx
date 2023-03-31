import moment from 'moment';
import { HStack, Text, VStack } from 'native-base';
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
        <VStack>
            <Text>{dataKey}</Text>
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
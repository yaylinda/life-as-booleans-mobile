import { Moment } from 'moment';
import { Divider, HStack, Text, VStack } from 'native-base';
import React from 'react';
import useDataScreenStore from '../../screens/data/dataScreenStore';
import { BG } from '../../styles';
import { getWeekChunksForMonth } from '../../utilities';
import WeekViewDay, { DayType } from '../week/WeekViewDay';

const MonthView = () => {

    const { month: start, selectedTracker: tracker } = useDataScreenStore();

    const dates = getWeekChunksForMonth();

    return (
        <VStack
            padding={4}
            space={2}
            bg={BG}
            borderRadius="xl"
        >
            <HStack justifyContent="space-between">
                <Text fontSize="md" fontWeight="bold">This Month</Text>
                <Text fontSize="sm">{start.format('MMMM')}</Text>
            </HStack>

            <Divider bg="white:alpha.50" />

            <VStack>
                {dates.map((week: Moment[], rIndex: number) => (
                    <HStack key={`r_${rIndex}`} justifyContent="space-between">
                        {week.map((date: Moment, cIndex: number) => (
                            <WeekViewDay
                                key={`r_${rIndex}_c_${cIndex}`}
                                tracker={tracker}
                                date={date}
                                dayType={DayType.MONTH}
                            />
                        ))}
                    </HStack>
                ))}
            </VStack>
        </VStack>
    );
};

export default MonthView;
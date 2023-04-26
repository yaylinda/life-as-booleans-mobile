import { Divider, HStack, Text, VStack } from 'native-base';
import React from 'react';
import useDataScreenStore from '../../screens/data/dataScreenStore';
import { BG } from '../../styles';
import { getDatesBetween } from '../../utilities';
import DayCell, { DayType } from '../day/DayCell';

const WeekView = () => {

    const { week: start, selectedTracker: tracker } = useDataScreenStore();
    const end = start.clone().endOf('week');

    const dates = getDatesBetween(start, end);

    return (
        <VStack
            padding={4}
            space={2}
            bg={BG}
            borderRadius="xl"
        >
            <HStack justifyContent="space-between">
                <Text fontSize="md" fontWeight="bold">This Week</Text>
                <Text fontSize="sm">{start.format('M/D')} - {end.format('M/D')}</Text>
            </HStack>

            <Divider bg="white:alpha.50" />

            <HStack marginX={-4} justifyContent="space-between">
                {dates.map((date) => (
                    <DayCell
                        key={`day_${date.valueOf()}_${tracker.id}`}
                        date={date}
                        tracker={tracker}
                        dayType={DayType.WEEK}
                    />
                ))}
            </HStack>
        </VStack>
    );
};

export default WeekView;
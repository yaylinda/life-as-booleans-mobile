import { Divider, HStack, Text, VStack } from 'native-base';
import React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import useDataScreenStore from '../../screens/data/dataScreenStore';
import { BG } from '../../styles';
import { getDatesBetween } from '../../utilities';
import DayCell, { DayType } from '../day/DayCell';

const WeekView = () => {

    const { week: start, selectedTracker: tracker } = useDataScreenStore();
    const end = start.clone().endOf('week');

    const dates = getDatesBetween(start, end);

    return (
        <Animated.View entering={FadeIn.delay(100)}>
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

                <HStack marginX={-2} justifyContent="space-between">
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
        </Animated.View>
    );
};

export default WeekView;
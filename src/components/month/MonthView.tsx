import { Divider, HStack, Text, VStack } from 'native-base';
import React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import useDataScreenStore from '../../screens/data/dataScreenStore';
import { BG } from '../../styles';
import { getWeekChunksForMonth } from '../../utilities';
import DayCell, { DayType } from '../day/DayCell';
import type { Moment } from 'moment';

const MonthView = () => {

    const { month: start, selectedTracker: tracker } = useDataScreenStore();

    const dates = getWeekChunksForMonth();

    return (
        <Animated.View entering={FadeIn.delay(200)}>
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

                <VStack marginX={-2}>
                    <HStack key="dow_label" justifyContent="space-between" marginBottom={1}>
                        {dates[0].map((date: Moment, index: number) => (
                            <VStack key={`dow_${index}`} alignItems="center" flex={1}>
                                <Text fontSize="2xs" fontWeight="black">
                                    {date.format('dd')[0]}
                                </Text>
                            </VStack>
                        ))}
                    </HStack>

                    {dates.map((week: Moment[], rIndex: number) => (
                        <HStack key={`r_${rIndex}`} justifyContent="space-between">
                            {week.map((date: Moment, cIndex: number) => (
                                <DayCell
                                    key={`r_${rIndex}_c_${cIndex}_${tracker.id}`}
                                    tracker={tracker}
                                    date={date}
                                    dayType={DayType.MONTH}
                                />
                            ))}
                        </HStack>
                    ))}
                </VStack>
            </VStack>
        </Animated.View>
    );
};

export default MonthView;
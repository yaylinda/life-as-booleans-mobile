import { Divider, HStack, Text, VStack } from 'native-base';
import React from 'react';
import useDataScreenStore from '../../screens/data/dataScreenStore';
import { BG } from '../../styles';
import { getDatesBetween } from '../../utilities';

const MonthView = () => {

    const { month: start  } = useDataScreenStore();
    const end = start.clone().endOf('month').startOf('day');

    const dates = getDatesBetween(start, end);

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
        </VStack>
    );
};

export default MonthView;
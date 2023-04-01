import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { IconButton, Text, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';
import type { Tracker } from '../types';

interface DayDataProps {
    isDefaultTracker: boolean,
    date: moment.Moment,
    tracker: Tracker,
}

const DayData = ({ date, tracker}: DayDataProps) => {
    const {getData} = useUserStore();

    const [, setValue] = React.useState<string | undefined>();

    const dayEpoch = `${date.valueOf()}`;
    const dayOfWeekLabel = date.format('dd')[0];
    const dayOfMonthLabel = date.format('DD');
    const isToday = date.isSame(moment(), 'day');
    const isBefore = date.isBefore(moment(), 'day');
    const isAfter = date.isAfter(moment(), 'day');

    React.useEffect(() => {
        const get = async () => {
            const data = await getData(dayEpoch, tracker.id);
            setValue(data);
        };

        get();
    }, [tracker, dayEpoch, getData]);

    return (
        <VStack alignItems='center'>
            <Text fontSize='2xs' fontWeight='bold'>{dayOfWeekLabel}</Text>
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome,
                    name: 'smile-o',
                    color: 'coolGray.50'
                }}
            />
            <Text fontSize='2xs' fontWeight='bold'>{dayOfMonthLabel}</Text>
        </VStack>

    );
};

export default DayData;
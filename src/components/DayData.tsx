import { FontAwesome } from '@expo/vector-icons';
import { IconButton, Text, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';
import type moment from 'moment';

interface DayDataProps {
    isDefaultTracker: boolean,
    date: moment.Moment,
    tracker: string,
}

const DayData = ({ date, tracker}: DayDataProps) => {
    const {getData} = useUserStore();

    const [, setValue] = React.useState<string | undefined>();

    const dayEpoch = `${date.valueOf()}`;
    const dayOfWeekLabel = date.format('dd')[0];
    const dayOfMonthLabel = date.format('DD');

    React.useEffect(() => {
        const get = async () => {
            const data = await getData(dayEpoch, tracker);
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
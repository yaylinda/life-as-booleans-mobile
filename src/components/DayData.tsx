import { FontAwesome } from '@expo/vector-icons';
import { IconButton, Text, VStack } from 'native-base';
import React from 'react';
import moment from 'moment';
import useUserStore from '../stores/userStore';

interface DayDataProps {
    isDefaultDataKey: boolean,
    date: moment.Moment,
    dataKey: string,
}

const DayData = ({isDefaultDataKey, date, dataKey}: DayDataProps) => {
    const {getData} = useUserStore();

    const [value, setValue] = React.useState<boolean | undefined>();

    const dayEpoch = `${date.valueOf()}`;
    const dayOfWeekLabel = date.format('dd')[0];
    const dayOfMonthLabel = date.format('DD');

    React.useEffect(() => {
        const get = async () => {
            const data = await getData(dayEpoch, dataKey);
            setValue(data);
        };

        get();
    }, [dataKey, dayEpoch, getData]);

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
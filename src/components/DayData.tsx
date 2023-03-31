import { FontAwesome } from '@expo/vector-icons';
import { IconButton } from 'native-base';
import React from 'react';

interface DayDataProps {
    isDefaultDataKey: boolean,
    dayEpoch: string,
    dataKey: string,
}

const DayData = ({  isDefaultDataKey, dayEpoch, dataKey  }: DayDataProps) => {
    return (
        <IconButton
            borderRadius="full"
            _icon={{
                as: FontAwesome,
                name: 'smile-o',
                color: 'coolGray.50'
            }}
        />
    );
};

export default DayData;
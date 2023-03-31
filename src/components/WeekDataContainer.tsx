import { FontAwesome } from '@expo/vector-icons';
import { Box, IconButton, ScrollView } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';
import WeekData from './WeekData';
import type moment from 'moment';

interface WeekDataContainerProps {
    weekStart: moment.Moment;
}

const WeekDataContainer = ({ weekStart }: WeekDataContainerProps) => {
    const { dataKeys } = useUserStore();

    return (
        <Box flex={1} paddingX={2}>
            <ScrollView>
                {
                    dataKeys.map((dataKey) => (
                        <WeekData
                            key={`week_${weekStart.valueOf()}_${dataKey}`}
                            weekStart={weekStart}
                            dataKey={dataKey}
                        />
                    ))
                }
                <IconButton
                    borderRadius="full"
                    bg="coolGray.50:alpha.20"
                    _icon={{
                        as: FontAwesome,
                        name: 'plus',
                        color: 'coolGray.50'
                    }}
                />
            </ScrollView>
        </Box>
    );
};

export default WeekDataContainer;

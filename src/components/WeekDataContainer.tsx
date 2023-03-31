import { FontAwesome } from '@expo/vector-icons';
import { FlatList, IconButton } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';
import WeekData from './WeekData';
import type moment from 'moment';

interface WeekDataContainerProps {
    weekStart: moment.Moment;
}

const ADD_BUTTON_ITEM = 'ADD_BUTTON';

const WeekDataContainer = ({ weekStart }: WeekDataContainerProps) => {
    const { dataKeys } = useUserStore();

    const dataItems = React.useMemo(() => {
        return [...dataKeys, ADD_BUTTON_ITEM];
    }, [dataKeys]);

    return (
        <FlatList
            paddingX={2}
            data={dataItems}
            renderItem={({ item }) => (
                item === ADD_BUTTON_ITEM ? (
                    <IconButton
                        borderRadius="full"
                        bg="coolGray.50:alpha.20"
                        _icon={{
                            as: FontAwesome,
                            name: 'plus',
                            color: 'coolGray.50'
                        }}
                    />
                ) : (
                    <WeekData
                        key={`week_${weekStart.valueOf()}_${item}`}
                        weekStart={weekStart}
                        dataKey={item}
                    />
                )
            )}
        />
    );
};

export default WeekDataContainer;

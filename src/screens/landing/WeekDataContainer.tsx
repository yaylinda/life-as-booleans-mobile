import { FontAwesome } from '@expo/vector-icons';
import { FlatList, IconButton } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';

import WeekData from './WeekData';
import type moment from 'moment';

interface WeekDataContainerProps {
    weekStart: moment.Moment;
    isCurrentWeek: boolean;
}

const ADD_BUTTON_ITEM = 'ADD_BUTTON';
const NEW_TRACKER_ITEM = 'NEW_TRACKER_ITEM';

const WeekDataContainer = ({ weekStart, isCurrentWeek }: WeekDataContainerProps) => {
    const { trackers, isAddingTracker, setIsAddingTracker } = useUserStore();

    const dataItems: string[] = React.useMemo(() => {
        if (isCurrentWeek) {
            return [
                ...Object.keys(trackers),
                isAddingTracker ? NEW_TRACKER_ITEM : ADD_BUTTON_ITEM
            ];
        }
        return Object.keys(trackers);
    }, [trackers, isCurrentWeek, isAddingTracker]);

    const addNewTrackerButton = (
        <IconButton
            borderRadius="full"
            bg="white:alpha.20"
            _pressed={{
                bg: 'white:alpha.30'
            }}
            _icon={{
                as: FontAwesome,
                name: 'plus',
                color: 'white',
                textAlign: 'center'
            }}
            onPress={() => setIsAddingTracker(true)}
        />
    );

    const renderItem = ({ item }: ({ item: string })) => {
        switch (item) {
        case ADD_BUTTON_ITEM:
            return addNewTrackerButton;
        case NEW_TRACKER_ITEM:
            return (
                <WeekData
                    key={`week_${weekStart.valueOf()}_NEW`}
                    weekStart={weekStart}
                    isNew={true}
                />
            );
        default:
            return (
                <WeekData
                    key={`week_${weekStart.valueOf()}_${item}`}
                    weekStart={weekStart}
                    trackerId={item}
                    isNew={false}
                />
            );
        }
    };

    return (
        <FlatList
            data={dataItems}
            renderItem={renderItem}
        />
    );
};

export default WeekDataContainer;

import { FontAwesome5 } from '@expo/vector-icons';

import { Box, FlatList, IconButton } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import { UNIT_PX } from '../../styles';
import WeekTrackerWithContext from './WeekTrackerWithContext';
import type moment from 'moment';

interface WeekDataListProps {
    weekStart: moment.Moment;
    isCurrentWeek: boolean;
}

const ADD_BUTTON_ITEM = 'ADD_BUTTON';
const NEW_TRACKER_ITEM = 'NEW_TRACKER_ITEM';
const SPACER_ITEM = 'SPACER_ITEM';

const WeekDataList = ({ weekStart, isCurrentWeek }: WeekDataListProps) => {
    const { trackers, isAddingTracker, editingTrackerId, setIsAddingTracker } = useUserStore();

    const dataItems: string[] = React.useMemo(() => {
        if (isCurrentWeek) {
            const items = [...Object.keys(trackers)];

            if (isAddingTracker) {
                items.push(NEW_TRACKER_ITEM);
            }

            return [...items, ADD_BUTTON_ITEM, SPACER_ITEM];
        }
        return [...Object.keys(trackers), SPACER_ITEM];
    }, [trackers, isCurrentWeek, isAddingTracker]);

    const addNewTrackerButton = (
        <IconButton
            borderRadius="full"
            bg="black:alpha.20"
            _pressed={{
                bg: 'black:alpha.25',
            }}
            _icon={{
                as: FontAwesome5,
                name: 'plus',
                color: 'white',
                textAlign: 'center',
            }}
            onPress={() => setIsAddingTracker(true)}
            disabled={isAddingTracker || !!editingTrackerId || !isCurrentWeek}
        />
    );

    const renderItem = ({ item }: ({ item: string })) => {
        switch (item) {
        case ADD_BUTTON_ITEM:
            return addNewTrackerButton;
        case NEW_TRACKER_ITEM:
            return (
                <WeekTrackerWithContext
                    key={`week_${weekStart.valueOf()}_${item}`}
                    value={{ weekStart, trackerId: '' }}
                    isNew={true}
                />
            );
        case SPACER_ITEM:
            return (<Box h={170} />);
        default:
            return (
                <WeekTrackerWithContext
                    key={`week_${weekStart.valueOf()}_${item}`}
                    value={{ weekStart, trackerId: item }}
                    isNew={false}
                />
            );
        }
    };

    return (
        <FlatList
            style={{ paddingHorizontal: 2 * UNIT_PX }}
            data={dataItems}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default WeekDataList;

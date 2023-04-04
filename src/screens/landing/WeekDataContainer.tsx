import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Button, FlatList, Icon, IconButton } from 'native-base';
import React from 'react';
import SettingsActionSheet from '../../components/SettingsActionSheet';
import useUserStore from '../../stores/userStore';

import WeekData from './WeekData';
import type moment from 'moment';

interface WeekDataContainerProps {
    weekStart: moment.Moment;
    isCurrentWeek: boolean;
}

const ADD_BUTTON_ITEM = 'ADD_BUTTON';
const SETTINGS_BUTTON_ITEM = 'SETTINGS_BUTTON';
const NEW_TRACKER_ITEM = 'NEW_TRACKER_ITEM';

const WeekDataContainer = ({ weekStart, isCurrentWeek }: WeekDataContainerProps) => {
    const { trackers, isAddingTracker, setIsAddingTracker } = useUserStore();

    const [showSettingsActionSheet, setShowSettingsActionSheet] = React.useState<boolean>(false);

    const dataItems: string[] = React.useMemo(() => {
        if (isCurrentWeek) {
            return [
                ...Object.keys(trackers),
                isAddingTracker ? NEW_TRACKER_ITEM : ADD_BUTTON_ITEM ,
                SETTINGS_BUTTON_ITEM
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

    const settingsButton = (
        <Button
            leftIcon={<Icon as={MaterialIcons} name="settings" />}
            variant='link'
            marginY={5}
            _text={{
                color: 'white'
            }}
            _icon={{
                color: 'white'
            }}
            onPress={() => setShowSettingsActionSheet(true)}
        >
            Settings
        </Button>
    );

    const renderItem = ({ item }: ({ item: string})) => {
        switch (item) {
        case ADD_BUTTON_ITEM:
            return addNewTrackerButton;
        case SETTINGS_BUTTON_ITEM:
            return settingsButton;
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
        <>
            <FlatList
                paddingX={2}
                data={dataItems}
                renderItem={renderItem}
            />
            {/*<AddTrackerModal*/}
            {/*    isOpen={showAddTrackerModal}*/}
            {/*    onClose={() => setShowAddTrackerModal(false)}*/}
            {/*/>*/}
            <SettingsActionSheet
                isOpen={showSettingsActionSheet}
                onClose={() => setShowSettingsActionSheet(false)}
            />
        </>
    );
};

export default WeekDataContainer;
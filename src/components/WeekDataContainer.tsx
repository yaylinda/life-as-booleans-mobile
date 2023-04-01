import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Button, FlatList, Icon, IconButton } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';
import AddTrackerModal from './AddTrackerModal';
import SettingsActionSheet from './SettingsActionSheet';
import WeekData from './WeekData';
import type moment from 'moment';

interface WeekDataContainerProps {
    weekStart: moment.Moment;
    isCurrentWeek: boolean;
}

const ADD_BUTTON_ITEM = 'ADD_BUTTON';
const SETTINGS_BUTTON_ITEM = 'SETTINGS_BUTTON';

const WeekDataContainer = ({ weekStart, isCurrentWeek }: WeekDataContainerProps) => {
    const { trackers } = useUserStore();

    const [showAddTrackerModal, setShowAddTrackerModal] = React.useState<boolean>(false);
    const [showSettingsActionSheet, setShowSettingsActionSheet] = React.useState<boolean>(false);

    const dataItems = React.useMemo(() => {
        if (isCurrentWeek) {
            return [...trackers, ADD_BUTTON_ITEM, SETTINGS_BUTTON_ITEM];
        }
        return trackers;
    }, [trackers, isCurrentWeek]);

    return (
        <>
            <FlatList
                paddingX={2}
                data={dataItems}
                renderItem={({ item }) => (
                    item === ADD_BUTTON_ITEM ? (
                        <IconButton
                            borderRadius="full"
                            bg="coolGray.50:alpha.20"
                            _pressed={{
                                bg: 'coolGray.50:alpha.30'
                            }}
                            _icon={{
                                as: FontAwesome,
                                name: 'plus',
                                color: 'coolGray.50'
                            }}
                            onPress={() => setShowAddTrackerModal(true)}
                        />
                    ) : item === SETTINGS_BUTTON_ITEM ? (
                        <Button
                            leftIcon={<Icon as={MaterialIcons} name="settings" />}
                            variant='link'
                            marginY={5}
                            _text={{
                                color: 'coolGray.50'
                            }}
                            _icon={{
                                color: 'coolGray.50'
                            }}
                            onPress={() => setShowSettingsActionSheet(true)}
                        >
                            Settings
                        </Button>
                    ) : (
                        <WeekData
                            key={`week_${weekStart.valueOf()}_${item}`}
                            weekStart={weekStart}
                            tracker={item}
                        />
                    )
                )}
            />
            <AddTrackerModal
                isOpen={showAddTrackerModal}
                onClose={() => setShowAddTrackerModal(false)}
            />
            <SettingsActionSheet
                isOpen={showSettingsActionSheet}
                onClose={() => setShowSettingsActionSheet(false)}
            />
        </>
    );
};

export default WeekDataContainer;

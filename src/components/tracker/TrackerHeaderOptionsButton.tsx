import { FontAwesome5 } from '@expo/vector-icons';
import { IconButton } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import useUserStore from '../../stores/userStore';
import { PRESSED_BG_WHITE } from '../../styles';
import TrackerHeaderOptionsPopover from './TrackerHeaderOptionsPopover';
import { useTrackerContext } from './useTrackerContext';
import type { PopoverTriggerProps } from '../../types';

const TrackerHeaderOptionsButton = () => {

    const { tracker } = useTrackerContext();

    const {
        deleteTracker,
        openEditTrackerDialog,
    } = useUserStore();

    const [openPopover, setOpenPopover] = React.useState<boolean>(false);

    const onEditName = () => {
        openEditTrackerDialog(tracker.id, tracker.displayName);
        setOpenPopover(false);
    };

    const onDeleteTracker = () => {
        setOpenPopover(false);
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this tracker and all the associated data? This action cannot be undone.', [
                {
                    text: 'Cancel',
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onPress: () => {
                    },
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => deleteTracker(tracker.id),
                    style: 'destructive',
                },
            ]);
    };

    const trackerOptionsButton = (triggerProps: PopoverTriggerProps): JSX.Element => (
        <IconButton
            {...triggerProps}
            size="sm"
            borderRadius="full"
            padding={1.5}
            _pressed={{
                bg: PRESSED_BG_WHITE,
            }}
            _icon={{
                as: FontAwesome5,
                name: 'ellipsis-v',
                color: 'white',
                textAlign: 'center',
            }}
            onPress={() => setOpenPopover(true)}
        />
    );

    return (
        <>
            {trackerOptionsButton}

            <TrackerHeaderOptionsPopover
                isOpen={openPopover}
                trigger={trackerOptionsButton}
                onClose={() => setOpenPopover(false)}
                onDelete={onDeleteTracker}
                onEdit={onEditName}
            />
        </>
    );
};

export default TrackerHeaderOptionsButton;

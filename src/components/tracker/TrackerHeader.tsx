import { FontAwesome5 } from '@expo/vector-icons';
import { Heading, HStack, IconButton } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import useUserStore from '../../stores/userStore';
import TrackerHeaderOptionsPopover from './TrackerHeaderOptionsPopover';
import { useTracker } from './useTracker';
import type { PopoverTriggerProps } from '../../types';

const TrackerHeader = () => {

    const { tracker } = useTracker();

    const {
        deleteTracker,
        setEditingTrackerId,
    } = useUserStore();

    const [openPopover, setOpenPopover] = React.useState<boolean>(false);

    const onEditName = () => {
        setEditingTrackerId(tracker!.id);
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
                    onPress: () => deleteTracker(tracker!.id),
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
                bg: 'white:alpha.10',
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
        <HStack>
            <Heading>{tracker.emoji} {tracker.displayName}</Heading>
            {trackerOptionsButton}
            <TrackerHeaderOptionsPopover
                isOpen={openPopover}
                trigger={trackerOptionsButton}
                onClose={() => setOpenPopover(false)}
                onDelete={onDeleteTracker}
                onEdit={onEditName}
            />
        </HStack>
    );
};

export default TrackerHeader;

import { FontAwesome5 } from '@expo/vector-icons';
import invariant from 'invariant';
import { Button, HStack, Icon, IconButton, Input, Popover, Text } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import useUserStore from '../../stores/userStore';
import { PopoverTriggerProps } from '../../types';
import type { Tracker } from '../../types';
import WeekDataHeaderOptionsPopover from './WeekDataHeaderOptionsPopover';

interface WeekDataHeaderProps {
    isNew: boolean;
    tracker: Tracker | null;
}

const WeekDataHeader = ({ isNew, tracker }: WeekDataHeaderProps) => {

    invariant(
        isNew || tracker !== null,
        'A Tracker object must be given, unless creating a new Tracker',
    );

    const {
        editingTrackerId,
        setIsAddingTracker,
        addTracker,
        setEditingTrackerId,
        deleteTracker,
        updateTracker,
    } = useUserStore();

    const isEditing = editingTrackerId === tracker?.id;

    invariant(
        !(isNew && isEditing),
        'isNew and isEditing cannot both be true',
    );

    const trackerName = tracker?.displayName || '';

    const [newTrackerName, setNewTrackerName] = React.useState<string>(trackerName);

    const [openPopover, setOpenPopover] = React.useState<boolean>(false);

    const onEditName = () => {
        setNewTrackerName('');
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

    const cancelAddOrEdit = () => {
        setIsAddingTracker(false);
        setEditingTrackerId('');
    };

    const saveAddOrEdit = () => {
        if (isNew) {
            addTracker(newTrackerName);
        } else if (isEditing) {
            updateTracker(newTrackerName);
        }
    };

    const newOrEditingTrackerActions = (
        <HStack space={2}>
            <IconButton
                size="sm"
                borderRadius="full"
                padding={1.5}
                _pressed={{
                    bg: 'white:alpha.10',
                }}
                _icon={{
                    as: FontAwesome5,
                    name: 'trash',
                    color: 'white',
                    textAlign: 'center',
                }}
                onPress={cancelAddOrEdit}
            />
            <IconButton
                size="sm"
                borderRadius="full"
                padding={1.5}
                _pressed={{
                    bg: 'white:alpha.10',
                }}
                _icon={{
                    as: FontAwesome5,
                    name: 'save',
                    color: 'white',
                    textAlign: 'center',
                }}
                onPress={saveAddOrEdit}
                disabled={!newTrackerName}
            />
        </HStack>
    );

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

    if (isNew || isEditing) {
        return (
            <Input
                placeholder="New Tracker Name"
                value={newTrackerName}
                onChangeText={setNewTrackerName}
                InputRightElement={newOrEditingTrackerActions}
                px={0}
                py={0}
                size="xl"
                fontWeight="bold"
                lineHeight="lg"
                variant="unstyled"
                color="white"
                borderColor="gray.200"
                placeholderTextColor="gray.200"
                _focus={{
                    borderColor: 'white',
                }}
            />
        );
    }

    return (
        <HStack justifyContent="space-between">
            <Text
                textTransform="capitalize"
                fontWeight="bold"
                fontSize="lg"
            >
                {trackerName}
            </Text>
            {trackerOptionsButton}
            <WeekDataHeaderOptionsPopover
                isOpen={openPopover}
                isDefaultTracker={!!tracker?.isDefaultTracker}
                trigger={trackerOptionsButton}
                onClose={() => setOpenPopover(false)}
                onDelete={onDeleteTracker}
                onEdit={onEditName}
            />
        </HStack>
    );
};

export default WeekDataHeader;

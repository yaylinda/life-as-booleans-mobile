import { FontAwesome5 } from '@expo/vector-icons';
import invariant from 'invariant';
import { Button, HStack, Icon, IconButton, Input, Popover, Text } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import useUserStore from '../../stores/userStore';
import type { Tracker } from '../../types';

interface WeekDataHeaderProps {
    isNew: boolean;
    tracker: Tracker | null;
}

const WeekDataHeader = ({ isNew, tracker }: WeekDataHeaderProps) => {

    invariant(
        isNew || tracker !== null,
        'A Tracker object must be given, unless creating a new Tracker'
    );

    const { setIsAddingTracker, addTracker, setEditingTrackerId, deleteTracker } = useUserStore();

    const trackerName = tracker?.displayName || '';

    const [newTrackerName, setNewTrackerName] = React.useState<string>(trackerName);

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
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => deleteTracker(tracker!.id),
                    style: 'destructive'
                }
            ]);
    };

    const newTrackerActions = (
        <HStack space={2}>
            <IconButton
                size="sm"
                borderRadius="full"
                padding={1.5}
                _pressed={{
                    bg: 'white:alpha.10'
                }}
                _icon={{
                    as: FontAwesome5,
                    name: 'trash',
                    color: 'white',
                    textAlign: 'center'
                }}
                onPress={() => setIsAddingTracker(false)}
            />
            <IconButton
                size="sm"
                borderRadius="full"
                padding={1.5}
                _pressed={{
                    bg: 'white:alpha.10'
                }}
                _icon={{
                    as: FontAwesome5,
                    name: 'save',
                    color: 'white',
                    textAlign: 'center'
                }}
                onPress={() => addTracker(newTrackerName)}
                disabled={!newTrackerName}
            />
        </HStack>
    );

    const editTrackerButton = (triggerProps: { _props: never, state: { open: boolean } }) => (
        <IconButton
            {...triggerProps}
            size="sm"
            borderRadius="full"
            padding={1.5}
            _pressed={{
                bg: 'white:alpha.10'
            }}
            _icon={{
                as: FontAwesome5,
                name: 'ellipsis-v',
                color: 'white',
                textAlign: 'center'
            }}
            onPress={() => setOpenPopover(true)}
        />
    );

    if (isNew) {
        return (
            <Input
                placeholder="New Tracker Name"
                value={newTrackerName}
                onChangeText={setNewTrackerName}
                InputRightElement={newTrackerActions}
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
                    borderColor: 'white'
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
            {editTrackerButton}
            <Popover
                isOpen={openPopover}
                onClose={() => setOpenPopover(false)}
                trigger={editTrackerButton}
            >
                <Popover.Content>
                    <Popover.Arrow />
                    <Popover.Body padding={0}>
                        <Button
                            variant="ghost"
                            leftIcon={<Icon as={FontAwesome5} name="edit" size="sm" />}
                            justifyContent="flex-start"
                            onPress={onEditName}
                        >
                            Edit Name
                        </Button>
                        <Button
                            variant="ghost"
                            leftIcon={<Icon as={FontAwesome5} name="trash" size="sm" />}
                            justifyContent="flex-start"
                            onPress={onDeleteTracker}
                        >
                            Delete
                        </Button>
                    </Popover.Body>
                </Popover.Content>
            </Popover>
        </HStack>
    );
};

export default WeekDataHeader;

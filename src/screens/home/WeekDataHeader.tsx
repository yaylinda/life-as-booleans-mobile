import { FontAwesome5 } from '@expo/vector-icons';
import invariant from 'invariant';
import { Button, HStack, Icon, IconButton, Input, Popover, Text } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import useUserStore from '../../stores/userStore';
import { useWeekTracker } from './useWeekTracker';
import type { PopoverTriggerProps } from '../../types';

interface WeekDataHeaderOptionsPopoverProps {
    isOpen: boolean;
    trigger: (triggerProps: PopoverTriggerProps) => JSX.Element;
    onClose: () => void;
    onDelete: () => void;
    onEdit: () => void;
}

const WeekDataHeaderOptionsPopover = ({
    isOpen,
    trigger,
    onClose,
    onDelete,
    onEdit,
}: WeekDataHeaderOptionsPopoverProps) => {

    const { tracker, weekStart } = useWeekTracker();

    invariant(tracker, 'Tracker must not be null to have options');

    const isDefaultTracker = tracker.isDefaultTracker;

    const { setYearViewData } = useUserStore();

    const openYearView = () => {
        onClose();
        setYearViewData({
            tracker: tracker,
            year: weekStart.year(),
        });
    };

    return (
        <Popover
            isOpen={isOpen}
            onClose={onClose}
            trigger={trigger}
        >
            <Popover.Content>
                <Popover.Arrow />
                <Popover.Body padding={0} paddingTop={2} paddingBottom={1}>
                    <Button
                        size="sm"
                        variant="ghost"
                        leftIcon={<Icon as={FontAwesome5} name="table" size="sm" />}
                        justifyContent="flex-start"
                        onPress={openYearView}
                        _pressed={{
                            bg: 'white:alpha.10',
                        }}
                        _text={{
                            color: 'white',
                        }}
                        _icon={{
                            color: 'white',
                        }}
                    >
                        Show Year View
                    </Button>
                    {!isDefaultTracker && (
                        <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FontAwesome5} name="edit" size="sm" />}
                            justifyContent="flex-start"
                            onPress={onEdit}
                            _pressed={{
                                bg: 'white:alpha.10',
                            }}
                            _text={{
                                color: 'white',
                            }}
                            _icon={{
                                color: 'white',
                            }}
                        >
                            Edit Name
                        </Button>
                    )}
                    {!isDefaultTracker && (
                        <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FontAwesome5} name="trash" size="sm" />}
                            justifyContent="flex-start"
                            onPress={onDelete}
                            _pressed={{
                                bg: 'white:alpha.10',
                            }}
                            _text={{
                                color: 'white',
                            }}
                            _icon={{
                                color: 'white',
                            }}
                        >
                            Delete
                        </Button>
                    )}
                </Popover.Body>
            </Popover.Content>
        </Popover>
    );
};

interface WeekDataHeaderProps {
    isNew: boolean;
}

const WeekDataHeader = ({ isNew }: WeekDataHeaderProps) => {

    const { tracker } = useWeekTracker();

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
                trigger={trackerOptionsButton}
                onClose={() => setOpenPopover(false)}
                onDelete={onDeleteTracker}
                onEdit={onEditName}
            />
        </HStack>
    );
};

export default WeekDataHeader;

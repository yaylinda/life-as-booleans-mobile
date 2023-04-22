import { FontAwesome5 } from '@expo/vector-icons';
import { HStack, IconButton } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import useUserStore from '../../stores/userStore';
import { PRESSED_BG_BLACK } from '../../styles';
import { useTrackerContext } from './useTrackerContext';

interface TrackerOptionsRowProps {
    closeOptions: () => void;
}

const TrackerOptionsRow = ({ closeOptions }: TrackerOptionsRowProps) => {

    const { tracker } = useTrackerContext();

    const {deleteTracker, openEditTrackerDialog} = useUserStore();

    const onEditName = () => {
        openEditTrackerDialog(tracker.id, tracker.displayName);
    };

    const onDeleteTracker = () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this tracker and all the associated data? This action cannot be undone.', [
                {
                    text: 'Cancel',
                    onPress: () => {
                        closeOptions();
                    },
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        deleteTracker(tracker.id);
                        // closeOptions();
                    },
                    style: 'destructive',
                },
            ]);
    };

    return (
        <HStack space={2} alignItems='center' height='full'>
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome5,
                    name: 'edit',
                    color: 'white',
                    textAlign: 'center',
                }}
                _pressed={{
                    bg: PRESSED_BG_BLACK,
                }}
                onPress={onEditName}
            />
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome5,
                    name: 'trash',
                    color: 'white',
                    textAlign: 'center',
                }}
                _pressed={{
                    bg: PRESSED_BG_BLACK,
                }}
                onPress={onDeleteTracker}
            />
        </HStack>
    );
};

export default TrackerOptionsRow;
import { FontAwesome5 } from '@expo/vector-icons';
import invariant from 'invariant';
import { HStack, IconButton, Input, Text } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import type { Tracker } from '../../types';

interface WeekDataHeaderProps {
    isNew: boolean;
    tracker: Tracker | null;
}

const WeekDataHeader = ({ isNew, tracker }: WeekDataHeaderProps) => {

    invariant(isNew || tracker !== null, 'A Tracker object must be given, unless creating a new Tracker');

    const { setIsAddingTracker, addTracker } = useUserStore();

    const trackerName = tracker?.displayName || '';

    const [newTrackerName, setNewTrackerName] = React.useState<string>(trackerName);

    const newTrackerActions = (
        <HStack space={2}>
            <IconButton
                borderRadius="full"
                padding={1}
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
                borderRadius="full"
                padding={1}
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
            <IconButton
                borderRadius="full"
                padding={1}
                _pressed={{
                    bg: 'white:alpha.10'
                }}
                _icon={{
                    as: FontAwesome5,
                    name: 'info-circle',
                    color: 'white',
                    textAlign: 'center'
                }}
                // onPress={() => {}}
            />
        </HStack>
    );
};

export default WeekDataHeader;

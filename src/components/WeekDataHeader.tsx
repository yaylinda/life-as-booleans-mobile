import { FontAwesome } from '@expo/vector-icons';
import { HStack, IconButton, Input, Text } from 'native-base';
import React from 'react';

interface WeekDataHeaderProps {
    isNew: boolean;
    trackerName: string;
    updateTrackerName: (value: string) => void;
}

const WeekDataHeader = ({isNew, trackerName, updateTrackerName}: WeekDataHeaderProps) => {

    const newTrackerActions = (
        <HStack space={2}>
            <IconButton
                borderRadius="full"
                padding={1}
                _pressed={{
                    bg: 'white:alpha.10'
                }}
                _icon={{
                    as: FontAwesome,
                    name: 'trash',
                    color: 'white',
                    textAlign: 'center'
                }}
                // onPress={() => setAddingNewTracker(true)}
            />
            <IconButton
                borderRadius="full"
                padding={1}
                _pressed={{
                    bg: 'white:alpha.10'
                }}
                _icon={{
                    as: FontAwesome,
                    name: 'save',
                    color: 'white',
                    textAlign: 'center'
                }}
                // onPress={() => setAddingNewTracker(true)}
            />
        </HStack>
    );

    if (isNew) {
        return (
            <Input
                placeholder="New Tracker Name"
                value={trackerName}
                onChangeText={updateTrackerName}
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
        <HStack justifyContent='space-between'>
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
                    as: FontAwesome,
                    name: 'edit',
                    color: 'white',
                    textAlign: 'center'
                }}
                // onPress={() => setAddingNewTracker(true)}
            />
        </HStack>
    );
};

export default WeekDataHeader;

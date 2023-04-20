import { HStack, Text } from 'native-base';
import React from 'react';
import TrackerHeaderOptionsButton from './TrackerHeaderOptionsButton';
import { useTrackerContext } from './useTrackerContext';

const TrackerHeader = () => {

    const { tracker } = useTrackerContext();

    return (
        <HStack alignItems="center" justifyContent="space-between">
            <Text
                isTruncated w="80%"
                fontSize="lg"
                fontWeight="bold"
            >
                {tracker.displayName}
            </Text>

            <TrackerHeaderOptionsButton />
        </HStack>
    );
};

export default TrackerHeader;

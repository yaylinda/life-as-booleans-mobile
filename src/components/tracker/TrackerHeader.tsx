import { HStack, Text } from 'native-base';
import React from 'react';

import { useTrackerContext } from './useTrackerContext';

const TrackerHeader = () => {

    const { tracker } = useTrackerContext();

    return (
        <HStack flex={2.5} space={2} alignItems="center">
            <Text
                fontSize="md"
                fontWeight="bold"
            >
                {tracker.emoji}
            </Text>
            <Text
                fontSize="md"
                fontWeight="bold"
                isTruncated
            >
                {tracker.displayName}
            </Text>
        </HStack>
    );
};

export default TrackerHeader;

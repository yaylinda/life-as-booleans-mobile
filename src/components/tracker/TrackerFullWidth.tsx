import { Divider, VStack } from 'native-base';
import React from 'react';
import { BG } from '../../styles';
import { withContext } from '../../withContext';
import { TrackerProvider } from './TrackerContext';
import TrackerHeader from './TrackerHeader';
import TrackerValueSelection from './TrackerValueSelection';


const TrackerFullWidth = () => {
    return (
        <VStack
            padding={2}
            paddingTop={3}
            space={2}
            bg={BG}
            borderRadius="xl"
        >
            <TrackerHeader />
            <Divider />
            <TrackerValueSelection />
        </VStack>
    );
};

export default withContext(TrackerFullWidth, TrackerProvider);
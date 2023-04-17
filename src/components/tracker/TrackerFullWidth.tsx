import { Divider, VStack } from 'native-base';
import React from 'react';
import { withContext } from '../../withContext';
import { TrackerProvider } from './TrackerContext';
import TrackerHeader from './TrackerHeader';
import TrackerValueSelection from './TrackerValueSelection';


const TrackerFullWidth = () => {
    return (
        <VStack>
            <TrackerHeader />
            <Divider />
            <TrackerValueSelection />
        </VStack>
    );
};

export default withContext(TrackerFullWidth, TrackerProvider);
import moment from 'moment';
import { Heading, HStack, ScrollView } from 'native-base';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { EMPTY_TRACKER } from '../../utilities';
import YearTrackerDataGrid from './YearTrackerDataGrid';
import type { Tracker } from '../../types';

const SummaryScreen = () => {

    const [tracker] = React.useState<Tracker>(EMPTY_TRACKER('blah'));

    return (
        <ScreenWrapper>
            <HStack justifyContent="center">
                <Heading>Summary</Heading>
            </HStack>
            <ScrollView>
                <YearTrackerDataGrid tracker={tracker} year={moment().year()} />
            </ScrollView>
        </ScreenWrapper>
    );
};
export default SummaryScreen;

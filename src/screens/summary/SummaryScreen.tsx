import moment from 'moment';
import { Heading, HStack, IconButton, ScrollView } from 'native-base';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { EMPTY_TRACKER } from '../../utilities';
import YearTrackerDataGrid from '../home/YearTrackerDataGrid';
import type { Tracker } from '../../types';

const HEADER_SPACER = (
    <IconButton
        borderRadius="full"
        _pressed={{
            bg: undefined
        }}
    />
);

const SummaryScreen = () => {

    const [tracker] = React.useState<Tracker>(EMPTY_TRACKER('blah'));

    return (
        <ScreenWrapper>
            <HStack justifyContent="space-between" alignItems="center">
                {HEADER_SPACER}
                <Heading>Summary</Heading>
                {HEADER_SPACER}
            </HStack>
            <ScrollView>
                <YearTrackerDataGrid tracker={tracker} year={moment().year()} />
            </ScrollView>
        </ScreenWrapper>
    );
};
export default SummaryScreen;

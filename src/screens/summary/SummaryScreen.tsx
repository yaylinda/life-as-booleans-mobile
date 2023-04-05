import moment from 'moment';
import { ScrollView, VStack } from 'native-base';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { EMPTY_TRACKER } from '../../utilities';
import SummaryScreenHeader from './SummaryScreenHeader';
import YearTrackerDataGrid from './YearTrackerDataGrid';
import type { Tracker } from '../../types';

const SummaryScreen = () => {

    const [tracker, ] = React.useState<Tracker>(EMPTY_TRACKER('blah'));

    return (
        <ScreenWrapper>
            <VStack space={2} paddingX={2}>
                <SummaryScreenHeader />
                <ScrollView>
                    <YearTrackerDataGrid tracker={tracker} year={moment().year()} />
                </ScrollView>
            </VStack>
        </ScreenWrapper>
    );
};
export default SummaryScreen;

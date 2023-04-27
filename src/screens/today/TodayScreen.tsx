import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import AddOrEditTrackerDialog from '../../components/tracker/AddOrEditTrackerDialog';

import TodayScreenContent from './TodayScreenContent';
import TodayScreenHeader from './TodayScreenHeader';

const TodayScreen = () => {
    return (
        <ScreenWrapper
            header={
                <TodayScreenHeader />
            }
            content={
                <TodayScreenContent />
            }
            dialogs={
                <AddOrEditTrackerDialog />
            }
        />
    );
};

export default TodayScreen;
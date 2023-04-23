
import { Pressable } from 'native-base';
import React from 'react';
import { EventRegister } from 'react-native-event-listeners';
import ScreenWrapper from '../../components/ScreenWrapper';
import AddOrEditTrackerDialog from '../../components/tracker/AddOrEditTrackerDialog';
import { Events } from '../../events';

import TodayScreenContent from './TodayScreenContent';
import TodayScreenHeader from './TodayScreenHeader';

const TodayScreen = () => {

    return (
        <Pressable
            onPressIn={
                () => {
                    EventRegister.emit(Events.CLOSE_TRACKER_OPTIONS);
                }
            }
        >
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
        </Pressable>
    );
};

export default TodayScreen;
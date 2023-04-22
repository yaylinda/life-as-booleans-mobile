import { FontAwesome5 } from '@expo/vector-icons';
import { IconButton } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import { PRESSED_BG_BLACK } from '../../styles';
import { useTrackerContext } from './useTrackerContext';

const TrackerYearViewButton = () => {

    const { tracker, date } = useTrackerContext();

    const {setYearViewData} = useUserStore();

    const openYearView = () => {
        setYearViewData({
            tracker: tracker,
            year: date.year(),
        });
    };

    return (
        <IconButton
            borderRadius="full"
            _icon={{
                as: FontAwesome5,
                name: 'table',
                color: 'white',
                textAlign: 'center',
            }}
            _pressed={{
                bg: PRESSED_BG_BLACK,
            }}
            onPress={openYearView}
        />
    );
};

export default TrackerYearViewButton;
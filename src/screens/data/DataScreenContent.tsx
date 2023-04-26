import React from 'react';
import Animated from 'react-native-reanimated';
import MonthView from '../../components/month/MonthView';
import WeekView from '../../components/week/WeekView';
import { UNIT_PX } from '../../styles';

const DataScreenContent = () => {
    return (
        <Animated.View style={{ padding: 2 * UNIT_PX, gap: 4 * UNIT_PX }}>
            <WeekView />
            <MonthView />
        </Animated.View>
    );
};

export default DataScreenContent;
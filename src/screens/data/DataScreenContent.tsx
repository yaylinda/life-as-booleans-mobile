import { Divider, Text, VStack } from 'native-base';
import React from 'react';
import WeekView from '../../components/week/WeekView';
import YearView from '../../components/year/YearView';
import useDataScreenStore from './dataScreenStore';

const DataScreenContent = () => {
    return (
        <>
            <VStack>
                <WeekView />
            </VStack>
        </>
    );
};

export default DataScreenContent;
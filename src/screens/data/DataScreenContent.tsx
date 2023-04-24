import {   VStack } from 'native-base';
import React from 'react';
import MonthView from '../../components/month/MonthView';
import WeekView from '../../components/week/WeekView';



const DataScreenContent = () => {
    return (
        <>
            <VStack padding={2} space={4}>
                <WeekView />
                <MonthView />
            </VStack>
        </>
    );
};

export default DataScreenContent;
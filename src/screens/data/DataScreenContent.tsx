import {   VStack } from 'native-base';
import React from 'react';
import WeekView from '../../components/week/WeekView';



const DataScreenContent = () => {
    return (
        <>
            <VStack padding={2}>
                <WeekView />
            </VStack>
        </>
    );
};

export default DataScreenContent;
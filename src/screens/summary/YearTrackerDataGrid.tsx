import moment from 'moment';
import {   Center,  HStack, Text, VStack } from 'native-base';
import React from 'react';

import type { Tracker } from '../../types';

const MAX_DAYS_IN_MONTH = 31;

const NUM_MONTHS = 12;

const CELL_GAP = 1;

const CELL_SIZE = 16;

interface DayTrackerDataCellProps {
    dIndex: number;
    mIndex: number;
}

const DayTrackerDataCell = ({ dIndex, mIndex }: DayTrackerDataCellProps) => {

    const renderContent = () => {
        if (dIndex === 0 && mIndex === 0) {
            return null;
        }

        if (dIndex === 0 && mIndex > 0) {
            return <Text fontSize="2xs" fontWeight='black'>{moment().month(mIndex - 1).format('MMM')[0]}</Text>;
        }

        if (dIndex > 0 && mIndex === 0) {
            return <Text fontSize="2xs" fontWeight='black'>{dIndex}</Text>;
        }
    };

    return (
        <Center w={`${CELL_SIZE}px`} h={`${CELL_SIZE}px`} bg='black:alpha.20'>
            {renderContent()}
        </Center>
    );
};

interface YearTrackerDataGridProps {
    tracker: Tracker;
    year: number;
}

const YearTrackerDataGrid = ({ tracker  }: YearTrackerDataGridProps) => {
    return (
        <VStack space={CELL_GAP}>
            {(new Array(MAX_DAYS_IN_MONTH + 1).fill(0)).map((_, d) => (
                <HStack key={`${tracker.id}_${d}`} space={CELL_GAP} justifyContent='center'>
                    {(new Array(NUM_MONTHS + 1).fill(0)).map((_, m) => (
                        <DayTrackerDataCell
                            key={`d${d}_m${m}`}
                            dIndex={d}
                            mIndex={m}
                        />
                    ))}
                </HStack>
            ))}
        </VStack>
    );
};

export default YearTrackerDataGrid;
import moment from 'moment';
import { Box, HStack, VStack } from 'native-base';
import React from 'react';
import type { Tracker } from '../../types';

const MAX_DAYS_IN_MONTH = 31;

const NUM_MONTHS = 12;

interface DayTrackerDataCellProps {
    /**
     * Starts from 1
     */
    dayOfMonth: number;
    /**
     * Starts from 0
     */
    monthNum: number;
    year: number;
}

const DayTrackerDataCell = ({ dayOfMonth, monthNum, year }: DayTrackerDataCellProps) => {
    const dateEpoch = moment([year, monthNum, dayOfMonth]).valueOf();

    return (
        <Box style={{ 'backgroundColor': 'gray.700'}} />
    );
};

interface YearTrackerDataGridProps {
    tracker: Tracker;
    year: number;
}

const YearTrackerDataGrid = ({ tracker, year }: YearTrackerDataGridProps) => {

    return (
        <VStack>
            {
                (new Array(MAX_DAYS_IN_MONTH).fill(0))
                    .map((_, d) => (
                        <HStack key={`${tracker.id}_${d}`}>
                            {
                                (new Array(NUM_MONTHS).fill(0)).map((m) => (
                                    <DayTrackerDataCell key={`${tracker.id}_${d}_${m}`} dayOfMonth={d + 1} monthNum={m} year={year}/>
                                ))
                            }
                        </HStack>
                    ))
            }
        </VStack>
    );
};

export default YearTrackerDataGrid;
import moment from 'moment';
import { Center, HStack, Text, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';

import type { Tracker } from '../../types';

export const MAX_DAYS_IN_MONTH = 31;

export const NUM_MONTHS = 12;

export const CELL_GAP = 1;

export const CELL_GAP_PX = 4;

export const CELL_SIZE_PX = 16;

interface DayTrackerDataCellProps {
    tracker: Tracker;
    year: number;
    dIndex: number;
    mIndex: number;
}

const DayTrackerDataCell = ({ tracker, year, dIndex, mIndex }: DayTrackerDataCellProps) => {

    const dayEpoch = moment({ year: year, month: mIndex - 1, date: dIndex }).valueOf();
    const key = `${dayEpoch}_${tracker.id}`;

    const value: string | undefined = useUserStore((state) => state.data[key]);

    const color: string | undefined = tracker.valueOptionsMap[value]?.color;

    const bg = color ? `${color}` : 'black:alpha.20';

    const renderContent = () => {
        if (dIndex === 0 && mIndex === 0) {
            return null;
        }

        if (dIndex === 0 && mIndex > 0) {
            return <Text fontSize="2xs" fontWeight="black">{moment().month(mIndex - 1).format('MMM')[0]}</Text>;
        }

        if (dIndex > 0 && mIndex === 0) {
            return <Text fontSize="2xs" fontWeight="black">{dIndex}</Text>;
        }
    };

    return (
        <Center
            w={`${CELL_SIZE_PX}px`} h={`${CELL_SIZE_PX}px`}
            bg={bg}
            borderColor={value ? 'white' : undefined}
            borderWidth={value ? 2 : 0}
            borderRadius={4}
        >
            {renderContent()}
        </Center>
    );
};

interface YearTrackerDataGridProps {
    tracker: Tracker;
    year: number;
}

const YearTrackerDataGrid = ({ tracker, year }: YearTrackerDataGridProps) => {
    return (
        <VStack space={CELL_GAP}>
            {(new Array(MAX_DAYS_IN_MONTH + 1).fill(0)).map((_, d) => (
                <HStack key={`${tracker.id}_${d}`} space={CELL_GAP} justifyContent="center">
                    {(new Array(NUM_MONTHS + 1).fill(0)).map((_, m) => (
                        <DayTrackerDataCell
                            key={`d${d}_m${m}`}
                            tracker={tracker}
                            year={year}
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
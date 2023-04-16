import moment from 'moment';
import { Center, HStack, Pressable, Text, VStack } from 'native-base';
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
    row: number;
    column: number;
    selectedCoord: { row: number, column: number },
    onPress: () => void;
}

const DayTrackerDataCell = ({ tracker, year, row, column, selectedCoord, onPress }: DayTrackerDataCellProps) => {

    const dayEpoch = moment({ year: year, month: column - 1, date: row }).valueOf();

    const key = `${dayEpoch}_${tracker.id}`;

    const value: string | undefined = useUserStore((state) => state.data[key]);

    const color: string | undefined = tracker.valueOptionsMap[value]?.color;

    const bg = color ? `${color}` : 'black:alpha.20';

    const isSelectedRow = selectedCoord.row === row;

    const isSelectedColumn = selectedCoord.column === column;

    const renderContent = () => {
        if (row === 0 && column === 0) {
            return null;
        }

        if (row === 0 && column > 0) {
            return <Text fontSize="2xs" fontWeight="black">{moment().month(column - 1).format('MMM')[0]}</Text>;
        }

        if (row > 0 && column === 0) {
            return <Text fontSize="2xs" fontWeight="black">{row}</Text>;
        }
    };

    return (
        <Pressable
            bg={isSelectedRow || isSelectedColumn ? 'white:alpha.20' : undefined}
            padding={CELL_GAP/2}
            onPress={onPress}
        >
            <Center
                w={`${CELL_SIZE_PX}px`} h={`${CELL_SIZE_PX}px`}
                bg={bg}
                borderColor={value ? 'white' : undefined}
                borderWidth={value ? 2 : 0}
                borderRadius={4}
            >
                {renderContent()}
            </Center>
        </Pressable>
    );
};

interface YearTrackerDataGridProps {
    tracker: Tracker;
    year: number;
}

const YearTrackerDataGrid = ({ tracker, year }: YearTrackerDataGridProps) => {

    const [selectedCoord, setSelectedCoord] = React.useState({ row: -1, column: -1 });

    const onPressCell = (row: number, column: number) => {
        if (row === 0 || column === 0) {
            return;
        }

        setSelectedCoord((state) => {
            if (state.row === row && state.column === column) {
                return { row: -1, column: -1 };
            }
            return { row, column };
        });
    };

    return (
        <VStack>
            {(new Array(MAX_DAYS_IN_MONTH + 1).fill(0)).map((_, row) => (
                <HStack key={`${tracker.id}_${row}`} justifyContent="center">
                    {(new Array(NUM_MONTHS + 1).fill(0)).map((_, column) => (
                        <DayTrackerDataCell
                            key={`r${row}_c${column}_${selectedCoord}`}
                            tracker={tracker}
                            year={year}
                            row={row}
                            column={column}
                            selectedCoord={selectedCoord}
                            onPress={() => onPressCell(row, column)}
                        />
                    ))}
                </HStack>
            ))}
        </VStack>
    );
};

export default YearTrackerDataGrid;
import { HStack, VStack } from 'native-base';
import React from 'react';
import DayDataCell from './DayDataCell';

export const MAX_DAYS_IN_MONTH = 31;

export const NUM_MONTHS = 12;

export const CELL_GAP_PX = 4;

const YearDataGrid = () => {

    console.log('RENDER YearDataGrid');

    return (
        <VStack>
            {(new Array(MAX_DAYS_IN_MONTH + 1).fill(0)).map((_, row) => (
                <HStack key={`${row}`} justifyContent="center">
                    {(new Array(NUM_MONTHS + 1).fill(0)).map((_, column) => (
                        <DayDataCell
                            key={`r${row}_c${column}`}
                            row={row}
                            column={column}
                        />
                    ))}
                </HStack>
            ))}
        </VStack>
    );
};

export default YearDataGrid;
import { HStack, VStack } from 'native-base';
import React from 'react';
import YearViewDay from './YearViewDay';

export const MAX_DAYS_IN_MONTH = 31;

export const NUM_MONTHS = 12;

const YearView = () => {

    console.log('RENDER YearView');

    return (
        <VStack>
            {(new Array(MAX_DAYS_IN_MONTH + 1).fill(0)).map((_, row) => (
                <HStack key={`r_${row}`} justifyContent="center">
                    {(new Array(NUM_MONTHS + 1).fill(0)).map((_, column) => (
                        <YearViewDay
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

export default YearView;
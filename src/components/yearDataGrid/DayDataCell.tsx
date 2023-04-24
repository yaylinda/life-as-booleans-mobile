import moment from 'moment/moment';
import { Center, Pressable, Text } from 'native-base';
import React from 'react';
import useDataScreenStore from '../../screens/data/dataScreenStore';
import useUserStore from '../../stores/userStore';

export const CELL_SIZE_PX = 16;

export const CELL_GAP = 1;

interface DayDataCellProps {
    row: number;
    column: number;
}

const DayDataCell = ({ row, column }: DayDataCellProps) => {

    const { selectedCoord, setSelectedCoord, selectedTracker: tracker, year } = useDataScreenStore();

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
            padding={CELL_GAP / 2}
            onPress={() => setSelectedCoord(row, column)}
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

export default DayDataCell;
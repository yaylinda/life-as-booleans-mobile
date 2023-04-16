import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';
import { Actionsheet, Heading, HStack, IconButton, Text, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import YearTrackerDataGrid, { CELL_GAP_PX, CELL_SIZE_PX, NUM_MONTHS } from './YearTrackerDataGrid';
import type { Tracker } from '../../types';

interface YearDataActionSheetHeaderProps {
    tracker: Tracker;
    year: number;
}

const YearDataActionSheetHeader = ({ tracker, year }: YearDataActionSheetHeaderProps) => {

    const { nextYear, prevYear } = useUserStore();

    const isCurrentYear = year === moment().year();

    return (
        <HStack
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={4}
            space={2}
        >
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome5,
                    name: 'chevron-left',
                    color: 'white',
                    textAlign: 'center',
                }}
                _pressed={{
                    bg: 'black:alpha.20',
                }}
                onPress={prevYear}
                flexGrow={0}
            />
            <VStack
                alignItems="center"
                space={1}
                bg="black:alpha.20"
                borderRadius="lg"
                paddingY={1}
                width={(NUM_MONTHS + 1) * CELL_SIZE_PX + NUM_MONTHS * CELL_GAP_PX}
            >
                <Heading>{tracker.displayName}</Heading>
                <Text>{year}</Text>
            </VStack>
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome5,
                    name: 'chevron-right',
                    color: isCurrentYear ? 'white:alpha.20' : 'white',
                    textAlign: 'center',
                }}
                _pressed={{
                    bg: 'black:alpha.20',
                }}
                onPress={nextYear}
                disabled={isCurrentYear}
                flexGrow={0}
            />
        </HStack>
    );
};

const YearDataActionSheet = () => {

    const { yearViewData, gradientColors, setYearViewData } = useUserStore();

    const isOpen = !!yearViewData;

    const onClose = () => {
        setYearViewData(null);
    };

    const renderContent = () => {
        if (!yearViewData) {
            return null;
        }

        const { tracker, year } = yearViewData;

        return (
            <>
                <YearDataActionSheetHeader
                    tracker={tracker}
                    year={year}
                />
                <YearTrackerDataGrid
                    tracker={tracker}
                    year={year}
                />
            </>
        );
    };

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content
                bg={{
                    linearGradient: {
                        colors: [...gradientColors].reverse(),
                        start: [0, 0],
                        end: [0, 1],
                    },
                }}
            >
                {renderContent()}
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default YearDataActionSheet;

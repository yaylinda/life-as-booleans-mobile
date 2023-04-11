import { FontAwesome5 } from '@expo/vector-icons';
import { Actionsheet, Heading, HStack, IconButton, Text, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import YearTrackerDataGrid from './YearTrackerDataGrid';

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
                <HStack w='100%' justifyContent='space-between' alignItems='center' marginBottom={4}>
                    <IconButton
                        borderRadius="full"
                        _icon={{
                            as: FontAwesome5,
                            name: 'chevron-left',
                            color: 'white',
                            textAlign: 'center'
                        }}
                        _pressed={{
                            bg: 'white:alpha.10'
                        }}
                        flexGrow={0}
                    />
                    <VStack alignItems='center' space={1}>
                        <Heading>{tracker.displayName}</Heading>
                        <Text>{year}</Text>
                    </VStack>
                    <IconButton
                        borderRadius="full"
                        _icon={{
                            as: FontAwesome5,
                            name: 'chevron-right',
                            color: 'white',
                            textAlign: 'center'
                        }}
                        _pressed={{
                            bg: 'white:alpha.10'
                        }}
                        flexGrow={0}
                    />
                </HStack>

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

import moment from 'moment';
import { Divider, HStack, Input, Text, VStack } from 'native-base';
import React from 'react';
import useUserStore, { DEFAULT_TRACKERS } from '../stores/userStore';

import DayData from './DayData';
import { Tracker } from '../types';
import uuid from 'react-native-uuid';
import { produce } from 'immer';

const EMPTY_TRACKER = (): Tracker => ({
    id: uuid.v4() as string,
    displayName: '',
    emoji: '',
    valueOptionsMap: {
        yes: {
            value: 'yes',
            label: 'Yes',
            icon: 'check',
            color: 'green.500'
        },
        no: {
            value: 'no',
            label: 'No',
            icon: 'times',
            color: 'red.500'
        }
    },
    isNew: true
});

interface WeekDataProps {
    isNew: boolean;
    weekStart: moment.Moment;
    trackerId?: string;
}

const WeekData = ({ isNew, weekStart, trackerId }: WeekDataProps) => {
    const [tracker, setTracker] = React.useState<Tracker>((!isNew && trackerId)
        ? useUserStore((state) => state.trackers[trackerId])
        : EMPTY_TRACKER());

    const isDefaultTracker = (!isNew && trackerId) ? !!DEFAULT_TRACKERS[trackerId] : false;

    const dates: moment.Moment[] = React.useMemo(() => {
        const start = moment(weekStart).startOf('day');
        const end = start.clone().add(1, 'week').startOf('day');

        const dates: moment.Moment[] = [];
        while (start.isBefore(end)) {
            dates.push(start.clone());
            start.add(1, 'day');
        }

        return dates;
    }, [weekStart]);

    const updateTrackerField = (fieldName: string, value: string) => {
        setTracker((tracker) => produce(tracker, (draft) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            draft[fieldName] = value;
        }));
    };

    return (
        <VStack
            mb={4}
            padding={4}
            space={2}
            bg="white:alpha.20"
            borderRadius="3xl"
            // borderColor="white"
            // borderWidth={isNew ? 1 : 0}
        >
            {isNew ? (
                <Input
                    placeholder="New Tracker Name"
                    value={tracker.displayName}
                    onChangeText={(value) => updateTrackerField('displayName', value)}
                    // InputRightElement={submitButton}
                    px={0}
                    py={0}
                    size="xl"
                    fontWeight="bold"
                    lineHeight="lg"
                    variant="unstyled"
                    color="white"
                    borderColor="gray.200"
                    placeholderTextColor="gray.200"
                    _focus={{
                        borderColor: 'white'
                    }}
                />
            ) : (
                <Text
                    textTransform="capitalize"
                    fontWeight="bold"
                    fontSize="lg"
                >
                    {tracker.displayName}
                </Text>
            )}

            <Divider bg="white:alpha.50" />

            <HStack justifyContent="space-between">
                {dates.map((date) => (
                    <DayData
                        key={`day_${date.valueOf()}_${trackerId}`}
                        isDefaultTracker={isDefaultTracker}
                        date={date}
                        tracker={tracker}
                    />
                ))}
            </HStack>
        </VStack>
    );
};

export default WeekData;

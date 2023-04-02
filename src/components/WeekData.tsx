import { produce } from 'immer';

import moment from 'moment';
import { Divider, HStack,    VStack } from 'native-base';
import React from 'react';
import uuid from 'react-native-uuid';
import useUserStore, { DEFAULT_TRACKERS } from '../stores/userStore';

import DayData from './DayData';

import WeekDataHeader from './WeekDataHeader';
import type { Tracker } from '../types';

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
            <WeekDataHeader
                isNew={isNew}
                trackerName={tracker.displayName}
                updateTrackerName={(value) => updateTrackerField('displayName', value)}
            />

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

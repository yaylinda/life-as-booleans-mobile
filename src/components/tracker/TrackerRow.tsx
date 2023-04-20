import { HStack } from 'native-base';
import React from 'react';
import Tracker from './Tracker';
import type { Tracker as TrackerType } from '../../types';
import type moment from 'moment';

interface TrackerRow {
    rowIndex: number;
    date: moment.Moment;
    trackers: TrackerType[];
}

const TrackerRow = ({ rowIndex, date, trackers }: TrackerRow) => {
    return (
        <HStack space={2} flex={1} mb={2}>
            {trackers.map((tracker) => (
                <Tracker
                    key={`${tracker.id}_${date.valueOf()}`}
                    index={rowIndex}
                    value={{ tracker, date }}
                />
            ))}
        </HStack>
    );
};

export default TrackerRow;

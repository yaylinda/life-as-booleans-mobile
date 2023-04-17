import { HStack } from 'native-base';
import React from 'react';
import Tracker from './Tracker';
import type moment from 'moment';

interface TrackerRow {
    date: moment.Moment;
    trackerIds: string[];
}

const TrackerRow = ({ date, trackerIds }: TrackerRow) => {
    return (
        <HStack space={2} flex={1} mb={2}>
            {trackerIds.map((trackerId) => (
                <Tracker
                    key={`${trackerId}_${date.valueOf()}`}
                    value={{ trackerId, date }}
                />
            ))}
        </HStack>
    );
};

export default TrackerRow;

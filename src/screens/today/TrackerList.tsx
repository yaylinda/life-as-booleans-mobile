import moment from 'moment';
import { Button } from 'native-base';
import React from 'react';
import Animated from 'react-native-reanimated';
import Tracker from '../../components/tracker/Tracker';
import TrackerSingleLine from '../../components/tracker/TrackerSingleLine';
import { EMPTY_TRACKER } from '../../defaultTrackers';
import useUserStore from '../../stores/userStore';
import { UNIT_PX } from '../../styles';
import type { Tracker as TrackerType } from '../../types';

interface TrackerListProps {
    date: moment.Moment;
    // trackerIdRows: string[][];
}

interface IndexedTracker {
    index: number;
    tracker: TrackerType;
}

const TrackerList = ({ date }: TrackerListProps) => {

    const isToday = moment().isSame(date, 'day');

    const { trackers } = useUserStore();

    const indexedTrackers: IndexedTracker[] = React.useMemo(() => {
        const indexTrackers = Object.values(trackers)
            .map((tracker: TrackerType, index: number): IndexedTracker => ({
                index: index,
                tracker: tracker,
            }));

        return [
            ...indexTrackers,
            { tracker: EMPTY_TRACKER(''), index: -1 },
        ];
    }, [trackers]);

    const renderItem = ({ item }: ({ item: IndexedTracker })) => {
        const { index, tracker } = item;

        // first tracker in list will always be default mood tracker
        if (tracker.isDefaultTracker) {
            return (
                <Tracker
                    key={`${tracker.id}_${date.valueOf()}`}
                    index={index}
                    value={{ tracker, date }}
                />
            );
        }

        // render buttons - add, and today
        if ((index < 0) && (isToday)) {
            return (
                <Button>Add</Button>
            );
        } else if ((index < 0) && (!isToday)) {
            return (
                <Button>To to Day</Button>
            );
        }

        // render the other non-default trackers
        return (
            <TrackerSingleLine
                key={`${tracker.id}_${date.valueOf()}`}
                index={index}
                value={{ tracker, date }}
            />
        );
    };

    return (
        <Animated.FlatList
            style={{ paddingHorizontal: 2 * UNIT_PX }}
            showsVerticalScrollIndicator={false}
            data={indexedTrackers}
            renderItem={renderItem}
        />
    );
};

export default TrackerList;

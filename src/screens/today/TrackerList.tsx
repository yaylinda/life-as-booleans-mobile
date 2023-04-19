import React from 'react';
import Animated from 'react-native-reanimated';
import Tracker from '../../components/tracker/Tracker';
import useUserStore from '../../stores/userStore';
import { UNIT_PX } from '../../styles';
import type { Tracker as TrackerType } from '../../types';
import type moment from 'moment';

interface TrackerListProps {
    date: moment.Moment;
    // trackerIdRows: string[][];
}

interface IndexedTracker {
    index: number;
    tracker: TrackerType;
}

const TrackerList = ({ date }: TrackerListProps) => {

    const { trackers } = useUserStore();

    const indexedTrackers: IndexedTracker[] = React.useMemo(() => (
        Object.values(trackers).map((tracker: TrackerType, index: number): IndexedTracker => ({
            index: index,
            tracker: tracker,
        }))
    ), [trackers]);

    const renderItem = ({ item }: ({ item: IndexedTracker })) => {
        const { index, tracker } = item;
        return (
            <Tracker
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
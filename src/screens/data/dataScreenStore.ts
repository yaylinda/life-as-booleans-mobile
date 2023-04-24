import moment from 'moment';
import { create } from 'zustand';
import { OVERALL_MOOD_DEFAULT_TRACKER } from '../../defaultTrackers';
import useUserStore from '../../stores/userStore';
import type { Tracker } from '../../types';

interface DataScreenStoreData {
    selectedTracker: Tracker;
    year: number;
    selectedCoord: { row: number, column: number };
}

interface DataScreenStoreFunctions {
    setSelectedTracker: (trackerId: string) => void;
    setSelectedCoord: (row: number, column: number) => void;
}

type DataScreenStoreState = DataScreenStoreData & DataScreenStoreFunctions;

const DEFAULT_DATA: DataScreenStoreData = {
    selectedTracker: OVERALL_MOOD_DEFAULT_TRACKER,
    year: moment().year(),
    selectedCoord: { row: -1, column: -1 },
};

const useDataScreenStore = create<DataScreenStoreState>()((set ) => ({
    ...DEFAULT_DATA,
    setSelectedTracker: (trackerId: string) => {
        set({
            selectedTracker: useUserStore.getState().trackers[trackerId],
        });
    },
    setSelectedCoord: (row: number, column: number) => {
        set({
            selectedCoord: { row, column },
        });
    },
}));

export default useDataScreenStore;

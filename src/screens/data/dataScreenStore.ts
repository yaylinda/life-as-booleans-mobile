import moment from 'moment';
import { create } from 'zustand';
import { OVERALL_MOOD_DEFAULT_TRACKER } from '../../defaultTrackers';
import useUserStore from '../../stores/userStore';
import type { Tracker } from '../../types';

interface DataScreenStoreData {
    selectedTracker: Tracker;
    week: moment.Moment;
    month: moment.Moment;
    year: number;
    selectedCoord: { row: number, column: number };
}

interface DataScreenStoreFunctions {
    // prevWeek: () => void;
    // nextWeek: () => void;
    // prevMonth: () => void;
    // nextMonth: () => void;
    setSelectedTracker: (trackerId: string) => void;
    setSelectedCoord: (row: number, column: number) => void;
}

type DataScreenStoreState = DataScreenStoreData & DataScreenStoreFunctions;

const DEFAULT_DATA: DataScreenStoreData = {
    selectedTracker: OVERALL_MOOD_DEFAULT_TRACKER,
    week: moment().startOf('week').startOf('day'),
    month: moment().startOf('month').startOf('day'),
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

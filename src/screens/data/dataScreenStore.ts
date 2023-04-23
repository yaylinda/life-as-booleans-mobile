import { create } from 'zustand';
import { OVERALL_MOOD_DEFAULT_TRACKER } from '../../defaultTrackers';
import useUserStore from '../../stores/userStore';
import { Tracker } from '../../types';

interface DataScreenStoreData {
    selectedTrackerId: string;
}

interface DataScreenStoreFunctions {
    setSelectedTrackerId: (trackerId: string) => void;
}

type DataScreenStoreState = DataScreenStoreData & DataScreenStoreFunctions;

const DEFAULT_DATA: DataScreenStoreData = {
    selectedTrackerId: OVERALL_MOOD_DEFAULT_TRACKER.id,
};

const useDataScreenStore = create<DataScreenStoreState>()((set ) => ({
    ...DEFAULT_DATA,
    setSelectedTrackerId: (trackerId: string) => {
        set({
            selectedTrackerId: useUserStore.getState().trackers[trackerId].id,
        });
    },
}));

export default useDataScreenStore;

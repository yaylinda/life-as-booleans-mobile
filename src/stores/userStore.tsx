import {
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_300Light_Italic,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_500Medium,
    Nunito_500Medium_Italic,
    Nunito_600SemiBold,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black,
    Nunito_900Black_Italic,
} from '@expo-google-fonts/nunito';
import { loadAsync } from 'expo-font';
import { produce } from 'immer';
import moment from 'moment';
import { create } from 'zustand';
import { DEFAULT_TRACKERS, EMPTY_TRACKER } from '../defaultTrackers';
import { getRandomGradient } from '../gradients';
import { clearAll, getItem, LocalStorageKey, multiGet, multiSet, removeItem, setItem } from '../localStorage';
import type { AddOrEditTrackerDialogProps , Tracker, User, YearViewData } from '../types';

interface UserStoreStateData {
    loadingData: boolean;
    loadingFonts: boolean;
    gradientColors: [string, string];
    user: User | null;
    trackers: { [key in string]: Tracker };
    data: { [key in string]: string };
    yearViewData: YearViewData | null;
    todayScreenDate: moment.Moment;
    loadingDataForDay: boolean;
    addOrEditTrackerDialog: AddOrEditTrackerDialogProps;
}

interface UserStoreStateFunctions {
    init: () => void;
    createUser: (username: string) => void;
    addTracker: (trackerName: string) => void;
    getTrackerDataForDay: (dayEpoch: string) => Promise<{ [key in string]: string | undefined }>;
    getTrackerData: (dayEpoch: string, trackerId: string) => Promise<string | undefined>;
    setTrackerData: (dayEpoch: string, trackerId: string, value: string) => void;
    clearData: () => void;
    deleteTracker: (trackerId: string) => void;
    updateTracker: (trackerId: string, trackerName: string) => void;
    setYearViewData: (setYearViewData: YearViewData | null) => void;
    nextYear: () => void;
    prevYear: () => void;
    nextTodayScreenDate: () => void;
    prevTodayScreenDate: () => void;
    openAddTrackerDialog: () => void;
    openEditTrackerDialog: (trackerId: string, trackerName: string) => void;
    closeAddOrEditTrackerDialog: () => void;
    _setDefaultTrackers: () => void;
    _loadFonts: () => void;
}

interface UserStoreState extends UserStoreStateData, UserStoreStateFunctions {

}

const DEFAULT_DATA: UserStoreStateData = {
    loadingData: true,
    loadingFonts: true,
    gradientColors: getRandomGradient('dark'),
    user: null,
    trackers: {},
    data: {},
    yearViewData: null,
    todayScreenDate: moment(),
    loadingDataForDay: false,
    addOrEditTrackerDialog: { isOpen: false, trackerId: undefined, trackerName: '' },
};

const useUserStore = create<UserStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    init: async () => {
        set({ loadingData: true, loadingFonts: true });

        const user: User | null = await getItem<User>(LocalStorageKey.USER_INFO);
        if (user) {
            set({ user });
        }

        const trackerIds: string[] | null = await getItem<string[]>(LocalStorageKey.TRACKER_IDS);
        if (trackerIds) {
            const trackers = await multiGet<Tracker>(trackerIds);
            set({ trackers });
        } else {
            await get()._setDefaultTrackers();
        }

        set({ loadingData: false });

        get()._loadFonts();
    },

    createUser: async (username: string) => {
        const user: User = {
            ...get().user,
            username,
            createdDateEpoch: moment().valueOf(),
        };
        await setItem<User>(LocalStorageKey.USER_INFO, user);
        set({ user });
    },

    addTracker: async (trackerName: string) => {
        const newTracker = EMPTY_TRACKER(trackerName);

        await setItem<string[]>(LocalStorageKey.TRACKER_IDS, [
            ...Object.keys(get().trackers),
            newTracker.id,
        ]);
        await setItem<Tracker>(newTracker.id, newTracker);

        set({
            trackers: {
                ...get().trackers,
                [newTracker.id]: newTracker,
            },
        });
    },

    getTrackerData: async (dayEpoch: string, trackerId: string) => {
        const key = `${dayEpoch}_${trackerId}`;

        if (get().data[key] !== undefined) {
            // console.log(`[userStore][getTrackerData] cacheHit! trackerId=${trackerId}, value=${get().data[key]}`);
            return get().data[key];
        }

        const value = await getItem<string>(key);
        // console.log(`[userStore][getTrackerData] cacheMiss! trackerId=${trackerId}, value=${value}`);

        if (value) {
            // set({
            //     data: {
            //         ...get().data,
            //         [key]: value
            //     }
            // });
            return value;
        }

        // console.log(`[userStore][getTrackerData] value not set! trackerId=${trackerId}`);

        return undefined;
    },

    getTrackerDataForDay: async (dayEpoch: string) => {
        set({ loadingDataForDay: true });

        const trackerIds = Object.keys(get().trackers);

        // Map the trackerIds to an array of promises
        const promises = trackerIds.map((trackerId) => get().getTrackerData(dayEpoch, trackerId));

        // Wait for all promises to resolve using Promise.all()
        const results = await Promise.all(promises);

        // Create an object mapping trackerId to the corresponding result
        const trackerData = trackerIds.reduce<{ [key in string]: string | undefined }>((accumulator, trackerId, index) => {
            accumulator[trackerId] = results[index];
            return accumulator;
        }, {});

        set({ loadingDataForDay: false });

        return trackerData;
    },

    setTrackerData: async (dayEpoch: string, trackerId: string, value: string) => {
        const key = `${dayEpoch}_${trackerId}`;

        await setItem<string>(key, value);

        // set({
        //     data: {
        //         ...get().data,
        //         [key]: value
        //     }
        // });
    },

    clearData: async () => {
        await clearAll();
        set({
            user: null,
            trackers: {},
            data: {},
        });
        get()._setDefaultTrackers();
    },

    openAddTrackerDialog: () => {
        set({
            addOrEditTrackerDialog: {
                isOpen: true,
                trackerId: undefined,
                trackerName: '',
            },
        });
    },

    openEditTrackerDialog: (trackerId: string, trackerName: string) => {
        set({
            addOrEditTrackerDialog: {
                isOpen: true,
                trackerId,
                trackerName,
            },
        });
    },

    closeAddOrEditTrackerDialog: () => {
        set({
            addOrEditTrackerDialog: {
                isOpen: false,
                trackerId: undefined,
                trackerName: '',
            },
        });
    },

    deleteTracker: async (trackerId: string) => {
        await setItem<string[]>(
            LocalStorageKey.TRACKER_IDS,
            Object.keys(get().trackers).filter(t => t !== trackerId),
        );
        await removeItem(trackerId);

        set({
            trackers: produce(get().trackers, (draft) => {
                delete draft[trackerId];
            }),
        });
    },

    updateTracker: async (trackerId: string, trackerName: string) => {
        const trackerToUpdate = get().trackers[trackerId];

        if (!trackerToUpdate) {
            return;
        }

        trackerToUpdate.displayName = trackerName;

        await setItem<Tracker>(trackerId, trackerToUpdate);

        set({
            trackers: {
                ...get().trackers,
                [trackerToUpdate.id]: trackerToUpdate,
            },
        });

        get().closeAddOrEditTrackerDialog;
    },

    setYearViewData: (yearViewData: YearViewData | null) => {
        set({ yearViewData });
    },

    nextTodayScreenDate: () => {
        set((state) => ({
            todayScreenDate: state.todayScreenDate
                .clone()
                .add(1, 'day')
                .startOf('day'),
        }));
    },

    prevTodayScreenDate: () => {
        set((state) => ({
            todayScreenDate: state.todayScreenDate
                .clone()
                .subtract(1, 'day')
                .startOf('day'),
        }));
    },

    nextYear: () => {
        if (!get().yearViewData) {
            return;
        }

        set((state) => produce(state, (draft) => {
            draft.yearViewData!.year = draft.yearViewData!.year + 1;
        }));
    },

    prevYear: () => {
        if (!get().yearViewData) {
            return;
        }

        set((state) => produce(state, (draft) => {
            draft.yearViewData!.year = draft.yearViewData!.year - 1;
        }));
    },

    _setDefaultTrackers: async () => {
        await setItem<string[]>(LocalStorageKey.TRACKER_IDS, Object.keys(DEFAULT_TRACKERS));
        await multiSet<Tracker>(DEFAULT_TRACKERS);
        set({ trackers: DEFAULT_TRACKERS });
    },

    _loadFonts: async () => {
        await loadAsync({
            Nunito_200ExtraLight,
            Nunito_300Light,
            Nunito_400Regular,
            Nunito_500Medium,
            Nunito_600SemiBold,
            Nunito_700Bold,
            Nunito_800ExtraBold,
            Nunito_900Black,
            Nunito_200ExtraLight_Italic,
            Nunito_300Light_Italic,
            Nunito_400Regular_Italic,
            Nunito_500Medium_Italic,
            Nunito_600SemiBold_Italic,
            Nunito_700Bold_Italic,
            Nunito_800ExtraBold_Italic,
            Nunito_900Black_Italic,
        });
        set({ loadingFonts: false });
    },
}));

export default useUserStore;

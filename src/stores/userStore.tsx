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
    Nunito_900Black_Italic
} from '@expo-google-fonts/nunito';
import { loadAsync } from 'expo-font';
import { produce } from 'immer';
import moment from 'moment';
import { create } from 'zustand';
import { getRandomGradient } from '../gradients';
import { clearAll, getItem, LocalStorageKey, multiGet, multiSet, removeItem, setItem } from '../localStorage';
import { EMPTY_TRACKER } from '../utilities';
import type { Tracker, User } from '../types';

interface UserStoreStateData {
    loadingData: boolean;
    loadingFonts: boolean;
    gradientColors: [string, string];
    user: User | null;
    trackers: { [key in string]: Tracker };
    data: { [key in string]: string };
    isAddingTracker: boolean;
    editingTrackerId: string;
}

interface UserStoreStateFunctions {
    init: () => void;
    createUser: (username: string) => void;
    addTracker: (trackerName: string) => void;
    getData: (dayEpoch: string, trackerId: string) => Promise<string | undefined>;
    setData: (dayEpoch: string, trackerId: string, value: string) => void;
    clearData: () => void;
    setIsAddingTracker: (value: boolean) => void;
    setEditingTrackerId: (trackerId: string) => void;
    deleteTracker: (trackerId: string) => void;
    updateTracker: (trackerName: string) => void;
    _setDefaultTrackers: () => void;
    _loadFonts: () => void;
}

interface UserStoreState extends UserStoreStateData, UserStoreStateFunctions {

}

export const DEFAULT_TRACKERS: { [key in string]: Tracker } = {
    'overall_mood': {
        id: 'overall_mood',
        displayName: 'Overall Mood',
        emoji: '🙂',
        valueOptionsMap: {
            veryBad: {
                value: 'veryBad',
                label: 'Very Bad',
                icon: 'sad-cry',
                color: 'error.500'
            },
            bad: {
                value: 'bad',
                label: 'Bad',
                icon: 'frown',
                color: 'orange.500'
            },
            okay: {
                value: 'okay',
                label: 'Okay',
                icon: 'meh',
                color: 'yellow.400'
            },
            good: {
                value: 'good',
                label: 'Good',
                icon: 'smile',
                color: 'lime.400'
            },
            veryGood: {
                value: 'veryGood',
                label: 'Very Good',
                icon: 'smile-beam',
                color: 'green.500'
            }
        },
        isDefaultTracker: true,
    }
};

const DEFAULT_DATA: UserStoreStateData = {
    loadingData: true,
    loadingFonts: true,
    gradientColors: getRandomGradient('dark'),
    user: null,
    trackers: {},
    data: {},
    isAddingTracker: false,
    editingTrackerId: '',
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
            createdDateEpoch: moment().valueOf()
        };
        await setItem<User>(LocalStorageKey.USER_INFO, user);
        set({ user });
    },

    addTracker: async (trackerName: string) => {
        const newTracker = EMPTY_TRACKER(trackerName);

        await setItem<string[]>(LocalStorageKey.TRACKER_IDS, [
            ...Object.keys(get().trackers),
            newTracker.id
        ]);
        await setItem<Tracker>(newTracker.id, newTracker);

        set({
            trackers: {
                ...get().trackers,
                [newTracker.id]: newTracker
            },
            isAddingTracker: false,
        });
    },

    getData: async (dayEpoch: string, trackerId: string) => {
        const key = `${dayEpoch}_${trackerId}`;

        if (get().data[key] !== undefined) {
            return get().data[key];
        }

        const value = await getItem<string>(key);

        if (value) {
            set({
                data: {
                    ...get().data,
                    [key]: value
                }
            });
            return value;
        }

        return undefined;
    },

    setData: async (dayEpoch: string, trackerId: string, value: string) => {
        const key = `${dayEpoch}_${trackerId}`;

        await setItem<string>(key, value);

        set({
            data: {
                ...get().data,
                [key]: value
            }
        });
    },

    clearData: async () => {
        await clearAll();
        set({
            user: null,
            trackers: {},
            data: {}
        });
        get()._setDefaultTrackers();
    },

    setIsAddingTracker: (value: boolean) => {
        set({ isAddingTracker: value });
    },

    setEditingTrackerId: (trackerId: string) => {
        set({ editingTrackerId: trackerId });
    },

    deleteTracker: async (trackerId: string) => {
        await setItem<string[]>(
            LocalStorageKey.TRACKER_IDS,
            Object.keys(get().trackers).filter(t => t !== trackerId)
        );
        await removeItem(trackerId);

        set({
            trackers: produce(get().trackers, (draft) => {
                delete draft[trackerId];
            }),
        });
    },

    updateTracker: async (trackerName: string) => {
        if (!get().editingTrackerId) {
            return;
        }

        const trackerToUpdate = get().trackers[get().editingTrackerId];

        if (!trackerToUpdate) {
            return;
        }

        trackerToUpdate.displayName = trackerName;

        await setItem<Tracker>(get().editingTrackerId, trackerToUpdate);

        set({
            trackers: {
                ...get().trackers,
                [trackerToUpdate.id]: trackerToUpdate,
            },
            editingTrackerId: '',
        });
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
            Nunito_900Black_Italic
        });
        set({ loadingFonts: false });
    }
}));

export default useUserStore;

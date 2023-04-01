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
import { create } from 'zustand';
import { getRandomGradient } from '../gradients';
import { getItem, LocalStorageKey, multiGet, multiRemove, multiSet, setItem } from '../localStorage';
import type { Tracker, User } from '../types';

interface UserStoreStateData {
    loadingData: boolean;
    loadingFonts: boolean;
    gradientColors: [string, string];
    user: User | null;
    trackers: { [key in string]: Tracker };
    data: { [key in string]: string };
}

interface UserStoreStateFunctions {
    init: () => void;
    setUsername: (username: string) => void;
    addTracker: (tracker: Tracker) => void;
    getData: (dayEpoch: string, trackerId: string) => Promise<string | undefined>;
    setData: (dayEpoch: string, trackerId: string, value: string) => void;
    logout: () => void;
    clearData: () => void;
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
                iconFamily: 'FontAwesome5',
                color: 'error.500'
            },
            bad: {
                value: 'bad',
                label: 'Bad',
                icon: 'frown',
                iconFamily: 'FontAwesome5',
                color: 'orange.500'
            },
            okay: {
                value: 'okay',
                label: 'Okay',
                icon: 'meh',
                iconFamily: 'FontAwesome5',
                color: 'yellow.400'
            },
            good: {
                value: 'good',
                label: 'Good',
                icon: 'smile',
                iconFamily: 'FontAwesome5',
                color: 'lime.400'
            },
            veryGood: {
                value: 'veryGood',
                label: 'Very Good',
                icon: 'smile-beam',
                iconFamily: 'FontAwesome5',
                color: 'green.500'
            }
        }
    }
};

const DEFAULT_DATA: UserStoreStateData = {
    loadingData: true,
    loadingFonts: true,
    gradientColors: getRandomGradient('dark'),
    user: null,
    trackers: {},
    data: {}
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

    setUsername: async (username: string) => {
        const user = { ...get().user, username };
        await setItem<User>(LocalStorageKey.USER_INFO, user);
        set({ user });
    },

    addTracker: async (tracker: Tracker) => {
        await setItem<string[]>(LocalStorageKey.TRACKER_IDS, [
            ...Object.keys(get().trackers),
            tracker.id,
        ]);
        await setItem<Tracker>(tracker.id, tracker);

        set({
            trackers: {
                ...get().trackers,
                [tracker.id]: tracker,
            }
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

    logout: () => {
        set({ user: null });
    },

    clearData: async () => {
        const keysToRemove = [
            ...Object.keys(get().trackers),
            ...Object.keys(get().data)
        ];
        await multiRemove(keysToRemove);
        await get()._setDefaultTrackers();
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
    },
}));

export default useUserStore;

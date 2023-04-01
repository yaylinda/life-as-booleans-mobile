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
import { clearAll, getData, LocalStorageKey, setData } from '../localStorage';
import type { User } from '../types';

interface UserStoreStateData {
    loadingData: boolean;
    loadingFonts: boolean;
    user: User | null;
    gradientColors: [string, string];
    trackers: string[];
    data: { [dayEpoch in string]: { [tracker in string]: boolean } }
}

interface UserStoreStateFunctions {
    init: () => void;
    setUsername: (username: string) => void;
    addTracker: (tracker: string) => void;
    getData: (dayEpoch: string, tracker: string) => Promise<boolean | undefined>;
    logout: () => void;
    clearData: () => void;
}

interface UserStoreState extends UserStoreStateData, UserStoreStateFunctions {

}

export const DEFAULT_TRACKERS = ['Overall Mood'];

const DEFAULT_DATA: UserStoreStateData = {
    loadingData: true,
    loadingFonts: true,
    user: null,
    gradientColors: getRandomGradient('dark'),
    trackers: [],
    data: {},
};

const useUserStore = create<UserStoreState>()((set, get) => ({
    ...DEFAULT_DATA,

    init: async () => {
        set({ loadingData: true, loadingFonts: true });

        const user: User | null = await getData<User>(LocalStorageKey.USER_INFO);
        if (user) {
            set({ user });
        }

        const trackers: string[] | null = await getData<string[]>(LocalStorageKey.DATA_KEYS);
        if (trackers) {
            set({ trackers });
        } else {
            await setData<string[]>(LocalStorageKey.DATA_KEYS, DEFAULT_TRACKERS);
            set({ trackers: DEFAULT_TRACKERS });
        }

        set({ loadingData: false });

        loadAsync({
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
        }).then(() => {
            set({ loadingFonts: false });
        });
    },

    setUsername: async (username: string) => {
        const user = { ...get().user, username };
        await setData<User>(LocalStorageKey.USER_INFO, user);
        set({ user });
    },

    addTracker: async (tracker: string) => {
        const trackers = [...get().trackers, tracker];
        await setData<string[]>(LocalStorageKey.DATA_KEYS, trackers);
        set({ trackers });
    },

    getData: async (dayEpoch: string, tracker: string) => {
        if (get().data[dayEpoch]?.[tracker] !== undefined) {
            return get().data[dayEpoch][tracker];
        }

        const dayData = await getData<{ [tracker in string]: boolean }>(dayEpoch);

        if (dayData) {
            set({
                data: {
                    ...get().data,
                    [dayEpoch]: dayData,
                }
            });
            return dayData[tracker];
        }

        return undefined;
    },

    logout: () => {
        set({ user: null } );
    },

    clearData: async () => {
        await clearAll();
        set({ trackers: DEFAULT_TRACKERS, data: {} });
        await setData<User>(LocalStorageKey.USER_INFO, get().user!);
    },
}));

export default useUserStore;
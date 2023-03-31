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
import { getData, LocalStorageKey, setData } from '../localStorage';
import type { User } from '../types';

interface UserStoreStateData {
    loadingData: boolean;
    loadingFonts: boolean;
    user: User | null;
    gradientColors: [string, string];
    dataKeys: string[];
    data: { [dateKey in string]: { [dataKey in string]: boolean } }
}

interface UserStoreStateFunctions {
    init: () => void;
    setUsername: (username: string) => void;
    addDataKey: (dataKey: string) => void;
}

interface UserStoreState extends UserStoreStateData, UserStoreStateFunctions {

}

export const DEFAULT_DATA_KEYS = ['MOOD'];

const DEFAULT_DATA: UserStoreStateData = {
    loadingData: true,
    loadingFonts: true,
    user: null,
    gradientColors: getRandomGradient('dark'),
    dataKeys: [],
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

        const dataKeys: string[] | null = await getData<string[]>(LocalStorageKey.DATA_KEYS);
        if (dataKeys) {
            set({ dataKeys });
        } else {
            await setData<string[]>(LocalStorageKey.DATA_KEYS, DEFAULT_DATA_KEYS);
            set({ dataKeys: DEFAULT_DATA_KEYS });
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

    addDataKey: async (dataKey: string) => {
        const dataKeys = [...get().dataKeys, dataKey];
        await setData<string[]>(LocalStorageKey.DATA_KEYS, dataKeys);
        set({ dataKeys });
    }
}));

export default useUserStore;
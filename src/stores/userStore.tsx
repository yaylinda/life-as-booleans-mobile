import {create} from 'zustand';
import { getRandomGradient } from '../gradients';
import { getData, LocalStorageKey } from '../localStorage';
import type {User} from '../types';

interface UserStoreStateData {
    loading: boolean;
    user: User | null;
    gradientColors: [string, string];
}

interface UserStoreStateFunctions {
    init: () => void;
}

interface UserStoreState extends UserStoreStateData, UserStoreStateFunctions {

}

const DEFAULT_DATA: UserStoreStateData = {
    loading: true,
    user: null,
    gradientColors: getRandomGradient('light'),
};

const useUserStore = create<UserStoreState>()((set ) => ({
    ...DEFAULT_DATA,

    init: async () => {
        set({ loading: true });

        const user: User | null = await getData<User>(LocalStorageKey.USER_INFO);

        if (user) {
            set({ user });
        }

        set({ loading: false });
    },
}));

export default useUserStore;
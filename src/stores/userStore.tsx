import {create} from 'zustand';
import type {User} from '../types';
import { getData, LocalStorageKey } from '../localStorage';

interface UserStoreStateData {
    loading: boolean;
    user: User | null;
}

interface UserStoreStateFunctions {
    init: () => void;
}

interface UserStoreState extends UserStoreStateData, UserStoreStateFunctions {

}

const DEFAULT_DATA: UserStoreStateData = {
    loading: true,
    user: null,
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
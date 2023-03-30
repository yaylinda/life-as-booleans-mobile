import {create} from 'zustand';
import { getAuthState} from '../localStorage';
import type {User} from '../types';

interface AuthStoreStateData {
    loading: boolean;
    user: User | null;
}

interface AuthStoreStateFunctions {
    init: () => void;
    loginWithGoogle: () => void;
}

interface AuthStoreState extends AuthStoreStateData, AuthStoreStateFunctions {

}

const DEFAULT_DATA: AuthStoreStateData = {
    loading: true,
    user: null,
};

// const IGNORED_AUTH_ERROR_CODES = [
//     'auth/popup-closed-by-user',
// ];

const useAuthStore = create<AuthStoreState>()((set ) => ({
    ...DEFAULT_DATA,

    init: async () => {
        set({ loading: true });

        const authState = await getAuthState();

        if (authState) {
            set({ user: authState.user });
        }

        set({ loading: false });
    },

    loginWithGoogle: async () => {
        set({ loading: true });
    },
}));

export default useAuthStore;
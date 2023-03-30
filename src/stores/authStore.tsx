import {create} from 'zustand';
import { getAuthState} from '../localStorage';
import type {User} from '../types';

interface AuthStoreStateData {
    loading: boolean;
    user: User | null;
}

interface AuthStoreStateFunctions {
    init: () => void;
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

    init: () => {
        set({ loading: true });

        const authState = getAuthState();

        set({ loading: false });
    },

}));

export default useAuthStore;
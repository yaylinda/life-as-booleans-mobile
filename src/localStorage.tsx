import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthState } from './types';

const AUTH_STATE_KEY = '@auth_state';

export const clearAuthState = async (): Promise<void> =>
    await AsyncStorage.removeItem(AUTH_STATE_KEY);

export const getAuthState = async (): Promise<AuthState | null> => {
    const value = await AsyncStorage.getItem(AUTH_STATE_KEY);
    return value ? JSON.parse(value) : null;
};

export const setAuthState = async (authState: AuthState): Promise<void> =>
    await AsyncStorage.setItem(AUTH_STATE_KEY, JSON.stringify(authState));

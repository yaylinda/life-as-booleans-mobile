import AsyncStorage from '@react-native-async-storage/async-storage';

export enum LocalStorageKey {
    USER_INFO = '@user_info',
}

export async function getData<T>(key: LocalStorageKey): Promise<T | null> {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
}

export async function setData<T>(key: LocalStorageKey, data: T): Promise<void> {
    return await AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function clearData(key: LocalStorageKey): Promise<void> {
    return await AsyncStorage.removeItem(key);
}

export async function clearAll(): Promise<void> {
    return await AsyncStorage.clear();
}

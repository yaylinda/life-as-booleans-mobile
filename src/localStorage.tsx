import AsyncStorage from '@react-native-async-storage/async-storage';

export enum LocalStorageKey {
    USER_INFO = '@user_info',
    TRACKER_IDS = '@tracker_ids',
}

/**
 *
 * @param key
 */
export async function getItem<T>(key: LocalStorageKey | string): Promise<T | null> {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
}

/**
 *
 * @param keys
 */
export async function multiGet<T>(keys: (LocalStorageKey | string)[]): Promise<{ [key in string]: T }> {
    const values = await AsyncStorage.multiGet(keys);

    return values.reduce<{ [key in string]: T }>((prev, curr) => {
        const key = curr[0];
        const value = curr[1];

        if (value) {
            prev[key] = JSON.parse(value) as T;
        }

        return prev;
    }, {});
}

/**
 *
 * @param key
 * @param data
 */
export async function setItem<T>(key: LocalStorageKey | string, data: T): Promise<void> {
    return await AsyncStorage.setItem(key, JSON.stringify(data));
}

/**
 *
 * @param data
 */
export async function multiSet<T>(data: { [key in string]: T }): Promise<void> {
    const keyValuePairs = Object.entries(data)
        .map((value: [string, T]) => (
            [value[0], JSON.stringify(value[1])] as [string, string]
        ));
    return await AsyncStorage.multiSet(keyValuePairs);
}

/**
 *
 * @param key
 */
export async function removeItem(key: LocalStorageKey | string): Promise<void> {
    return await AsyncStorage.removeItem(key);
}

/**
 *
 * @param keys
 */
export async function multiRemove(keys: (LocalStorageKey | string)[]): Promise<void> {
    return await AsyncStorage.multiRemove(keys);
}

/**
 *
 */
export async function clearAll(): Promise<void> {
    return await AsyncStorage.clear();
}

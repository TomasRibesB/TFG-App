import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageAdapter {

    static async getItem(key: string): Promise<any | null> {
        try {
            const storedValue = await AsyncStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : null;
        } catch {
            return null;
        }
    }

    static async setItem(key: string, value: any): Promise<void> {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            console.log(error);
            throw new Error(`Error setting item ${key}`);
        }
    }

    static async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(error);
            throw new Error(`Error removing item ${key}`);
        }
    }

}
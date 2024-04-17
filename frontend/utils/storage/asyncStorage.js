import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('Data stored successfully');
        const keys = await AsyncStorage.getAllKeys()
        const items = await AsyncStorage.multiGet(keys)
        console.log(JSON.stringify(items))
    } catch (error) {
        console.log('Error storing data:', error);
        throw new Error('Error storing data');
    }
};

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log('Data retrieved successfully');
            return value;
        }
    } catch (error) {
        console.log('Error retrieving data:', error);
        throw new Error('Error retrieving data');
    }
};

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log('Data removed successfully');
    } catch (error) {
        console.log('Error removing data:', error);
        throw new Error('Error removing data');
    }
};

export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
        console.log('All data cleared successfully');
    } catch (error) {
        console.log('Error clearing data:', error);
    }
};

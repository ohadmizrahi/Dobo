import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('Data stored successfully');
    } catch (error) {
        console.log('Error storing data:', error);
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
    }
};

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log('Data removed successfully');
    } catch (error) {
        console.log('Error removing data:', error);
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

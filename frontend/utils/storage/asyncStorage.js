import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        await AsyncStorage.setItem(key, value);
        console.log('Data stored successfully');
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

export const getAllData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(keys);
        const data = values.map(([key, value]) => [key, value]);
        console.log('Data retrieved successfully');
        return data;
    } catch (error) {
        console.log('Error retrieving data:', error);
        throw new Error('Error retrieving data');
    }
};

export const removeMulti = async (keys) => {
    try {
        await AsyncStorage.multiRemove(keys, (err) => {
            if (err) {
                console.log('Error removing data:', err);
                throw new Error('Error removing data');
            }
        });
        console.log('All data removed successfully');
    } catch (error) {
        console.log('Error removing all data:', error);
        throw new Error('Error removing all data');
    }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

const TRIPS_KEY = 'TRIPS_STORAGE_KEY';

export async function saveTrips(trips) {
    try {
        await AsyncStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
    } catch (error) {
        console.error('Error saving trips:', error);
    }
}

export async function loadTrips() {
    try {
        const jsonValue = await AsyncStorage.getItem(TRIPS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error('Error loading trips:', error);
        return [];
    }
}

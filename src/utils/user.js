import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

export async function getOrCreateUser() {
    let userId = await AsyncStorage.getItem('userId');
    let username = await AsyncStorage.getItem('username');
    if (!userId) {
        userId = uuidv4();
        await AsyncStorage.setItem('userId', userId);
    }
    if (!username) {
        // You could show a username prompt screen from App.js on first run;
        // for now, default to 'Guest'
        username = 'Guest';
        await AsyncStorage.setItem('username', username);
    }
    return { userId, username };
}

export async function setUsername(newName) {
    await AsyncStorage.setItem('username', newName);
}

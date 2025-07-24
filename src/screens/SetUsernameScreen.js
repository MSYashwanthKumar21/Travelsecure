import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SetUsernameScreen({ navigation }) {
    const [username, setUsername] = useState('');

    async function saveUsername() {
        if (!username.trim()) return;
        await AsyncStorage.setItem('username', username.trim());
        navigation.replace('Home'); // or your chosen start screen
    }

    return (
        <View style={{ padding: 32 }}>
            <TextInput
                placeholder="Your Name"
                value={username}
                onChangeText={setUsername}
                style={{ borderWidth: 1, marginBottom: 12, padding: 10 }}
            />
            <Button title="Continue" onPress={saveUsername} />
        </View>
    );
}

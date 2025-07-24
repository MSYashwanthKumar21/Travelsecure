import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    const [checking, setChecking] = useState(true);
    const [hasUsername, setHasUsername] = useState(false);

    useEffect(() => {
        (async () => {
            const username = await AsyncStorage.getItem('username');
            setHasUsername(!!username);
            setChecking(false);
        })();
    }, []);

    if (checking) return null; // or a splash/loading UI

    return (
        <NavigationContainer>
            {/* You might want to control initialRouteName dynamically here,
          but you can handle this inside AppNavigator as well.
          Otherwise, remove SetUsername from AppNavigator and conditionally
          render different navigators here based on hasUsername */}

            <AppNavigator />
        </NavigationContainer>
    );
}

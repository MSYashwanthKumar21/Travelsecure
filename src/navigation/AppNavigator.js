import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import Home from '../screens/Home';
import AddTrip from '../screens/AddTrip';
import TripDetails from '../screens/TripDetails';
import MapScreen from '../screens/Mapscreen';
import CreateGroupScreen from '../screens/CreateGroupScreen';
import JoinGroupScreen from '../screens/JoinGroupScreen';
import GroupChatScreen from '../screens/GroupChatScreen';
import SetUsernameScreen from '../screens/SetUsernameScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
        return (
            <Stack.Navigator initialRouteName="Login">
                    {/* Username Setup (optional) */}
                    <Stack.Screen
                        name="SetUsername"
                        component={SetUsernameScreen}
                        options={{ headerShown: false }}
                    />

                    {/* Authentication Screens */}
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Signup"
                        component={SignupScreen}
                        options={{ title: 'Sign Up', headerShown: false }}
                    />

                    {/* Main App Screens */}
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen
                        name="AddTrip"
                        component={AddTrip}
                        options={{ title: 'Add New Trip' }}
                    />
                    <Stack.Screen
                        name="TripDetails"
                        component={TripDetails}
                        options={{ title: 'Trip Details' }}
                    />
                    <Stack.Screen name="JoinGroup" component={JoinGroupScreen} />
                    <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
                    <Stack.Screen name="GroupChat" component={GroupChatScreen} />
                    <Stack.Screen
                        name="MapScreen"
                        component={MapScreen}
                        options={{ title: 'Map' }}
                    />
            </Stack.Navigator>
        );
}

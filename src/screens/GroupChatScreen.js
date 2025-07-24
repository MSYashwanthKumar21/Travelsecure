import React, { useEffect, useState, useRef } from 'react';
import {
    View, TextInput, Button, FlatList, Text, StyleSheet, Alert, Dimensions, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    collection, query, orderBy, onSnapshot, addDoc, serverTimestamp,
    doc, setDoc
} from 'firebase/firestore';
import { firestore } from '../lib/firebase';

const windowHeight = Dimensions.get('window').height;

export default function GroupChatScreen({ route }) {
    const { groupId } = route.params;

    // Chat states
    const [messages, setMessages] = useState([]);
    const [inputMsg, setInputMsg] = useState('');
    const [username, setUsername] = useState('User');
    const [userId, setUserId] = useState(null);

    // Location states
    const [memberLocations, setMemberLocations] = useState([]);
    const mapRef = useRef(null);

    // Load username and userId from AsyncStorage on mount
    useEffect(() => {
        AsyncStorage.getItem('username').then(name => setUsername(name || 'User'));
        AsyncStorage.getItem('userId').then(id => {
            if (id) setUserId(id);
            else {
                const newId = 'user_' + Date.now();
                AsyncStorage.setItem('userId', newId);
                setUserId(newId);
            }
        });
    }, []);

    // Firestore: listen to chat messages realtime
    useEffect(() => {
        if (!groupId) return;

        const messagesRef = collection(firestore, 'groups', groupId, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, snapshot => {
            const loadedMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(loadedMessages.reverse());
        });
        return unsubscribe;
    }, [groupId]);

    // Firestore: listen to live location updates of members
    useEffect(() => {
        if (!groupId) return;

        const locationsRef = collection(firestore, 'groups', groupId, 'locations');
        const unsubscribe = onSnapshot(locationsRef, snapshot => {
            const locs = snapshot.docs.map(doc => ({
                userId: doc.id,
                ...doc.data(),
            }));
            setMemberLocations(locs);
        });
        return unsubscribe;
    }, [groupId]);

    // Request location permission and start watching location
    useEffect(() => {
        let subscriber;

        async function startTracking() {
            // Request foreground permission
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Permission to access location was denied.');
                return;
            }

            // Check if location services are enabled
            const servicesEnabled = await Location.hasServicesEnabledAsync();
            if (!servicesEnabled) {
                Alert.alert('Enable Location', 'Please enable location services on your device.');
                return;
            }

            // Start watching location
            subscriber = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.Highest,
                    timeInterval: 5000,   // Update every 5 seconds
                    distanceInterval: 10, // Or every 10 meters moved
                },
                async (loc) => {
                    if (!userId || !groupId) return;
                    try {
                        await setDoc(doc(firestore, 'groups', groupId, 'locations', userId), {
                            latitude: loc.coords.latitude,
                            longitude: loc.coords.longitude,
                            updatedAt: serverTimestamp(),
                            username,
                        });
                    } catch (e) {
                        console.error('Error updating location:', e);
                    }
                }
            );
        }

        startTracking();

        return () => {
            if (subscriber) subscriber.remove();
        };
    }, [userId, groupId, username]);

    // Send chat message handler
    const sendMessage = async () => {
        if (!inputMsg.trim()) return;
        try {
            const messagesRef = collection(firestore, 'groups', groupId, 'messages');
            await addDoc(messagesRef, {
                text: inputMsg,
                createdAt: serverTimestamp(),
                senderName: username,
            });
            setInputMsg('');
        } catch (error) {
            Alert.alert('Error', 'Failed to send message');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {/* Live locations map at top */}
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        initialRegion={{
                            latitude: memberLocations[0]?.latitude || 37.78825,
                            longitude: memberLocations[0]?.longitude || -122.4324,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        {memberLocations.map(loc => (
                            <Marker
                                key={loc.userId}
                                coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                                title={loc.username || 'Unknown'}
                            />
                        ))}
                    </MapView>

                    {/* Chat messages */}
                    <FlatList
                        inverted
                        data={messages}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={<Text style={styles.empty}>No messages yet...</Text>}
                        style={styles.chatList}
                        renderItem={({ item }) => (
                            <View style={[
                                styles.messageBubble,
                                item.senderName === username ? styles.myMessage : styles.theirMessage
                            ]}>
                                <Text style={styles.messageText}>{item.text}</Text>
                                <Text style={styles.senderText}>{item.senderName}</Text>
                            </View>
                        )}
                    />

                    {/* Message input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={inputMsg}
                            onChangeText={setInputMsg}
                            style={styles.input}
                            placeholder="Type a message"
                            editable
                        />
                        <Button title="Send" onPress={sendMessage} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    container: { flex: 1, backgroundColor: '#fff' },
    map: {
        height: windowHeight * 0.3,
        width: '100%',
    },
    chatList: {
        flex: 1,
        backgroundColor: '#f5f6fa',
        paddingHorizontal: 10,
    },
    messageBubble: {
        padding: 10,
        marginVertical: 4,
        borderRadius: 8,
        maxWidth: '80%',
        alignSelf: 'flex-start',
        backgroundColor: '#e0e7ff',
    },
    myMessage: {
        backgroundColor: '#c9f7c9',
        alignSelf: 'flex-end',
    },
    theirMessage: {
        backgroundColor: '#e0e7ff',
        alignSelf: 'flex-start',
    },
    messageText: { fontSize: 16 },
    senderText: { fontSize: 11, color: '#888', marginTop: 2 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    empty: {
        textAlign: 'center',
        color: '#aaa',
        margin: 14,
        fontSize: 14,
    },
});

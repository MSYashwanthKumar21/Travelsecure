import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { collection, query, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { firestore } from '../lib/firebase';  // Adjust if your firebase path is different
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JoinGroupScreen({ navigation }) {
    const [pin, setPin] = useState('');
    const [userId, setUserId] = useState(null);

    // Load or create a local userId for example purposes
    useEffect(() => {
        async function loadUserId() {
            let storedUserId = await AsyncStorage.getItem('userId');
            if (!storedUserId) {
                storedUserId = 'user_' + Date.now();
                await AsyncStorage.setItem('userId', storedUserId);
            }
            setUserId(storedUserId);
        }
        loadUserId();
    }, []);

    const joinGroup = async () => {
        console.log('Attempting to join group with pin:', pin);

        if (!pin.trim()) {
            Alert.alert('Validation', 'Please enter a valid PIN code.');
            return;
        }
        if (!userId) {
            Alert.alert('Error', 'User ID not ready yet. Please try again shortly.');
            return;
        }

        try {
            const groupsRef = collection(firestore, 'groups');
            const q = query(groupsRef, where('pinCode', '==', pin.trim()));

            const querySnapshot = await getDocs(q);
            console.log('Firestore query results:', querySnapshot.size);

            if (querySnapshot.empty) {
                Alert.alert('Not Found', 'No group found with this PIN code.');
                return;
            }

            const groupDoc = querySnapshot.docs[0];
            const groupData = groupDoc.data();

            // Add user to members array if not already a member
            if (groupData.members?.includes(userId)) {
                console.log('User is already a member of the group');
            } else {
                await updateDoc(groupDoc.ref, {
                    members: arrayUnion(userId),
                });
                console.log(`Added user ${userId} to group members`);
            }

            console.log('Navigating to GroupChat with groupId:', groupDoc.id);
            // Navigate to group chat screen with groupId param
            navigation.navigate('GroupChat', { groupId: groupDoc.id });

        } catch (error) {
            console.error('Error joining group:', error);
            Alert.alert('Error', 'Failed to join group. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter Group PIN:</Text>
            <TextInput
                style={styles.input}
                value={pin}
                onChangeText={setPin}
                placeholder="4-6 digit PIN"
                keyboardType="numeric"
                maxLength={6}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Button title="Join Group" onPress={joinGroup} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    label: {
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderRadius: 6,
        fontSize: 18,
    },
});

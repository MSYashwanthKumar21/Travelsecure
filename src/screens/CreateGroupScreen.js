import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { firestore } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CreateGroupScreen({ navigation, route }) {
    const [groupName, setGroupName] = useState('');
    const [pinCode, setPinCode] = useState('');

    const generatePinCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code
    };

    async function createGroup() {
        if (!groupName.trim()) return alert('Please enter a group name');
        const pin = generatePinCode();
        setPinCode(pin);

        try {
            const docRef = await addDoc(collection(firestore, 'groups'), {
                groupName,
                pinCode: pin,
                members: [], // add creator's uid here if you track users
                createdAt: serverTimestamp(),
            });

            // Navigate to chat screen with groupId from docRef.id
            navigation.navigate('GroupChat', { groupId: docRef.id });
        } catch (e) {
            alert('Error creating group: ' + e.message);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Group Name"
                value={groupName}
                onChangeText={setGroupName}
                style={styles.input}
            />
            <Button title="Create Group" onPress={createGroup} />
            {pinCode ? <Text style={styles.pinText}>Share this PIN with friends to join: {pinCode}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { borderWidth: 1, marginBottom: 15, padding: 10 },
    pinText: { marginTop: 20, fontWeight: 'bold', fontSize: 16 },
});

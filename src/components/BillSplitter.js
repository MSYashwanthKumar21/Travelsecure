import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BillSplitter({ totalBill }) {
    const [numPeople, setNumPeople] = useState('');
    const [result, setResult] = useState(null);

    const handleSplit = () => {
        const people = Number(numPeople);
        if (isNaN(people) || people <= 0) {
            Alert.alert('Enter a valid number of people');
            return;
        }
        const share = totalBill / people;
        setResult(share.toFixed(2));
    };

    return (
        <View style={styles.splitterCard}>
            <Text style={styles.label}>Number of people</Text>
            <View style={styles.inputContainer}>
                <Icon name="people-outline" size={18} color="#5c6bc0" style={{ marginRight: 10 }} />
                <TextInput
                    keyboardType="number-pad"
                    placeholder="How many people?"
                    value={numPeople}
                    onChangeText={setNumPeople}
                    style={styles.input}
                />
            </View>
            <TouchableOpacity style={styles.splitButton} onPress={handleSplit}>
                <Text style={styles.splitButtonText}>Split</Text>
            </TouchableOpacity>
            {result && (
                <View style={styles.resultBox}>
                    <Text style={styles.resultText}>Each person should pay: ₹{result}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    splitterCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        marginTop: 20,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.10,
        shadowRadius: 6,
        elevation: 3
    },
    label: { fontWeight: 'bold', fontSize: 16, marginBottom: 6 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#f3f3f7",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e0e0ea",
        marginBottom: 14,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        fontSize: 16,
        fontFamily: 'Roboto'
    },
    splitButton: {
        backgroundColor: "#5c6bc0",
        borderRadius: 8,
        padding: 12,
        alignItems: 'center'
    },
    splitButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    },
    resultBox: {
        backgroundColor: "#e6f0ff",
        borderRadius: 50,
        marginTop: 18,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    resultText: {
        color: "#1d3557",
        fontSize: 18,
        fontWeight: "bold"
    }
});

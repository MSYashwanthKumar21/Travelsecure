import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// If you prefer a native date picker, import DateTimePicker as well

export default function TripForm({ onSubmit }) {
    const [tripName, setTripName] = useState('');
    const [tripDate, setTripDate] = useState('');
    const [totalBill, setTotalBill] = useState('');
    const [error, setError] = useState({});

    const handleSubmit = () => {
        let localError = {};
        if (!tripName) localError.tripName = true;
        if (!tripDate) localError.tripDate = true;
        if (!totalBill) localError.totalBill = true;
        if (isNaN(Number(totalBill))) localError.totalBill = true;

        setError(localError);

        if (Object.keys(localError).length > 0) {
            Alert.alert('Please fill all fields with valid data');
            return;
        }

        onSubmit({ tripName, tripDate, totalBill: Number(totalBill) });
        setTripName('');
        setTripDate('');
        setTotalBill('');
        setError({});
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Add a New Trip</Text>

            <View style={[
                styles.inputContainer,
                error.tripName && styles.inputError
            ]}>
                <Icon name="airplane-outline" size={18} color={primaryColor} style={{ marginRight: 10 }} />
                <TextInput
                    placeholder="Trip Name"
                    value={tripName}
                    onChangeText={setTripName}
                    style={styles.input}
                />
            </View>

            <View style={[
                styles.inputContainer,
                error.tripDate && styles.inputError
            ]}>
                <Icon name="calendar-outline" size={18} color={primaryColor} style={{ marginRight: 10 }} />
                <TextInput
                    placeholder="Trip Date (e.g., 2025-07-22)"
                    value={tripDate}
                    onChangeText={setTripDate}
                    style={styles.input}
                />
            </View>

            <View style={[
                styles.inputContainer,
                error.totalBill && styles.inputError
            ]}>
                <Icon name="cash-outline" size={18} color={primaryColor} style={{ marginRight: 10 }} />
                <TextInput
                    placeholder="Total Bill"
                    keyboardType="number-pad"
                    value={totalBill}
                    onChangeText={setTotalBill}
                    style={styles.input}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add Trip</Text>
            </TouchableOpacity>
        </View>
    );
}

const primaryColor = "#5c6bc0";

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        shadowColor: "#000",
        shadowOpacity: 0.14,
        shadowRadius: 8,
        elevation: 4,
        margin: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
        color: primaryColor,
        textAlign: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#f3f3f7",
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#e0e0ea"
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        fontSize: 16,
        fontFamily: 'Roboto'
    },
    inputError: {
        borderColor: "#ff6961",
        backgroundColor: "#fff0f0"
    },
    button: {
        backgroundColor: primaryColor,
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 12,
        elevation: 2
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 'bold'
    }
});

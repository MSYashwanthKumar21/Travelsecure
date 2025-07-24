import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import TripForm from '../components/TripForm';
import { loadTrips, saveTrips } from '../utils/storage';

export default function AddTrip({ navigation }) {
    const handleAddTrip = async (newTrip) => {
        const trips = await loadTrips();
        trips.push(newTrip);
        await saveTrips(trips);
        Alert.alert('Trip added successfully!');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TripForm onSubmit={handleAddTrip} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", backgroundColor: "#f5f6fa" },
});

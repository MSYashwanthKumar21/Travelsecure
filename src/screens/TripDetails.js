import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BillSplitter from '../components/BillSplitter';

export default function TripDetails({ route, navigation }) {
    const { trip } = route.params;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-outline" size={28} color="#5c6bc0" />
            </TouchableOpacity>
            <Text style={styles.title}>{trip.tripName}</Text>
            <Text style={styles.row}>Date: <Text style={styles.value}>{trip.tripDate}</Text></Text>
            <Text style={styles.row}>Total Bill: <Text style={styles.value}>₹{trip.totalBill}</Text></Text>
            <BillSplitter totalBill={trip.totalBill} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 22, backgroundColor: "#f5f6fa" },
    backButton: {
        position: "absolute",
        top: 25,
        left: 12,
        zIndex: 1,
        padding: 6,
        backgroundColor: "#fff",
        borderRadius: 22,
        elevation: 2
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#5c6bc0",
        marginTop: 14,
        marginBottom: 18,
        textAlign: "center"
    },
    row: { fontSize: 17, color: "#26282b", marginVertical: 4 },
    value: { fontWeight: "bold" }
});

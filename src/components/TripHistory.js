import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TripHistory({ trips, onSelect }) {
    return (
        <FlatList
            data={trips}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onSelect(item)} style={styles.cardItem}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{item.tripName}</Text>
                        <Text style={styles.date}>{item.tripDate}</Text>
                        <Text style={styles.bill}>Total Bill: ₹{item.totalBill}</Text>
                    </View>
                    <Icon name="chevron-forward-outline" size={25} color="#5c6bc0" />
                </TouchableOpacity>
            )}
            ListEmptyComponent={
                <Text style={styles.empty}>No trips added yet.</Text>
            }
            contentContainerStyle={{ paddingVertical: 10 }}
        />
    );
}

const styles = StyleSheet.create({
    cardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: 18,
        marginVertical: 7,
        marginHorizontal: 10,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 2,
    },
    title: { fontWeight: 'bold', fontSize: 18, marginBottom: 3 },
    date: { color: "#555", marginBottom: 2 },
    bill: { color: "#333", fontWeight: "500" },
    empty: { textAlign: "center", marginTop: 70, color: "#888", fontSize: 16 }
});

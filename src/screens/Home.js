import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import TripHistory from '../components/TripHistory';
import { loadTrips } from '../utils/storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home({ navigation }) {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadTrips().then(setTrips);
        });
        return unsubscribe;
    }, [navigation]);

    const handleSelectTrip = trip => {
        navigation.navigate('TripDetails', { trip });
    };

    return (
        <View style={styles.container}>
            <TripHistory trips={trips} onSelect={handleSelectTrip} />

            {/* Add Create Group and Join Group buttons */}
            <View style={styles.groupButtonsContainer}>
                <TouchableOpacity
                    style={[styles.groupButton, styles.createGroupButton]}
                    onPress={() => navigation.navigate('CreateGroup')}
                >
                    <Text style={styles.groupButtonText}>Create Group</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.groupButton, styles.joinGroupButton]}
                    onPress={() => navigation.navigate('JoinGroup')}
                >
                    <Text style={styles.groupButtonText}>Join Group</Text>
                </TouchableOpacity>
            </View>

            {/* Existing FAB buttons */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddTrip')}
            >
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.fabSecondary}
                onPress={() => navigation.navigate('MapScreen')}
            >
                <Icon name="map-outline" size={26} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f6fa' },

    groupButtonsContainer: {
        position: 'absolute',
        bottom: 180, // Adjust as needed
        right: 25,
        flexDirection: 'column',
        alignItems: 'flex-end',
        zIndex: 100,
    },
    groupButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 25,
        marginBottom: 12,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    createGroupButton: {
        backgroundColor: '#28a745', // green
    },
    joinGroupButton: {
        backgroundColor: '#007bff', // blue
    },
    groupButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    fab: {
        position: 'absolute',
        bottom: 32,
        right: 34,
        backgroundColor: '#ffb300',
        width: 62,
        height: 62,
        borderRadius: 31,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        zIndex: 22,
    },
    fabSecondary: {
        position: 'absolute',
        bottom: 115,
        right: 39,
        backgroundColor: '#5c6bc0',
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        zIndex: 21,
    },
});

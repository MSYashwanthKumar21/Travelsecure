import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

export default function MapScreen() {
    const [region, setRegion] = useState({
        latitude: 20, // fallback defaults (center of country)
        longitude: 78,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Can’t access location.');
                return;
            }
            setHasPermission(true);

            // Try fastest option first:
            let loc = await Location.getLastKnownPositionAsync();
            if (loc) {
                setRegion({ ...region, latitude: loc.coords.latitude, longitude: loc.coords.longitude });
            }
            // Then update with higher accuracy as available (background, not blocking map)
            Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low }) // or .Balanced
                .then(curLoc => {
                    setRegion({ ...region, latitude: curLoc.coords.latitude, longitude: curLoc.coords.longitude });
                });
        })();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                region={region}
                showsUserLocation={hasPermission}
                showsMyLocationButton={true}
            />
        </View>
    );
}

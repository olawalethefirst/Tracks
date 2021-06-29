import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Context as TrackContext } from '../context/TrackContext';
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({ navigation }) => {
    const { state } = useContext(TrackContext);
    const _id = navigation.getParam('_id');

    const track = state.find((t) => t._id === _id);

    return (
        <>
            <MapView
                style={styles.map}
                initialRegion={{
                    ...track.locations[0].coords,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                <Polyline
                    coordinates={track.locations.map((loc) => loc.coords)}
                />
            </MapView>
            <Text style={{ fontSize: 48 }}>{track.name}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        height: '50%',
    },
});

export default TrackDetailScreen;

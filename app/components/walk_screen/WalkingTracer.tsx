import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';

import { Dimensions } from 'react-native';
import useWalkStore, { getCurrentRegion } from '../../state/useWalkState';

export default function WalkingTracker() {
  const [modalVisible, setModalVisible] = useState(false);
  const { region, coords, isTracking, startTracking, stopTracking } = useWalkStore();
  const [displayRegion, setDisplayRegion] = useState<Region>();

  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const latitudeDelta = 0.003; // lub 0.002 dla większego zoomu
  const longitudeDelta = latitudeDelta * ASPECT_RATIO;

  useEffect(() => {
    if (!region) {
      getCurrentRegion().then(reg => reg && setDisplayRegion(reg));
    }
  }, [region]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <MapView
          style={styles.map}
          region={{
            latitude: region ? region.latitude : displayRegion?.latitude || 0,
            longitude: region ? region.longitude : displayRegion?.longitude || 0,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
        >
          {coords.length > 0 && (
            <>
              <Polyline coordinates={coords} strokeWidth={5} strokeColor='blue' />
              <Marker coordinate={coords[coords.length - 1]} />
            </>
          )}

          {/* Pinezka na środku regionu mapy */}
          <Marker
            coordinate={{
              latitude: region?.latitude ?? displayRegion?.latitude ?? 0,
              longitude: region?.longitude ?? displayRegion?.longitude ?? 0,
            }}
            title='Aktualna pozycja'
          />
        </MapView>

        {/* <View style={styles.buttons}>
          <Button title='Start' onPress={startTracking} disabled={isTracking} />
          <Button title='Stop' onPress={stopTracking} disabled={!isTracking} />
        </View> */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View style={styles.logsLogoButton}>
            <Ionicons name='logo-buffer' size={30} color='black' />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <Modal visible={modalVisible} animationType='slide'>
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
          <FlatList
            data={coords}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={props => <View style={{ width: '100%', height: 1, backgroundColor: 'orange' }} />}
            renderItem={({ item }) => (
              <View style={{ marginVertical: 2 }}>
                <Text>{item.altitude}</Text>
                <Text>{item.latitude}</Text>
                <Text>{item.longitude}</Text>
                <Text>{item.heading}</Text>
                <Text>{item.speed}</Text>
              </View>
            )}
          />

          <View style={{ marginTop: 20 }}>
            <Button
              title='Zamknij'
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    borderWidth: 2,
    borderColor: 'red',
  },
  header: {
    borderWidth: 2,
    borderColor: 'red',
    width: '100%',
    height: 50,
  },
  map: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  logsLogoButton: {
    position: 'absolute',
    bottom: 100,
    right: 50,
  },
});

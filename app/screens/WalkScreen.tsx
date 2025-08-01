import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import colors from '../config/colors';
import routes from '../navigation/routes';
import useWalkStore, { getCurrentRegion } from '../state/useWalkState';
import { WalkScreenDataScroller } from '../components/walk_screen/WalkScreenDataScroller';

export const WalkScreen = () => {
  const navigation = useNavigation<any>();
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

  const handleButtonPress = () => {
    isTracking ? handleStopTracking() : handleStartTracking();
  };

  const handleStartTracking = () => {
    startTracking();
  };

  const handleStopTracking = () => {
    stopTracking();
  };
  return (
    <View style={styles.container}>
      <View style={styles.dataScrollerContainer}>
        <WalkScreenDataScroller displayRegion={displayRegion} />
      </View>

      <TouchableOpacity style={styles.walkPreviewButton} onPress={() => navigation.navigate(routes.TRACKING)}>
        <MapView
          style={styles.map}
          region={{
            latitude: region ? region.latitude : displayRegion?.latitude || 0,
            longitude: region ? region.longitude : displayRegion?.longitude || 0,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
          pointerEvents='none'
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
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
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonWrapper} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>{(!isTracking && 'Start') || 'Zakończ'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  dataScrollerContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  walkPreviewButton: {
    height: 250,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  walkButtonText: {
    color: colors.textPimary,
  },
  buttonWrapper: {
    height: 80,
    backgroundColor: colors.secondary,
    marginVertical: 30,
    marginHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 40,
    color: colors.textPimary,
  },
});

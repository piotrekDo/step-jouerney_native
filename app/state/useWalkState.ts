import { create } from 'zustand';
import * as Location from 'expo-location';
import { Region } from 'react-native-maps';
import { Alert } from 'react-native';

interface WalkState {
  isTracking: boolean;
  region?: Region;
  coords: Location.LocationObjectCoords[];
  startTracking: () => Promise<void>;
  stopTracking: () => void;
}

const useWalkStore = create<WalkState>((set, get) => {
  let locationSubscription: Location.LocationSubscription | null = null;

  const startTracking = async () => {
    if (get().isTracking) return; 
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Brak uprawnień do lokalizacji');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const coords = location.coords;
    const region: Region = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    set({ isTracking: true, region, coords: [coords] });

    locationSubscription = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, distanceInterval: 1 },
      loc => {
        set(state => ({
          coords: [...state.coords, loc.coords],
          region: {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
        }));
      }
    );
  };

  const stopTracking = () => {
    if (locationSubscription) {
      locationSubscription.remove();
      locationSubscription = null;
    }
    set({ isTracking: false });
  };

  return {
    isTracking: false,
    coords: [],
    region: undefined,
    startTracking,
    stopTracking,
  };
});

export default useWalkStore;


export const getCurrentRegion = async (): Promise<Region | null> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  return {
    latitude,
    longitude,
    latitudeDelta: 0.01,   // zoom
    longitudeDelta: 0.01,
  };
};
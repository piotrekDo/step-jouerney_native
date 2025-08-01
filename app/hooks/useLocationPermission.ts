import { useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocationPermission = () => {
  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('You need to enable location permission to use this feature.');
      }
    };

    requestLocationPermission();
  }, []);
};

import { useNetInfo } from '@react-native-community/netinfo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import colors from './app/config/colors';
import { useLocationPermission } from './app/hooks/useLocationPermission';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthNavigator from './app/navigation/AuthNavigator';
import useAuth from './app/auth/useAuth';

const queryClient = new QueryClient();

export default function App() {
  const netinfo = useNetInfo();
  const { user } = useAuth();
  useLocationPermission();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={navigationTheme}>
        {!user ? <AuthNavigator /> : <AppNavigator />}
        <StatusBar style='light' />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import colors from '../config/colors';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import { ResponseType } from 'expo-auth-session';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export const WelcomeScreen = () => {
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      clientId: '1050965690976-lo8krpsetedhct7cmha64v75hqi3mpq2.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true } as any),
    },
    {
      // @ts-ignore
      useProxy: true,
    }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const res = response.authentication!;
      res.idToken;
      loginToBackend(res.idToken!);
    }
  }, [response]);

  const loginToBackend = async (idToken: string) => {
    try {
      const res = await axios.post('https://e7fb9845e724.ngrok-free.app/api/v1/auth/google', {
        idToken,
      });

      const jwt = res.data.token;
      console.log('JWT z backendu:', jwt);
      // Tu możesz zapisać token np. w AsyncStorage
    } catch (err) {
      console.error('Logowanie nie powiodło się:', err);
      Alert.alert('Błąd logowania', 'Nie udało się zalogować przez Google.');
    }
  };

  const onLoginPress = () => {
    promptAsync();
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.containerLogo}>
        <Image
          source={require('../assets/step_journey_logo_200x200.png')}
          style={{ width: '80%', height: '80%' }}
          resizeMode='contain'
        />
        <Text style={styles.header}>Welcome to Step Journey</Text>
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
          <Image source={require('../assets/g-logo.png')} style={styles.loginButtonLogo} />
          <Text style={styles.loginButtonText}>Zaloguj się przez Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  containerLogo: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButtons: {
    width: '70%',
    gap: 20,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  header: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  loginButtonLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#555555',
    fontWeight: '500',
  },
});

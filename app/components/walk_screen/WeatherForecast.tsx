import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import colors from '../../config/colors';
import { ForecastResponse } from '../../model/OpenWeather';
import { imageUrlByCodes } from './WeatherCodeMapper';

interface Props {
  weather: ForecastResponse;
}

const getTemperature = (tem: number) => {
  return Math.round(tem) + '°C';
};

export const WeatherForecast = ({ weather }: Props) => {
  const unknownWeather = '../../assets/storm.png';
  const currentHour = new Date().getHours();

  const currentHourCode = weather.hourly.weather_code[currentHour];
  const currenHourTemp = weather.hourly.temperature_2m[currentHour];

  const plusOneHourCode = weather.hourly.weather_code[currentHour + 1];
  const plusOneHourTemp = weather.hourly.temperature_2m[currentHour + 1];

  const plusTwoHoursCode = weather.hourly.weather_code[currentHour + 2];
  const plusTwoHoursTemp = weather.hourly.temperature_2m[currentHour + 2];

  return (
    <View style={styles.weatherContainer}>
      <View style={styles.singleHourWeatherContainer}>
        <Text style={styles.hourText}>{`${currentHour}:00`}</Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={imageUrlByCodes.get(currentHourCode) || require(unknownWeather)}
        />
        <Text>{getTemperature(currenHourTemp)}</Text>
      </View>
      <View style={styles.singleHourWeatherContainer}>
        <Text style={styles.hourText}>{`${currentHour + 1}:00`}</Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={imageUrlByCodes.get(plusOneHourCode) || require(unknownWeather)}
        />
        <Text>{getTemperature(plusOneHourTemp)}</Text>
      </View>
      <View style={styles.singleHourWeatherContainer}>
        <Text style={styles.hourText}>{`${currentHour + 2}:00`}</Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={imageUrlByCodes.get(plusTwoHoursCode) || require(unknownWeather)}
        />
        <Text>{getTemperature(plusTwoHoursTemp)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  hourText: {
    position: 'absolute',
    width: '100%',
    fontSize: 24,
    top: -28,
    left: 0,
    padding: 1,
    paddingLeft: 5,
    zIndex: -1,
    fontWeight: 'bold',
    borderTopRightRadius: 10,
    color: colors.textPimary,
    backgroundColor: colors.secondary,
  },
  singleHourWeatherContainer: {
    width: '30%',
    flex: 1,
    height: 200,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    backgroundColor: colors.primary,
  },
});

import { AxiosResponse } from 'axios';
import OpenMetaoApiClient from './OpenMetaoApiClient';
import { ForecastResponse } from '../model/OpenWeather';

export const fetchWeatherForecast = (latitude: number, longitude: number, signal?: AbortSignal) => {
  return OpenMetaoApiClient.get<ForecastResponse>('/forecast', {
    signal,
    params: {
      latitude: latitude,
      longitude: longitude,
      hourly: ['temperature_2m', 'weather_code'],
      timezone: 'auto',
      forecast_days: 3,
    },
  }).then((res: AxiosResponse<ForecastResponse>) => res.data);
};

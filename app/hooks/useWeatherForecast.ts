import { useQuery } from '@tanstack/react-query';
import { fetchWeatherForecast } from '../http/OpenMeteoHttpService';
import { ForecastResponse } from '../model/OpenWeather';

const useWeatherForecast = (latitude?: number, longitude?: number) => {
  return useQuery<ForecastResponse, Error>({
    queryKey: ['forecast'],
    queryFn: ({ signal }) => fetchWeatherForecast(latitude as number, longitude as number, signal),
    enabled: latitude != undefined && longitude != undefined,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });
};

export default useWeatherForecast;

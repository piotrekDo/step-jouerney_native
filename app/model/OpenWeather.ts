export interface ForecastResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}

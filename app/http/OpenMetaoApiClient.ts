import axios, { AxiosInstance } from 'axios';
import { OPEN_METEO_BASE_URL } from '../config/http';

class OpenMeteoApiClient {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create();
    this.axiosInstance.interceptors.request.use(config => {
      config.baseURL = OPEN_METEO_BASE_URL;
      return config;
    });
  }
}

export default new OpenMeteoApiClient().axiosInstance;

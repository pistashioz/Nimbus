import { defineStore } from 'pinia';
import { fetchWeatherDataByCoordinates, fetchFiveDayForecastByCoordinates, fetchAirQualityByCoordinates } from '@/weatherService';

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    userWeather: {
      region: '',
      locations: [],
    },
    weatherData: {},
    regionWeatherData: {},
  }),
  actions: {
    updateUserWeather(region, locations) {
      this.userWeather.region = region;
      this.userWeather.locations = locations;
      this.fetchRegionWeather();
      this.fetchWeatherForAllLocations();
    },
    async fetchRegionWeather() {
      const { latitude, longitude } = this.userWeather.region;
      try {
        const [currentWeather, fiveDayForecast, airQuality] = await Promise.all([
          fetchWeatherDataByCoordinates(latitude, longitude),
          fetchFiveDayForecastByCoordinates(latitude, longitude),
          fetchAirQualityByCoordinates(latitude, longitude)
        ]);
        this.regionWeatherData = { currentWeather, fiveDayForecast, airQuality };
      } catch (error) {
        console.error('Error fetching region weather data:', error);
      }
    },
    async fetchWeatherForAllLocations() {
      try {
        const weatherDataPromises = this.userWeather.locations.map(async (location) => {
          const { lat, lng } = location;
          const [currentWeather, fiveDayForecast, airQuality] = await Promise.all([
            fetchWeatherDataByCoordinates(lat, lng),
            fetchFiveDayForecastByCoordinates(lat, lng),
            fetchAirQualityByCoordinates(lat, lng)
          ]);
          return { currentWeather, fiveDayForecast, airQuality };
        });
        this.weatherData = { region: this.userWeather.region, locations: await Promise.all(weatherDataPromises) };
      } catch (error) {
        console.error('Error fetching weather data for all locations:', error);
      }
    },
  },
  persist: true,
});

import { defineStore } from "pinia";
import { fetchWeatherDataByCoordinates, fetchFiveDayForecastByCoordinates, fetchAirQualityByCoordinates } from "@/weatherService";

// Ensure that the initial state is properly initialized
export const useWeatherStore = defineStore("weather", {
  state: () => ({
    userWeather: { region: { latitude: null, longitude: null }, locations: [] },
    weatherData: { locations: [] },
    regionWeatherData: {
      currentWeather: null,
      fiveDayForecast: null,
      airQuality: null,
    },
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
      if (latitude && longitude) {
        try {
          const [currentWeather, fiveDayForecast, airQuality] = await Promise.all([
            fetchWeatherDataByCoordinates(latitude, longitude),
            fetchFiveDayForecastByCoordinates(latitude, longitude),
            fetchAirQualityByCoordinates(latitude, longitude),
          ]);
          this.regionWeatherData = { currentWeather, fiveDayForecast, airQuality };
        } catch (error) {
          console.error("Error fetching region weather data:", error);
        }
      } else {
        console.error("Region coordinates are undefined");
      }
    },
    async fetchWeatherForAllLocations() {
      try {
        const weatherDataPromises = this.userWeather.locations.map(async ({ latitude, longitude }) => {
          if (!latitude || !longitude) {
            console.error("Location coordinates are undefined");
            return { currentWeather: null, fiveDayForecast: null, airQuality: null };
          }
          const [currentWeather, fiveDayForecast, airQuality] = await Promise.all([
            fetchWeatherDataByCoordinates(latitude, longitude),
            fetchFiveDayForecastByCoordinates(latitude, longitude),
            fetchAirQualityByCoordinates(latitude, longitude),
          ]);
          return { currentWeather, fiveDayForecast, airQuality };
        });

        const weatherData = await Promise.all(weatherDataPromises);
        this.weatherData.locations = weatherData;
      } catch (error) {
        console.error("Error fetching weather data for all locations:", error);
      }
    },
  },
  persist: true,
});

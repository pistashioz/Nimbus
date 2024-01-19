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
     
        // Fetch weather data for the region
        this.fetchRegionWeather();
  
        // Fetch weather data for all locations
        this.fetchWeatherForAllLocations();
      },
      async fetchRegionWeather() {
      
      // Use coordinates for fetching weather data
      const { latitude, longitude } = this.userWeather.region;
      console.log(this.userWeather.region);
      console.log(latitude);
      console.log(longitude);
      const currentWeather = await fetchWeatherDataByCoordinates(latitude, longitude);
      const fiveDayForecast = await fetchFiveDayForecastByCoordinates(latitude, longitude);
      const airQuality = await fetchAirQualityByCoordinates(latitude, longitude);

      // Update regionWeatherData
      this.regionWeatherData = { currentWeather, fiveDayForecast, airQuality };
  
      },

      async fetchWeatherForAllLocations() {
        // Fetch weather data for each location using their coordinates
        const weatherDataPromises = this.userWeather.locations.map(async (location) => {
          console.log(location);
          const { lat, lng } = location; // Use lat and lng instead of main_text
          console.log(lat);
          console.log(lng);
          const currentWeather = await fetchWeatherDataByCoordinates(lat, lng);
          const fiveDayForecast = await fetchFiveDayForecastByCoordinates(lat, lng);
          const airQuality = await fetchAirQualityByCoordinates(lat, lng);
  
          return { currentWeather, fiveDayForecast, airQuality };
        });
  
        // Await all promises and update weatherData
        this.weatherData = { region: this.userWeather.region, locations: await Promise.all(weatherDataPromises) };
      },
    },
  persist: true, 
});

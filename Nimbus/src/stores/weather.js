import { defineStore } from 'pinia';
import { fetchDataByCityName, fetchFiveDayForecast, fetchAirQuality } from '@/weatherService';

export const useWeatherStore = defineStore({
  id: 'weather',
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
      console.log(region, locations);
        // Extract city names from the descriptions
        const cityNames = locations.map(location => location.main_text);
        
        this.userWeather.locations = cityNames;
        console.log(this.userWeather);
        // Fetch weather data for the region
        this.fetchRegionWeather();
  
        // Fetch weather data for all locations
        this.fetchWeatherForAllLocations();
      },
      async fetchRegionWeather() {
        try {
          const { region } = this.userWeather;
  
          // Fetch weather data for the region
          const currentWeather = await fetchDataByCityName(region);
          const fiveDayForecast = await fetchFiveDayForecast(region);
          const airQuality = await fetchAirQuality(region);
  
          this.regionWeatherData = {
            currentWeather,
            fiveDayForecast,
            airQuality,
          };
          return this.regionWeatherData
        } catch (error) {
          console.error(error);
        }
      },
      async fetchWeatherForAllLocations() {
        try {
          const { locations } = this.userWeather;
          console.log(locations)
          // Fetch weather data for each location
          const weatherDataPromises = locations.map(async (location) => {
            const currentWeather = await fetchDataByCityName(location);
            const fiveDayForecast = await fetchFiveDayForecast(location);
            const airQuality = await fetchAirQuality(location);
  
            return {
              currentWeather,
              fiveDayForecast,
              airQuality,
            };
          });
  
          const weatherDataArray = await Promise.all(weatherDataPromises);
  
          this.weatherData = {
            region: this.userWeather.region,
            locations: weatherDataArray,
          };
          console.log('weather data',this.weatherData)
        } catch (error) {
          console.error(error);
        }
      },
    },
    async fetchWeatherByCity(cityName) {
        try {
          const currentWeather = await fetchDataByCityName(cityName);
          const airQuality = await fetchAirQuality(cityName);
          const fiveDayForecast = await fetchFiveDayForecast(cityName);
  
          return {
            currentWeather,
            airQuality,
            fiveDayForecast,
          };
        } catch (error) {
          console.error('Error fetching weather data by city:', error);
          throw error;
        }
      },
  persist: true, 
});

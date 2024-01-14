import { defineStore } from 'pinia';

const WEATHER_API_BASE_URL = 'http://api.openweathermap.org/data/2.5/';

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    api_key: '39d7058ef12ab5dae395f420fd79ec5a',
    url_base: WEATHER_API_BASE_URL,
    query: '',
    weather: {},
    five_day_forecast: {},
    air_quality: {},
  }),
  actions: {
    async fetchDataByCityName() {
      try {
        const weatherResponse = await api.get(
          this.url_base,
          `weather?q=${this.query}&units=metric&APPID=${this.api_key}`
        );
        this.setWeatherResults(weatherResponse);

        const forecastResponse = await api.get(
          this.url_base,
          `forecast?lat=${this.weather.coord.lat}&lon=${this.weather.coord.lon}&appid=${this.api_key}`
        );
        this.setFiveDayForecastResults(forecastResponse);

        const airQualityResponse = await api.get(
          this.url_base,
          `air_pollution?lat=${this.weather.coord.lat}&lon=${this.weather.coord.lon}&appid=${this.api_key}`
        );
        this.setAirQualityResults(airQualityResponse);

      } catch (error) {
        console.error('Error fetching data by city name:', error);
        throw error;
      }
    },
    setWeatherResults(results) {
      this.weather = results;
      console.log(results);
    },
    setFiveDayForecastResults(response) {
      this.five_day_forecast = response;
      // console.log(this.five_day_forecast.list[0].pop)
    },
    setAirQualityResults(response) {
      this.air_quality = response;
      // console.log(this.air_quality.list[0].main.aqi)
    },
  },
});


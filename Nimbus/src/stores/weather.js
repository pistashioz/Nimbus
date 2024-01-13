import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    api_key: '39d7058ef12ab5dae395f420fd79ec5a',
    url_base: 'http://api.openweathermap.org/data/2.5/',
    query: '',
    weather: {},
    five_day_forecast: {},
    air_quality: {},
  }),
  actions: {
    async fetchWeather() {
      try {
        if (e.key == "Enter") {
          const response = await fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`);
          const results = await response.json();
          this.setResults(results);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
    setResults(results) {
      this.weather = results;
      console.log(results);
    },
    async fetchFiveDayForecast() {
      try {
        const { lat, lon } = this.weather.coord;
        const response = await fetch(`${this.url_base}forecast?lat=${lat}&lon=${lon}&appid=${this.api_key}`);
        const data = await response.json();
        this.setFiveDayForecastResults(data);
      } catch (error) {
        console.error('Error fetching 5 day weather forecast:', error);
      }
    },
    setFiveDayForecastResults(response) {
      this.five_day_forecast = response;
      //console.log(this.five_day_forecast.list[0].pop)
    },
    async fetchAirQuality() {
      try {
        const { lat, lon } = this.weather.coord;
        const response = await fetch(`${this.url_base}air_pollution?lat=${lat}&lon=${lon}&appid=${this.api_key}`);
        const data = await response.json();
        this.setAirQualityResults(data);
        this.calculateSunPosition();
      } catch (error) {
        console.error('Error fetching air pollution data:', error);
      }
    },
  
    setAirQualityResults(response) {
      this.air_quality = response;
      //console.log(this.air_quality.list[0].main.aqi)
    },
  },
});
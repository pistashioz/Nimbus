import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    api_key: '39d7058ef12ab5dae395f420fd79ec5a',
    url_base: 'http://api.openweathermap.org/data/2.5/',
    query: '',
    weather: {},
    hourlyForecast: [],
    popForToday: [],
  }),
  getters: {
    getWeather: (state) => state.weather,
    getHourlyForecast: (state) => state.hourlyForecast,
    getPopForToday: (state) => state.popForToday,
  },
  actions: {
    async fetchWeather() {
      if (e.key == "Enter") {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
          .then(res => {
            return res.json();
          }).then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = results;
    },
  },
});
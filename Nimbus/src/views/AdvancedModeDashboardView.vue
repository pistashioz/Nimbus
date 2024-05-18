<template>
  <main class="dash-body2">
    <div class="gridAM">
      <div class="div0AM gridCellAM">
        <HeaderDashboard />
      </div>
      <section v-if="isWeatherLoaded" id="basicInfoToday" class="div1AM gridCellAM">
        <div id="containerBasicWeatherInfo">
          <img
            :src="getWeatherIcon(weather?.weather?.[0]?.icon)"
            id="todaysWeatherIconAdvancedMode"
            width="100"
            height="100"
            alt="Weather Icon"
          />
          <div id="headerBasicWeatherInfo">
            <div v-if="!isWeatherLoaded" class="skeleton-loader"></div>
            <h1 v-else id="currentTemperatureHeader">{{ Math.round(weather?.main?.temp || 0) }}°</h1>
            <h2 id="degreeTypeHeader">C</h2>
            <div id="locationAdvancedMode">
              <div class="locationAdvancedMode-row">
                <font-awesome-icon icon="location-dot" style="color: #303030;" id="locationIconAdvancedMode" aria-label="Location Icon" />
                <h2 id="locationCityAdvancedMode">{{ weather?.name || 'Unknown' }}</h2>
              </div>
              <p v-if="currentTime" id="time">{{ currentTime }}</p>
            </div>
          </div>
        </div>
        <div id="containerTodayCalendar">
          <div id="month" aria-label="Current Month">{{ currentMonth }}</div>
          <div id="dateAndDayAdvancedMode">
            <h2 id="dateAdvancedMode" aria-label="Current Date">{{ currentDate }}</h2>
            <h3 id="dayAdvancedMode" aria-label="Current Day of Week">{{ currentDayOfWeek }}</h3>
          </div>
        </div>
      </section>
      <section id="citiesContainer" class="div2AM gridCellAM">
        <div v-for="(city, index) in weatherCity" :key="index" class="cityContainer">
          <div class="cityContainerHeader">
            <div class="cityName">{{ city?.name || 'Unknown' }}</div>
            <div class="countryName" v-if="countryMapping[city?.sys?.country]">{{ countryMapping[city?.sys?.country] }}</div>
          </div>
          <img
            class="cityWeatherIcon"
            :src="getWeatherIcon(city?.weather?.[0]?.icon)"
            width="50"
            height="50"
            alt="Weather Icon"
          />
          <div class="cityContainerTemperature">
            <h2 class="currentTempCityContainer">{{ Math.round(city?.main?.temp || 0) }}°</h2>
            <h3 class="maxTempCityContainer"> / {{ Math.round(city?.main?.temp_max || 0) }}°</h3>
          </div>
        </div>
      </section>
      <div class="div3AM gridCellAM">
        <section id="containerNimbusNudges">
          <div id="headerNimbusNudges">
            <h3 id="titleNimbusNudges">Nimbus Nudges</h3>
            <div id="buttonsHeaderNimbusNudges">
              <button id="leftNimbusNudges" aria-label="Previous Nudge">
                <font-awesome-icon icon="fa-solid fa-arrow-left" style="color: #303030;" />
              </button>
              <button id="rightNimbusNudges" aria-label="Next Nudge">
                <font-awesome-icon icon="fa-solid fa-arrow-right" style="color: #303030;" />
              </button>
            </div>
          </div>
          <div id="nimbusNudgesData">Step into the sun's embrace for a mood-lifting dose of vitamin D, but ensure skin protection by applying sunscreen. Make the most of this radiant day! ☀️</div>
          <div id="buttonsOptionsNimbusNudges">
            <button id="allClearBtn" aria-label="All Clear">ALL CLEAR!</button>
            <button id="quietTheSkiesBtn" aria-label="Quiet the Skies">QUIET THE SKIES</button>
          </div>
        </section>
      </div>
      <section id="temperatureGraphContainerAdvancedMode" class="div4AM gridCellAM">
  <picture>
    <source 
      srcset="@/assets/img/graphAdvancedMode_small.webp 960w,
              @/assets/img/graphAdvancedMode_medium.webp 1024w,
              @/assets/img/graphAdvancedMode_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             40vw"
      type="image/webp">
    <source 
      srcset="@/assets/img/graphAdvancedMode_small.png 960w,
              @/assets/img/graphAdvancedMode_medium.png 1024w,
              @/assets/img/graphAdvancedMode_large.png 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             80vw"
      type="image/jpeg">
    <img src="@/assets/img/graphAdvancedMode_large.png" id="imgGraphAdvancedMode" alt="Graph of temperature over time" width="800" height="400">
  </picture>
</section>

      <section id='weatherInfoAdvancedModeContainer' class="div5AM gridCellAM">
        <div id='windContainerAdvancedMode'>
          <div class='headerContainers'>
            <h2 class='weatherInfoContainerHeader' id='windTitle'>Wind</h2>
            <img class='weatherInfoIllustrations' src='@/assets/img/windIcon.min.svg' width="24" height="24" alt="Wind" >
          </div>
          <h3 class='dataContainers'>{{ weather.wind?.speed }} m/s</h3>
        </div>
        <div id='rainContainerAdvancedMode'>
          <div class='headerContainers'>
            <h2 class='weatherInfoContainerHeader' id='rainTitle'>Rain</h2>
            <img class='weatherInfoIllustrations' src='@/assets/img/rainIcon.min.svg' width="24" height="24" alt="Rain" >
          </div>
          <h3 class='dataContainers'>
            {{ weatherStore.regionWeatherData.fiveDayForecast?.list[0]?.pop !== undefined ? Math.round(weatherStore.regionWeatherData.fiveDayForecast.list[0].pop * 100) : 'N/A' }} %
          </h3>
        </div>
        <div id='humidityContainerAdvancedMode'>
          <div class='headerContainers'>
            <h2 class='weatherInfoContainerHeader' id='humidityTitle'>Humidity</h2>
            <img class='weatherInfoIllustrations' src='@/assets/img/humidityIcon.min.svg' width="18" height="24" alt="Humidity" style="padding-right: 0.2em;" >
          </div>
          <h3 class='dataContainers'>{{ weather.main?.humidity }} %</h3>
        </div>
        <div id='wavesContainerAdvancedMode'>
          <div class='headerContainers'>
            <h2 class='weatherInfoContainerHeader' id='wavesTitle'>Sea Levels</h2>
            <img class='weatherInfoIllustrations' src='@/assets/img/water-waves.min.svg' width="24" height="24" alt="Sea Levels" >
          </div>
          <h3 class='dataContainers' v-if="weather.main?.sea_level">{{ weather.main.sea_level }} hPa</h3>
          <h3 class='dataContainers' v-else>N/A</h3>
        </div>
        <div id='visibilityContainerAdvancedMode'>
          <div class='headerContainers'>
            <h2 class='weatherInfoContainerHeader' id='visibilityTitle'>Visibility</h2>
            <img class='weatherInfoIllustrations' src='@/assets/img/eye.min.svg' width="24" height="24" alt="Visibility" >
          </div>
          <h3 class='dataContainers'>{{ weather.visibility ? weather.visibility / 1000 : 'N/A' }} km</h3>
        </div>
        <div id='pressureContainerAdvancedMode'>
          <div class='headerContainers'>
            <h2 class='weatherInfoContainerHeader' id='pressureTitle'>Pressure</h2>
            <img class='weatherInfoIllustrations' src='@/assets/img/pressureIcon.min.svg' width="20" height="24" alt="Pressure" style="padding-right: 0.1em;">
          </div>
          <h3 class='dataContainers'>{{ weather.main?.pressure }} hPa</h3>
        </div>
      </section>
      <section id='calendarAdvancedMode' class="div6AM gridCellAM">
        <div class="calendarHeaderAdvancedMode">
          <span id="monthCalendar">{{ currentMonth }}</span>
          <span id="yearCalendar">{{ currentYear }}</span>
        </div>
        <div class="calendar-days">
          <div v-for="day in daysOfWeek" :key="day" class="day">{{ day }}</div>
          <div v-for="blank in firstDayOfMonth" :key="blank" class="blank"></div>
          <div v-for="date in daysInMonth" :key="date" :class="{ 'today': date === currentDay }" class="date">{{ date }}</div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { useWeatherStore } from '@/stores/weather';
import HeaderDashboard from "@/components/HeaderDashboard.vue";

export default {
  name: 'advancedMode',
  data() {
    return {
      isWeatherLoaded: false,
      currentTime: '',
      weatherCity: [],
      weather: null,
      countryMapping: {},
      daysOfWeek: ["M", "T", "W", "T", "F", "S", "S"],
      currentYear: new Date().getFullYear(),
      currentDay: new Date().getDate(),
    };
  },
  components: {
    HeaderDashboard,
  },
  async beforeMount() {
    await this.initData();
    this.isWeatherLoaded = true;
  },
  computed: {
    weatherStore() {
      return useWeatherStore();
    },
    currentDate() {
      const date = new Date().getDate();
      return date < 10 ? `0${date}` : date.toString();
    },
    currentMonth() {
      const monthIndex = new Date().getMonth();
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      return months[monthIndex];
    },
    currentDayOfWeek() {
      const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
      const dayIndex = new Date().getDay();
      return daysOfWeek[dayIndex];
    },
    daysInMonth() {
      return new Date(this.currentYear, new Date().getMonth() + 1, 0).getDate();
    },
  },
  watch: {
    weatherStore: {
      immediate: true,
      handler(newVal) {
        console.log("Weather Store:", newVal);
      }
    }
  },
  methods: {
    async initData() {
      await Promise.all([this.fetchWeather(), this.fetchCountries()]);
    },
    async fetchCountries() {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error('Failed to fetch countries');
        const countries = await response.json();
        this.countryMapping = countries.reduce((acc, country) => {
          acc[country.cca2] = country.name.common;
          return acc;
        }, {});
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    },
    async fetchWeather() {
      try {
        if (!this.weatherStore.regionWeatherData.currentWeather) {
          await this.weatherStore.fetchRegionWeather();
        }
        this.weather = this.weatherStore.regionWeatherData.currentWeather;

        if (this.weatherStore.weatherData.locations.length === 0) {
          await this.weatherStore.fetchWeatherForAllLocations();
        }
        this.weatherCity = this.weatherStore.weatherData.locations.map(locationData => locationData.currentWeather).filter(city => city !== null);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
    updateCurrentTime() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      this.currentTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    },
    startUpdatingTime() {
      this.updateCurrentTime();
      setInterval(this.updateCurrentTime, 1000);
    },
    getWeatherIcon(iconCode) {
      const baseUrl = 'https://openweathermap.org/img/wn/';
      return `${baseUrl}${iconCode}@2x.png`;
    }
  }
};
</script>

<style>
.v-main {
  align-items: center;
  overflow: hidden;
}

.dash-body2 {
  transform: translateY(8.8rem);
  height: fit-content;
} 

.gridAM {
  display: grid;
  grid-template-columns: 1fr 3rem 11.25rem 18rem;
  grid-template-rows: 50px 300px 300.34px;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  height: 860px;
  width: 1260px;
}

.gridCellAM {
  background-color: #EDDED4;
  border: 1px solid #303030;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease-in-out; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.div0AM { 
  grid-area: 1 / 1 / 2 / 5;
  border-radius: 50px 50px 10px 10px;
}

.div1AM {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
}

.div2AM { 
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
}

.div3AM {
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 3;
}

.div4AM { 
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 3;
}

.div5AM {
  grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 4;
}

.div5AM.gridCellAM { 
  justify-content: flex-start;
  overflow: visible;
  border: 0;
}

.div6AM {
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 3;
  grid-row-end: 4;
}

#backBtn {
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 100px;
  border: 0.1em solid #303030;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  margin: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

#backIcon {
  font-size: 1.5em;
}

#containerTodayCalendar {
  width: 7.875rem;
  height: 9.625rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #F2E6DD;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

#locationIconAdvancedMode {
  transform: translateY(-4px);
}

#locationAdvancedMode {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.locationAdvancedMode-row {
  display: flex;
  align-items: flex-end;
}

#locationAdvancedMode p {
  margin: 0;
}

#locationAdvancedMode h2 {
  margin: 0 0 0 0.3rem;
}

#time {
  color: #303030;
  font-family: Recoleta;
  font-size: 1.25rem;
  font-weight: 300;
  line-height: normal;
  margin-left: 0.5em;
}

#degreeTypeHeader {
  color: #303030;
  font-family: Recoleta;
  font-size: 3rem;
  font-weight: 600;
  line-height: normal;
  position: absolute;
  transform: translateY(4%);
  margin: 0;
}

.skeleton-loader {
  width: 100px;
  height: 50px;
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: shimmer 1s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: -100%;
  }
  100% {
    background-position: 100%;
  }
}

#currentTemperatureHeader {
  color: #303030;
  font-family: Recoleta;
  font-size: 6rem;
  font-weight: 600;
  line-height: normal;
  margin: 0;
}

#headerBasicWeatherInfo {
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
}

#containerBasicWeatherInfo {
  width: 60%;
  padding: 1rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: var(--secondary-color-palette-20-saturation-sky-wash-20-sat, #DFEFFB);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#basicInfoToday {
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: var(--Primary-Color-Palette-Sunbeam-Gold, #FAC54B);
  display: flex;
  align-items: center;
  justify-content: space-around;
}

#locationCityAdvancedMode,
#locationIconAdvancedMode {
  align-items: center;
  color: #303030;
  font-family: Asap;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: normal;
}

#locationCityAdvancedMode {
  padding-right: 0.3em;
}

#locationCity {
  margin-right: 2em;
}

#month,
#dateAndDayAdvancedMode {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#month {
  height: 2.75rem;
  border-radius: 1.0rem 1.0rem 0rem 0rem;
  background: #E74727;
  color: #303030;
  font-family: Asap;
  font-size: 1.25rem;
  font-weight: 800;
}

#dateAndDayAdvancedMode {
  height: 7em;
  flex-direction: column;
}

#dateAdvancedMode,
#dayAdvancedMode {
  color: #303030;
  margin: 0;
}

#dateAdvancedMode {
  font-family: Recoleta;
  font-size: 3.75rem;
  font-weight: 700;
}

#dayAdvancedMode {
  font-family: Asap;
  font-size: 1.25rem;
  font-weight: 400;
}

#citiesContainer {
  background: var(--secondary-color-palette-20-saturation-orchid-flush-20-sat, #E15CC9);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.cityContainer {
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #F2E6DD;
  width: 5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.8rem;
}

.cityContainerHeader {
  width: 100%;
  justify-self: flex-start;
  height: 1.55625rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 5;
}

.cityName {
  color: #E65E2A;
  font-family: Asap;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
}

.countryName {
  color: #303030;
  font-family: Asap;
  font-size: 0.625rem;
  font-weight: 700;
  line-height: normal;
}

#containerNimbusNudges {
  width: 100%;
  height: 100%;
  border-radius: 1.25rem;
  background: var(--background-color);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;
}

#headerNimbusNudges {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#titleNimbusNudges {
  color: var(--text-color);
  font-family: Asap;
  font-size: 1.125rem;
  font-weight: 800;
  margin: 0;
}

#nimbusNudgesData {
  width: 100%;
  padding: 0.8rem 1rem;
}

#buttonsHeaderNimbusNudges {
  display: flex;
  gap: 1rem;
}

#buttonsHeaderNimbusNudges button {
  background-color: var(--secondary-background-color);
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
}

#buttonsOptionsNimbusNudges {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}

#buttonsOptionsNimbusNudges button {
  display: inline-flex;
  padding: 0.375rem 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid #000;
  font-family: Asap;
  font-size: 0.8rem;
  font-weight: 250;
  text-transform: uppercase;
}

#allClearBtn {
  background: var(--spring-bud-color);
  color: var(--text-color);
}

#quietTheSkiesBtn {
  background: var(--orchid-flush-color);
  color: var(--text-color);
}

#todaysWeatherIconAdvancedMode {
  width: 100px;
  height: 100px;
}

.cityWeatherIcon {
  width: 50px;
  height: 50px;
  z-index: 2;
}

.cityContainerTemperature {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 1em;
}

.currentTempCityContainer {
  color: #303030;
  text-align: right;
  font-family: Asap;
  font-size: 1.5625rem;
  font-weight: 700;
  line-height: normal;
  margin-right: 0.3rem;
}

.maxTempCityContainer {
  color: #303030;
  text-align: right;
  font-family: Asap;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: normal;
  margin: 0;
  margin-left: -0.5em;
  margin-bottom: -0.5em;
}

#temperatureGraphContainerAdvancedMode {
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #F2E6DD;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Ensure the content doesn't overflow */
  max-width: 100%;
}

#imgGraphAdvancedMode {
  width: 100%;
  height: auto;
  object-fit: contain; /* Ensure the image scales without distortion */
}

#weatherInfoAdvancedModeContainer {
  display: flex;
  flex-direction: column;
}

#windContainerAdvancedMode:hover {
  transform: translateY(-1.5em);
}

#rainContainerAdvancedMode:hover {
  transform: translateY(-4em); /* Different translate value */
}

#humidityContainerAdvancedMode:hover {
  transform: translateY(-6.6em); /* Different translate value */
}

#wavesContainerAdvancedMode:hover {
  transform: translateY(-9.2em); /* Different translate value */
}

#visibilityContainerAdvancedMode:hover {
  transform: translateY(-11.6em); /* Different translate value */
}

#weatherInfoAdvancedModeContainer > div {
  transition: transform 0.3s ease-in-out;
}

#weatherInfoAdvancedModeContainer #pressureContainerAdvancedMode {
  border-radius: 1.25rem;
}

#windContainerAdvancedMode,
#rainContainerAdvancedMode,
#humidityContainerAdvancedMode,
#wavesContainerAdvancedMode,
#visibilityContainerAdvancedMode,
#pressureContainerAdvancedMode {
  width: 11.25rem;
  height: fit-content;
  padding-bottom: 1rem;
  flex-shrink: 0;
  border-radius: 1.25rem 1.25rem 0rem 0rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

#windContainerAdvancedMode {
  background: #C8BDFF;
}

#rainContainerAdvancedMode {
  background: #43AA8B;
  transform: translateY(-40px);
}

#humidityContainerAdvancedMode {
  background: #FFEA8A;
  transform: translateY(-80px);
}

#wavesContainerAdvancedMode {
  background: #F4F4F4;
  transform: translateY(-120px);
}

#visibilityContainerAdvancedMode {
  background: #FFA646;
  transform: translateY(-160px);
}

#pressureContainerAdvancedMode {
  background: #FFBEED;
  transform: translateY(-200px);
}

.headerContainers {
  display: flex;
  width: 80%;
  justify-content: space-between;
  height: 2em;
  align-items: center;
  padding-left: 1.13em;
  padding-right: 0.81em;
  color: #303030;
  font-family: Asap;
  font-size: 1rem;
  font-weight: 700;
  line-height: normal;
  padding-top: 0.40em;
  flex-direction: row;
}

#pressureTitle {
  color: #B21C29;
}

#windTitle {
  color: #685E9A;
}

#rainTitle {
  color: #185850;
}

#humidityTitle {
  color: #826022;
}

#wavesTitle {
  color: #303030;
  font-size: 1.4rem;
}

#visibilityTitle {
  color: #9B4F19;
}

.dataContainers {
  width: auto;
  height: auto;
  flex-shrink: 0;
  color: #484848;
  font-family: Asap;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: normal;
  display: flex;
  justify-content: center;
  margin: 0;
  margin-top: 0.2em;
  margin-left: 1.13em;
}

#calendarAdvancedMode {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: var(--secondary-color-palette-30-saturation-spring-bud-30-sat, #E1E2CB);
}

.calendarHeaderAdvancedMode {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #303030;
  font-family: Asap;
  font-weight: 800;
  line-height: normal;
  margin: 0;
  margin-top: 1em;
  margin-left: 1.3rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.calendarHeaderAdvancedMode #monthCalendar {
  margin-right: 1rem;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-self: center;
  gap: 0.3rem;
  color: #000;
  font-family: Asap;
  font-size: 0.9rem;
  font-weight: 250;
  line-height: normal;
  margin: 0;
  margin-top: 1.3rem;
  margin-bottom: 1.3rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.day,
.blank,
.date {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.blank {
  visibility: hidden;
}

.today {
  background-color: #E18AD1;
  border: 1px solid #303030;
  color: #303030;
  width: 2.0625rem;
  height: 2.0625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
</style>
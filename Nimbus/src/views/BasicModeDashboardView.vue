<script>
import moment from "moment";
import ArrowButton from "@/components/ArrowButton.vue";
import HeaderDashboard from "@/components/HeaderDashboard.vue";
import { useUserStore } from "@/stores/user";
import { useWeatherStore } from "@/stores/weather";

export default {
  name: "basicMode",
  data() {
    return {
      weather: {},
      five_day_forecast: {},
      air_quality: {},
      region: "",
    };
  },
  components: {
    ArrowButton,
    HeaderDashboard,
  },
  created() {
    this.region = this.userLocation.region || "";
    this.fetchWeather()
      .then(() => {
        console.log("Weather data fetched");
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  },
  mounted() {
    this.$nextTick(() => {
      this.calculateSunPosition();
    });
  },
  computed: {
    store: () => useUserStore(),
    weatherStore: () => useWeatherStore(),
    weatherData() {
      return this.weatherStore.weatherData;
    },
    regionWeatherData() {
      return this.weatherStore.regionWeatherData;
    },
    isUser() {
      return this.store.isUser;
    },
    getAuthenticatedUser() {
      return this.store.authenticatedUser;
    },
    userLocations() {
      return this.getAuthenticatedUser.userLocations;
    },
    userLocation() {
      return this.getAuthenticatedUser.userRegion;
    },
    getWeatherAltText() {
      let weatherMain = this.weather.weather[0].main.toLowerCase();
      switch (weatherMain) {
        case "clear":
          return "Clear Sky";
        case "clouds":
          return "Cloudy";
        case "rain":
          return "Rainy";
        case "thunderstorm":
          return "Thunderstorm";
        case "snow":
          return "Snowy";
        case "mist":
          return "Misty";
        default:
          return "Unknown Weather";
      }
    },
    getWeatherTodayIllustration() {
      let weatherMain = this.weather.weather[0].main.toLowerCase();
      switch (weatherMain) {
        case "clear":
        default:
          return require("@/assets/img/sunnyImg.png");
        case "clouds":
          return require("@/assets/img/cloudyImg.png");
        case "rain":
          return require("@/assets/img/rainImg.png");
        case "thunderstorm":
          return require("@/assets/img/thunderImg.png");
        case "snow":
          return require("@/assets/img/snowImg.png");
        case "mist":
          return require("@/assets/img/mistImg.png");
      }
    },
  },
  methods: {
    async fetchWeather() {
      try {
        if (this.weatherStore.regionWeatherData) {
          this.weather = this.weatherStore.regionWeatherData.currentWeather || {};
          this.air_quality = this.weatherStore.regionWeatherData.airQuality || {};
          this.five_day_forecast = this.weatherStore.regionWeatherData.fiveDayForecast || {};
        } else {
          this.weather = {};
          this.air_quality = {};
          this.five_day_forecast = {};
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.weather = {};
        this.air_quality = {};
        this.five_day_forecast = {};
      }
    },
    dateBuilder: () => moment().format("dddd, D MMMM"),
    warmOrCold() {
      let temp = this.weather.main.temp;
      if (temp > 16 && temp <= 25) return "Warm";
      if (temp > 25) return "Hot";
      return "Cold";
    },
    getDayOfWeek(index) {
      let date = new Date(this.five_day_forecast.list[8 * index].dt_txt);
      return ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()];
    },
    formatTime(unixTime, timezone) {
      let date = new Date((unixTime + timezone) * 1000);
      return date.toISOString().slice(11, 16);
    },
    calculateSunPosition() {
      let now = new Date();
      let smallLine = document.getElementById("ssSmallLine");
      let circle = document.getElementById("ssCircle");
      let timezoneOffset = this.weather.timezone * 1000;
      let localTime = new Date(now.getTime() + timezoneOffset);
      let localTimeString = localTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      let sunrise = this.weather.sys.sunrise;
      let sunset = this.weather.sys.sunset;
      let sunPosition = ((Math.round(localTime / 1000) - sunrise) / (sunset - sunrise)) * 100;
      if (sunPosition < 100 && sunPosition > 0) {
        smallLine.style.width = `${sunPosition}%`;
        circle.style.left = `${sunPosition}%`;
      } else {
        smallLine.style.width = "0%";
        circle.style.left = "0%";
      }
      return localTimeString;
    },
    getMinAndMaxTemp(index, type) {
      let temps = this.five_day_forecast.list.slice(8 * index, 8 * index + 8).map((entry) => entry.main[type] - 273.15);
      return {
        min: Math.round(Math.min(...temps)),
        max: Math.round(Math.max(...temps)),
      };
    },
    getWeatherWeeklyIllustration(index) {
      let weatherMain = this.five_day_forecast.list[8 * index].weather[0].main;
      return this.mapWeatherToImage(weatherMain);
    },
    mapWeatherToImage(weatherMain) {
      switch (weatherMain) {
        case "Clear":
        default:
          return require("@/assets/img/sunnyImg.png");
        case "Clouds":
          return require("@/assets/img/cloudyImg.png");
        case "Rain":
          return require("@/assets/img/rainImg.png");
        case "Thunderstorm":
          return require("@/assets/img/thunderImg.png");
        case "Snow":
          return require("@/assets/img/snowImg.png");
        case "Mist":
          return require("@/assets/img/mistImg.png");
      }
    },
    refreshingOrDry() {
      let humidity = this.weather.main.humidity;
      if (humidity < 30) return "Dry";
      if (humidity < 60) return "Refreshing";
      return "Very Humid";
    },
    computeFontSize(location) {
      if (location.length <= 5) return "2.75rem";
      if (location.length <= 6) return "1.8rem";
      return "1.5rem";
    },
    airQualityMeaning() {
      let aqi = this.air_quality.list[0].main.aqi;
      switch (aqi) {
        case 1:
          return "Good air quality, little or no risk";
        case 2:
          return "Acceptable air quality";
        case 3:
          return "Unhealthy for sensitive groups";
        case 4:
          return "Health effects possible for everyone";
        case 5:
          return "Health alert; serious effects possible for all";
        default:
          return "Unknown Air Quality";
      }
    },
    windSpeed() {
      let speed = this.weather.wind.speed;
      if (speed >= 1 && speed <= 3) return "Light Breeze";
      if (speed > 3 && speed <= 7) return "Gentle Breeze";
      if (speed > 7 && speed <= 12) return "Moderate Breeze";
      if (speed > 12 && speed <= 18) return "Fresh Breeze";
      if (speed > 18 && speed <= 24) return "Strong Breeze";
      if (speed > 24 && speed <= 31) return "High Wind, Near Gale";
      if (speed > 31 && speed <= 38) return "Gale";
      if (speed > 38 && speed <= 46) return "Severe Gale";
      if (speed > 46 && speed <= 54) return "Storm";
      if (speed > 54) return "Violent Storm";
      return "Unknown Wind";
    },
    sunPosition() {
      let currentHour = new Date().getUTCHours();
      console.log("Current Hour:", currentHour);
    },
    capitalizeDescription(description) {
      return description
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
    getWeatherIcon(icon) {
      return `https://openweathermap.org/img/wn/${icon}@4x.png`;
    },
    // Add missing methods
    handleUpClick() {
      console.log("Up button clicked");
    },
    handleDownClick() {
      console.log("Down button clicked");
    },
  },
};
</script>


<template>
  <main class="dash-body">
    <head>
  <!-- Preload images correctly -->
  <link rel="preload" href="@/assets/img/sunLandingPage.webp" as="image">
  <link rel="preload" href="@/assets/img/cloud1LandingPage.webp" as="image">
  <link rel="preload" href="@/assets/img/cloud2LandingPage.webp" as="image">
</head>

    <div class="grid">
      <div class="gridCell div0">
        <HeaderDashboard />
      </div>
      <div class="gridCell div1">
        <div id="containerWeatherToday">
          <h3 id="date">{{ dateBuilder() }}</h3>
          <img 
            id="weatherTodayIllustration" 
            :src="getWeatherIcon(weather.weather[0].icon)" 
            :alt="getWeatherAltText" 
          >
          <div id="location" :style="{ fontSize: computeFontSize(weather.name) }">
            <font-awesome-icon icon="location-dot" style="color: #303030;" />
            <span class="locationCity">{{ weather.name }}</span>
          </div>
        </div>
      </div>
      <div class="gridCell div2">
        <div id="containerWeatherInfoToday">
          <div id="feelsLikeContainer">
            <p id="feelsLikeTitle">Feels Like</p>
            <p id="feelsLikeData">{{ `${Math.round(weather.main.feels_like)}°C ${warmOrCold()}` }}</p>
          </div>
          <div id="expectedContainer">
            <p id="expectedTitle">Expected</p>
            <p id="expectedData">{{ capitalizeDescription(weather.weather[0].description) }}</p>
          </div>
          <div id="humidityContainer">
            <div class="humidityContainerHeader">
              <img src="../assets/img/humidityIconBasicMode.svg" class="humidityIcon" >
              <p class="humidityTitleBasicMode">Humidity</p>
            </div>
            <div id="humidityData">
              <p id="humidityPercentage">{{ weather.main.humidity }}%</p>
              <p id="refreshingOrDry">{{ refreshingOrDry() }}</p>
            </div>
          </div>
          <div id="rainContainer">
            <div class="rainContainerHeader">
              <img src="../assets/img/rainIconBasicMode.svg" class="rainIcon">
              <p class="rainTitleBasicMode">Rain</p>
            </div>
            <div id="rainData">
              <p id="rainPercentage">{{ Math.round(this.five_day_forecast.list[0].pop * 100) }}</p>
              <p id="chance">% Chance</p>
            </div>
          </div>
          <div id="windContainer">
            <div class="windContainerHeader">
              <img src="../assets/img/windIconBasicMode.svg" class="windIcon" >
              <p class="windTitleBasicMode">Wind</p>
            </div>
            <p id="windData">{{ windSpeed() }}</p>
          </div>
          <RouterLink :to="{ name: '', params: { city: weather.name } }" id="seeMoreBtn">See more</RouterLink>
        </div>
      </div>
      <div class="gridCell div3">
        <div id="containerNimbusNudges">
          <div id="headerNimbusNudges">
            <h3 id="titleNimbusNudges">Nimbus Nudges</h3>
            <div id="buttonsHeaderNimbusNudges">
              <ArrowButton direction="left" button-class="personalization-arrow" @clickButton="handleUpClick" />
              <ArrowButton direction="right" button-class="personalization-arrow" @clickButton="handleDownClick" />
            </div>
          </div>
          <div id="nimbusNudgesData">
            A friendly heads-up – a playful breeze is weaving its way through the city today. It's strong enough to dance with the leaves and turn a regular walk into a refreshing journey. Embrace the fresh air and let it guide you to new experiences.
          </div>
          <div id="buttonsOptionsNimbusNudges">
            <button id="allClearBtn">ALL CLEAR!</button>
            <button id="quietTheSkiesBtn">QUIET THE SKIES</button>
          </div>
        </div>
      </div>
      <div class="gridCell div4">
        <div id="degreesContainer">
          <h1 id="degreesValue">{{ Math.round(weather.main.temp) }}
            <div class="degrees-sub-wrapper">
              <div id="degrees">degrees</div>
              <div id="degreesType">celsius</div>
            </div>
          </h1>
        </div>
      </div>
      <div class="gridCell div5">
        <div id="temperatureGraphContainerBasicMode">
          <img src="../assets/img/graphBasicMode.svg" id="imgGraphBasicMode" alt="Temperature Graph">
        </div>
      </div>
      <div class="gridCell div6">
        <div id="airQualityContainer">
          <div id="airQualityHeader">Air Quality</div>
          <p id="airQualityMeaning">{{ airQualityMeaning() }}</p>
          <div id="airQualityData">
            <div id="circleAirQuality">
              <h2 id="airQualityValue">{{ air_quality.list[0].main.aqi }}</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="gridCell div7">
        <section id="thisWeekSection">
          <div id="thisWeekContainer"><p>This Week</p></div>
          <div id="mondayContainer">
            <h3 class="dayTitle">{{ getDayOfWeek(0) }}</h3>
            <img id="mondayImg" src="../assets/img/cloudImg.svg" alt="Cloudy">
            <div id="mondayTemp">
              <p id="minTempMonday">{{getMinAndMaxTemp(0, 'temp_min').min}}°</p>
              <p id="maxTempMonday">/{{getMinAndMaxTemp(0, 'temp_max').max}}°</p>
            </div>
          </div>
          <div id="tuesdayContainer">
            <h3 class="dayTitle">{{ getDayOfWeek(1) }}</h3>
            <img id="tuesdayImg" src="../assets/img/cloudImg.svg" alt="Cloudy">
            <div id="tuesdayTemp">
              <p id="minTempTuesday">{{getMinAndMaxTemp(1, 'temp_min').min}}°</p>
              <p id="maxTempTuesday">/{{getMinAndMaxTemp(1, 'temp_max').max}}°</p>
            </div>
          </div>
          <div id="wednesdayContainer">
            <h3 class="dayTitle">{{ getDayOfWeek(2) }}</h3>
            <img id="wednesdayImg" src="../assets/img/sunnyImg.svg" alt="Sunny">
            <div id="wednesdayTemp">
              <p id="minTempWednesday">{{getMinAndMaxTemp(2, 'temp_min').min}}°</p>
              <p id="maxTempWednesday">/{{getMinAndMaxTemp(2, 'temp_max').max}}°</p>
            </div>
          </div>
          <div id="thursdayContainer">
            <h3 class="dayTitle">{{ getDayOfWeek(3) }}</h3>
            <img id="thursdayImg" src="../assets/img/sunnyImg.svg" alt="Sunny">
            <div id="thursdayTemp">
              <p id="minTempThursday">{{getMinAndMaxTemp(3, 'temp_min').min}}°</p>
              <p id="maxTempThursday">/{{getMinAndMaxTemp(3, 'temp_max').max}}°</p>
            </div>
          </div>
          <div id="fridayContainer">
            <h3 class="dayTitle">{{ getDayOfWeek(4) }}</h3>
            <img id="fridayImg" src="../assets/img/sunnyImg.svg" alt="Sunny">
            <div id="fridayTemp">
              <p id="minTempFriday">{{getMinAndMaxTemp(4, 'temp_min').min}}°</p>
              <p id="maxTempFriday">/{{getMinAndMaxTemp(4, 'temp_max').max}}°</p>
            </div>
          </div>
        </section>
      </div>
      <div class="gridCell div8">
        <div id="sunshineInfo">
          <span id="sunriseSunsetContainer">
            <div id="sunriseContainer">
              <p id="sunrise">Sunrise</p>
              <p id="sunriseTime">{{ formatTime(weather.sys.sunrise, weather.timezone) }} am</p>
            </div>
            <div id="sunriseSunsetIllustration">
              <div id="sunriseSunsetBigLine"></div>
              <div id="sunriseSunsetBigLine"></div>
              <div id="ssSmallLine"></div>
              <div id="ssCircle"></div>
            </div>
            <div id="sunsetContainer">
              <p id="sunset">Sunset</p>
              <p id="sunsetTime">{{ formatTime(weather.sys.sunset, weather.timezone) }} pm</p>
            </div>
          </span>
          <span id="uvLightContainer">
            <div id="uvHeader">
              <h3 id="uv">UV</h3>
              <p id="uvRec">Cover up, stay in shade.</p>
            </div>
            <div id="uvIllustration">
              <div id="uvBigLine"></div>
              <div id="uvSmallLine"></div>
              <div id="uvCircle"></div>
            </div>
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<style>

.dash-body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 50px 1fr 1fr;
  gap: 32px;
  height: 850px;
  width: 1260px;
}

.gridCell {
  border: 1px solid var(--main-color);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease-in-out; 
  display: flex;
  justify-content: center;
}

.div0 { grid-area: 1 / 1 / 2 / 5; border-radius: 50px 50px 10px 10px; }
.div1 { grid-area: 2 / 1 / 3 / 2; }
.div2 { grid-area: 2 / 2 / 3 / 4; }
.div3 { grid-area: 2 / 4 / 3 / 4; }
.div4 { grid-area: 3 / 1 / 4 / 2; }
.div5 { grid-area: 3 / 2 / 4 / 4; }
.div6 { grid-area: 3 / 4 / 4 / 4; }
.div7 { grid-area: 4 / 1 / 4 / 4; }
.div8 { grid-area: 4 / 4 / 5 / 4; }

#containerWeatherToday {
  width: 100%;
  background: #C3C3C3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#weatherTodayIllustration {
  max-width: 10em;
  height: auto;
}

#date {
  color: #F8FAFB;
  margin: 0;
  font-family: var(--font-family-secondary);
  font-size: 1.5625rem;
  font-weight: 400;
}

#location {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: var(--main-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.locationCity {

  font-family: 'Asap', sans-serif;
  font-weight: bold;
  font-size: 1.75rem;
  z-index: 4;
}

#containerWeatherInfoToday {
    width: 100%;
    border-radius: 10px;
    background: #B7AFE2;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

#feelsLikeContainer{
/*   position: absolute;
  left: 2.13em;
  top: 2.81em; */
  flex-shrink: 1;
  width: 12.375rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: 3.125rem;
  border: 1px solid #303030;
  background: #D9D5EE;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
#expectedContainer {
    width: 16.125rem;
    height: 2.75rem;
    flex-shrink: 0;
    border-radius: 3.125rem;
    border: 1px solid #303030;
    background: #D9D5EE;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
#humidityContainer{
/*   position: absolute;
  left: 2.13em;
  top: 7.44em; */
  width: 9.5rem;
  height: 5.1875rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #D9D5EE;
  display: flex;
  align-items:center;
  flex-direction: column;
}

.humidityContainerHeader, .rainContainerHeader, .windContainerHeader {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
 
}

#rainContainer{
  width: 8.1875rem;
  height: 5.1875rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #D9D5EE;
}
#windContainer{
  width: 8.9375rem;
  height: 5.1875rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #D9D5EE;
}
#seeMoreBtn{
  position: absolute;
  right:2.06em;
  bottom: 1.25em;
  color: var(--Primary-Color-Palette-Dawn-Blush, #F2E6DD);
  font-family: Asap;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration-line: underline;
}
#containerNimbusNudges{
  width: 100%;
  border-radius: 1.25rem;
  background: var(--Secondary-Color-Palette-Sky-Wash, #ADD8FB);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#headerNimbusNudges {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8em 1rem 0rem 1rem;
    height: 10%;
}
#titleNimbusNudges{
  color: #303030;
  font-family: Asap;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin-bottom: 0;
  margin-top: 0;
}

#nimbusNudgesData {
  width: fit-content;
  padding: 0.8rem 1rem 1rem 1rem;
}

#buttonsHeaderNimbusNudges{
/*   width: 5em;
  height: 2em; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 35%;
}

#buttonsHeaderNimbusNudges .personalization-arrow:first-child {
 transform: rotate(0deg) !important;
}

#buttonsHeaderNimbusNudges .personalization-arrow:nth-child(2) {
 transform: rotate(180deg) !important;
}
.arrow-button.personalization-arrow {
background-color: #FAF8ED;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#buttonsOptionsNimbusNudges{
  width: 100%;
  display: flex;
  justify-content: space-around;
}

#allClearBtn{
  display: inline-flex;
  padding: 0.375rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1.25rem;
  border: 1px solid #000;
  background: var(--Secondary-Color-Palette-Spring-Bud, #DFE287);
  color: var(--Textual-Elements-Midnight-Onyx, #303030);
  text-align: right;
  font-family: Asap;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 250;
  line-height: normal;
  text-transform: uppercase;
}
#quietTheSkiesBtn{
  display: inline-flex;
  padding: 0.375rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1.25rem;
  border: 1px solid #000;
  background: var(--Secondary-Color-Palette-Orchid-Flush, #E18AD1);
  color: var(--Textual-Elements-Midnight-Onyx, #303030);
  text-align: right;
  font-family: Asap;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 250;
  line-height: normal;
  text-transform: uppercase;
}

#feelsLikeTitle, #expectedTitle, .humidityTitleBasicMode, .rainTitleBasicMode, .windTitleBasicMode{
  color: #303030;
/*   position: absolute;
  left: 1.44em; */
  text-align: right;
  font-family: Asap;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
/*   position: absolute; */
}
#feelsLikeData, #ColdOrWarm, #expectedData{
  color: var(--Textual-Elements-Stormcloud-Grey, #858585);
  font-family: Asap;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.humidityIcon, .rainIcon, .windIcon{
margin-left: 0.8rem;
margin-top: 0.8rem; 
}

#humidityPercentage, #rainPercentage, #windData{
margin-left: 0.8rem;

}

#rainPercentage, #chance, #windData {
  margin-top: 0.8rem;
}

#refreshingOrDry, #chance{
  margin-right: 0.8rem;
}

.humidityTitleBasicMode, .rainTitleBasicMode, .windTitleBasicMode{
  margin-right: 0.8rem;
  margin-top: 0.8rem;
  margin-bottom: 0;
}

.rainTitleBasicMode {
  transform: translateY(-15%);
}


#rainData, #humidityData, #windData{
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--Textual-Elements-Stormcloud-Grey, #858585);
  text-align: right;
  font-family: Asap;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 100%;
}

#degreesContainer{
  width: 100%;
  border-radius: 1.25rem;
  background: rgba(156, 200, 161, 0.80);
  display: flex;
  align-items: center;
  flex-direction: column;
}
#degreesValue{
  color: #303030;
  margin: 0;
  font-family: Recoleta;
  font-size: 11rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  align-self: center;
  height: fit-content;
}

.degress-sub-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 0.2rem;
}
#degreesType, #degrees{
  color: var(--textual-elements-20-saturation-midnight-onyx-20-sat, #302727);
  font-family: Asap;
  font-size: 1.0rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
  transform: translateY(-200%);
  display: flex;
}

#temperatureGraphContainerBasicMode{
  width: 100%;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #F2E6DD;

  display: flex;
  align-items: center;
  justify-content: center;
}

#airQualityContainer{
  width: 100%;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #FF87AB;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#airQualityHeader{
  color: #303030;
  font-family: Asap;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 0.7rem 0rem 0rem 1rem;
}

#airQualityData{
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1em;
}

#circleAirQuality{
  width: 8rem;
  height: 8rem;
  flex-shrink: 0;
  background-color: #FFECA7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #303030;
  font-family: Recoleta;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0.5rem;
}

#airQualityMeaning {
    margin-left: 1rem;
    margin-top: 0;
    margin-bottom: 0;
    color: #F8FAFB;
    text-align: left;
    font-family: Asap;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

#thisWeekSection{
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}
#thisWeekContainer{
  width: 2.3125rem;
  height: 8.3125rem;
  flex-shrink: 0;
  border-radius: 1.25rem 0.3125rem 0.3125rem 1.25rem;
  border: 1px solid #000;
  background: #E18AD1;
  display: flex;
  align-items: center;
}

#thisWeekContainer p{
  color: #01542C;
  font-family: Recoleta;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  transform-origin: bottom left;
  white-space: nowrap; 
  transform:  translate(38%, 125%) rotate(-90deg);
}

#mondayContainer, #tuesdayContainer, #wednesdayContainer, #thursdayContainer, #fridayContainer{
  width: 5.9375rem;
  height: 8.3125rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid #000;
  background: #F2E6DD;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem;

}
.dayTitle{
  color: #303030;
  font-family: Recoleta;
  font-size: 1.5625rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
}
#mondayContainer h3, #tuesdayContainer h3, #wednesdayContainer h3, #thursdayContainer h3, #fridayContainer h3{
  margin-top: 0.5em;
}

#mondayTemp, #tuesdayTemp, #thursdayTemp,  #wednesdayTemp, #fridayTemp{
  margin-top: auto; 
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

#mondayTemp p,
#tuesdayTemp p,
#thursdayTemp p,
#wednesdayTemp p,
#fridayTemp p {
  margin: 0; 
  margin-bottom: 0.5em;
}

#minTempMonday, #minTempTuesday, #minTempWednesday, #minTempThursday, #minTempFriday{
  color: #303030;
text-align: right;
font-family: Asap;
font-size: 1.125rem;
font-style: normal;
font-weight: 700;
line-height: normal;
}
#maxTempMonday, #maxTempTuesday, #maxTempWednesday, #maxTempThursday, #maxTempFriday{
  
  color: #303030;
text-align: right;
font-family: Asap;
font-size: 0.75rem;
font-style: normal;
font-weight: 400;
line-height: normal;
}

#sunshineInfo{
  width: 100%;
    flex-shrink: 0;
    border-radius: 1.25rem;
    background: var(--primary-color-palette-40-saturation-sunbeam-gold-40-sat, #FAE3AF);
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
}
#sunriseSunsetContainer, #uvLightContainer{
  width: 12.0625rem;
  height: 2.875rem;
  flex-shrink: 0;
  border-radius: 1.875rem;
  border: 1px solid #303030;
  background: #F2E6DD;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.2em;
  padding-right: 0.8em;
}


#sunrise,#sunset{
  color: #303030;
  font-family: Asap;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
}
#sunriseContainer{
  width: 4em;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  height: 1em;
  margin: 0;
}
#sunriseSunsetIllustration{
  width: 5em;
  height: 2em;
  margin: 0;
  display: flex;
  align-items: center;
  position: relative;
}
#sunriseSunsetBigLine{
  width: 2.4rem;
  height: 0.25rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #D9D9D9;
  z-index: 2;
}
#ssSmallLine{
  width: 1.5rem;
  height: 0.25rem;
  flex-shrink: 0;
  z-index: 4;
  border-radius: 0.625rem;
  background: var(--secondary-color-palette-40-saturation-sky-wash-40-sat, #49ABFB);
  position: absolute;
  left: 0;
  transform: translatex(0%);
}
#ssCircle{
  width: 0.6875rem;
  height: 0.6875rem;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: #FABE32;
  z-index: 5;
  position: absolute;
  left: 1.2em;
}
#sunriseTime,#sunsetTime{
  color: var(--Textual-Elements-Stormcloud-Grey, #858585);
  font-family: Asap;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
}
#uvLightContainer{

    display: flex;
    flex-direction: column;
    align-items: flex-start;

}
#uvHeader{
    width: 100%;
    height: 1rem;
    padding-top: 0.4em;
    display: flex;
    align-items: center;
    justify-content: space-between;

}

#uvRec{
  color: var(--Textual-Elements-Stormcloud-Grey, #858585);
font-family: Asap;
font-size: 0.75rem;
font-style: normal;
font-weight: 400;
margin: 0;
line-height: normal;
}

#uv{
  color: #303030;
  font-family: Recoleta;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  margin-left: 1rem;

}

#uvIllustration {
    width: 90%;
    height: 1em;
    margin-left: 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    position: relative;
}
#uvBigLine{
  width: 100%;
  height: 0.25rem;
  border-radius: 0.625rem;
  background: #D9D9D9;
  z-index: 2;
}
#uvSmallLine{
  width: 30%;
  justify-self: flex-end;
  height: 0.25rem;
  transform: translateY(-0.25rem);

  z-index: 4;
  border-radius: 0.625rem;
  background: var(--secondary-color-palette-20-saturation-autumn-blaze-20-sat, #E64000);

}
#uvCircle{
  width: 0.9rem;
  position: absolute;
  height: 0.9rem;
  top: -0.40rem;
  left: 30%;

  border-radius: 50%;

  background-color: #FABE32;
  z-index: 5;
}
</style>
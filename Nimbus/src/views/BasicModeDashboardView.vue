<script>
import moment from 'moment';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import ArrowButton from '@/components/ArrowButton.vue';
import HeaderDashboard from "@/components/HeaderDashboard.vue";
import { useUserStore } from "@/stores/user";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
  name: 'basicMode',
  data() {
    return {
      api_key: '39d7058ef12ab5dae395f420fd79ec5a',
      url_base: 'http://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {},
      five_day_forecast: {},
      air_quality: {},
    };
  },
  components: {
    ArrowButton,
    HeaderDashboard,
  },
  created(){
    
  },
  mounted() {
    this.$nextTick(() => {
      this.calculateSunPosition();
    });
    this.query=this.userLocation.region;
    console.log(this.store.authenticatedUser);
    console.log(this.userLocation);
  },
  computed: {
    store() {
       return useUserStore();
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
    const weatherMain = this.weather.weather[0].main.toLowerCase();

    // You can customize the alt text based on the weather main
    switch (weatherMain) {
      case 'clear':
        return 'Clear Sky';
      case 'clouds':
        return 'Cloudy';
      case 'rain':
        return 'Rainy';
      case 'thunderstorm':
        return 'Thunderstorm';
      case 'snow':
        return 'Snowy';
      case 'mist':
        return 'Misty';
      default:
        return 'Unknown Weather';
    }
  },
    getWeatherTodayIllustration(){
      console.log(this.weather.weather[0].main.toLowerCase())
      const weatherImg = this.weather.weather[0].main.toLowerCase()
      switch (weatherImg) {
      case 'clear':
        console.log('a')
        return '../assets/img/sunnyImg.png';
      case 'clouds':
      console.log('b')
        return '../assets/img/cloudyImg.png';
      case 'rain':
      console.log('c')
        return '../assets/img/rainImg.png';
      case 'thunderstorm':
      console.log('d')
        return '../assets/img/thunderImg.png';
      case 'snow':
      console.log('e')
        return '../assets/img/snowImg.png';
      case 'mist':
      console.log('f')
        return '../assets/img/mistImg.png';
      default:
      console.log('g')
        return '../assets/img/sunnyImg.png';
    }
  }
},
  methods: {
    
    fetchWeather(e){
      if (e.key == 'Enter'){
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
        .then(res => res.json())
        .then(this.setResults)
        .then(this.fetchFiveDayForecast)
        .then(this.fetchAirQuality);
      }
    },
    fetchFiveDayForecast(){
      //console.log('Fetching 5 day weather forecast...');
      const { lat, lon } = this.weather.coord;
      fetch(`${this.url_base}forecast?lat=${lat}&lon=${lon}&appid=${this.api_key}`)
        .then(res => res.json()) 
        .then(response => {
          //console.log(response);
          this.setFiveDayForecastResults(response);
        })
        .catch(error => {
          console.error('Error fetching 5 day weather forecast:', error);
        });
    },
    fetchAirQuality(){
      const { lat, lon } = this.weather.coord;
      fetch(`${this.url_base}air_pollution?lat=${lat}&lon=${lon}&appid=${this.api_key}`)
        .then(res => res.json()) 
        .then(response => {
          //console.log('respuesta',response);
          this.setAirQualityResults(response);
          this.calculateSunPosition();
        })
        .catch(error => {
          console.error('Error fetching air pollution data:', error);
        });
    },
    setResults (results){
      this.weather = results;
    },
    setFiveDayForecastResults(response){
      this.five_day_forecast = response
      //console.log(this.five_day_forecast.list[0].pop)
    },
    setAirQualityResults(response){
      this.air_quality = response
      //console.log(this.air_quality.list[0].main.aqi)
    },
    dateBuilder() {
      return moment().format('dddd, D MMMM');
    },
    warmOrCold(){
      const temperature = this.weather.main.temp;
      switch (true) {
        case temperature > 16 && temperature <= 25:
          return 'Warm';
        case temperature > 25:
          return 'Hot';
        default:
          return 'Cold';
      }
    },
    getDayOfWeek(index) {
      const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const today = new Date();

      const forecastDate = new Date(this.five_day_forecast.list[index * 8].dt_txt);
      const dayOfWeek = weekdays[forecastDate.getDay()];

      return dayOfWeek;
    },

    formatTime(timestamp, timezoneOffset) {
      const date = new Date(timestamp * 1000 + timezoneOffset * 1000); 
      const formattedTime = date.toISOString().slice(11, 16);
      return formattedTime;
    },
    calculateSunPosition(){
        const currentTime = new Date();


      const smallLine = document.getElementById('ssSmallLine');
      const sunCircle = document.getElementById('ssCircle');
    
        const timezoneOffsetInMilliseconds = this.weather.timezone * 1000;
        const cityTime = new Date(currentTime.getTime() + timezoneOffsetInMilliseconds);
        const formattedTime = cityTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const timeStampCurrentTime = Math.round(cityTime / 1000);
        const sunriseTime = this.weather.sys.sunrise
        const sunsetTime = this.weather.sys.sunset
        const daylightDuration = sunsetTime - sunriseTime;
        const timeSinceSunrise = timeStampCurrentTime - sunriseTime;
        let percentageOfDaylight = (timeSinceSunrise / daylightDuration) * 100;
        console.log('Percentage of daylight:', percentageOfDaylight);
        
          if (percentageOfDaylight < 100 && percentageOfDaylight > 0) {
            smallLine.style.width = `${percentageOfDaylight}%`;
            sunCircle.style.left = `${percentageOfDaylight}%`;
          } else{
            console.log('menor a 0')
            smallLine.style.width = '0%'
            sunCircle.style.left = '0%';
          }

        return formattedTime;
      
    },
    getMinAndMaxTemp(index, property){
      const start = index * 8
      const end = start + 8

      const temps = this.five_day_forecast.list.slice(start, end).map(item => item.main[property] - 273.15)
      //console.log(temps)
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);

      return {
        min: Math.round(minTemp),
        max: Math.round(maxTemp)
      };
    },
    
    getWeatherWeeklyIllustration(i){
      console.log(this.five_day_forecast?.list?.[i * 8].weather[0].main);
        const weatherMain = this.five_day_forecast.list[i * 8].weather[0].main
        const imageUrl = this.mapWeatherToImage(weatherMain);
        console.log('Image URL:', imageUrl);
        return imageUrl;
    },
    mapWeatherToImage(weatherMain) {
      switch (weatherMain) {
      case 'Clear':
        console.log('a')
        return '../assets/img/sunnyImg.png';
      case 'Clouds':
      console.log('b')
        return '../assets/img/cloudyImg.png';
      case 'Rain':
      console.log('c')
        return '../assets/img/rainImg.png';
      case 'Thunderstorm':
      console.log('d')
        return '../assets/img/thunderImg.png';
      case 'Snow':
      console.log('e')
        return '../assets/img/snowImg.png';
      case 'Mist':
      console.log('f')
        return '../assets/img/mistImg.png';
      default:
      console.log('g')
        return '../assets/img/sunnyImg.png';
      }
    },
    refreshingOrDry(){
      if(this.weather.main.humidity < 30){
        return 'Dry'
      }
      else if (this.weather.main.humidity < 60 && this.weather.main.humidity >= 30){
        return 'Refreshing'
      }
      else{
        return 'Very Humid'
      }
    },
    computeFontSize(letterCount) {
      if (letterCount <= 5) {
        return "2.75rem"
      } else if (letterCount <= 6) {

        return "1.8rem"
      } else {
        return "1.5rem"
      }
    },
    airQualityMeaning(){
      let airQuality = this.air_quality.list[0].main.aqi
      //console.log(airQuality)
      switch (true){
        case airQuality == 1:
          return 'Good air quality, little or no risk'
        case airQuality == 2:
          return 'Acceptable air quality'
        case airQuality == 3:
          return 'Unhealthy for sensitive groups'
        case airQuality == 4:
          return 'Health effects possible for everyone'
        case airQuality == 5:
          return 'Health alert; serious effects possible for all'
          default:
        return 'Unknown Air Quality';
      }
    },
    windSpeed(){
      let speedPerHour = this.weather.wind.speed

        switch (true) {
      case speedPerHour >= 1 && speedPerHour <= 3:
        return 'Light Breeze';
      case speedPerHour > 3 && speedPerHour <= 7:
        return 'Gentle Breeze';
      case speedPerHour > 7 && speedPerHour <= 12:
        return 'Moderate Breeze';
      case speedPerHour > 12 && speedPerHour <= 18:
        return 'Fresh Breeze';
      case speedPerHour > 18 && speedPerHour <= 24:
        return 'Strong Breeze';
      case speedPerHour > 24 && speedPerHour <= 31:
        return 'High Wind, Near Gale';
      case speedPerHour > 31 && speedPerHour <= 38:
        return 'Gale';
      case speedPerHour > 38 && speedPerHour <= 46:
        return 'Severe Gale';
      case speedPerHour > 46 && speedPerHour <= 54:
        return 'Storm';
      case speedPerHour > 54:
        return 'Violent Storm';
      default:
        return 'Unknown Wind';
    }
    },
    sunPosition(){
      const hour = new Date().getUTCHours()
      console.log('hora',hour)
    }
  }
  
};
</script>
<template>
    <input type = 'text' class = 'search-bar' placeholder="search..." v-model="query" @keypress = 'fetchWeather'>
  <main class="dash-body">
    <div class="grid" v-if="(typeof weather.main != 'undefined')">
    <div class="div0 gridCell">
      <HeaderDashboard />
    </div>
      <div class="div1 gridCell">
        <div id = 'containerWeatherToday'>
<!--           <img id = 'weatherTodayIllustration' :src = 'getWeatherTodayIllustration' :alt="getWeatherAltText" > -->
          <div class="date-icon-header">
        <h3 id = 'date'>{{dateBuilder()}}</h3>
          </div>

        
        <div id = 'location' :style="{ fontSize: computeFontSize(weather.name.length) }">

          <font-awesome-icon icon="location-dot" style="color: #303030;" />
          <span class = 'locationCity' >{{ weather.name }}</span>
        </div>
      </div>
      </div>
      <div class="div2 gridCell">
      <div id = 'containerWeatherInfoToday'>
        <div id="feelsLikeContainer">
  <p id="feelsLikeTitle">Feels Like</p>
  <p id="feelsLikeData">{{ `${Math.round(weather.main.feels_like)}°C ${warmOrCold()}` }}</p>
</div>

        <div id = 'expectedContainer'>
          <p id = 'expectedTitle'>Expected</p>
          <p id = 'expectedData'>{{ weather.weather[0].description }}</p>
        </div>
        <div id = 'humidityContainer'>
          <div class = 'humidityContainerHeader'>
            <img src = '../assets/img/humidityIconBasicMode.svg' class = 'humidityIcon'>
          <p class = 'humidityTitleBasicMode'>Humidity</p>
          </div>
          <div id = 'humidityData'>
            <p id = 'humidityPercentage'>{{ weather.main.humidity}}%</p>
            <p id = 'refreshingOrDry'>{{ refreshingOrDry() }}</p>
          </div>
        </div>
        <div id = 'rainContainer'>
          <div class = 'rainContainerHeader'>
            <img src = '../assets/img/rainIconBasicMode.svg' class = 'rainIcon'>
            <p class = 'rainTitleBasicMode'>Rain</p>
          </div>
          <div id = 'rainData'>
            <p id = 'rainPercentage'>
              {{ Math.round(this.five_day_forecast.list[0].pop * 100) }} 
          </p> <p id = 'chance'>% Chance</p></div>
        </div>
        <div id = 'windContainer'>
          <div class = 'windContainerHeader'>
            <img src = '../assets/img/windIconBasicMode.svg' class = 'windIcon'>
            <p class = 'windTitleBasicMode'>Wind</p>
          </div>
          <p id = 'windData'>{{ windSpeed() }}</p>
        </div>
        <RouterLink :to="{ name: 'advancedModeDashboard', params: { city: weather.name }} " id = 'seeMoreBtn'>See more</RouterLink>
      </div>
    </div>
   
    <div class="div3 gridCell">
      <div id = 'containerNimbusNudges'>
        <div id = 'headerNimbusNudges'>
          <h3 id = 'titleNimbusNudges'>Nimbus Nudges</h3>
          <div id = 'buttonsHeaderNimbusNudges'>
            <ArrowButton direction="left" button-class="personalization-arrow" @clickButton="handleUpClick" />
            <ArrowButton direction="right" button-class="personalization-arrow" @clickButton="handleDownClick" />
          </div>
        </div>
         <div id = 'nimbusNudgesData'>
          A friendly heads-up – a playful breeze is weaving its way through the city today. It's strong enough to dance with the leaves and turn a regular walk into a refreshing journey. Embrace the fresh air and let it guide you to new experiences.
         </div>
         <div id = 'buttonsOptionsNimbusNudges'>
          <button id = 'allClearBtn'>ALL CLEAR!</button>
          <button id = 'quietTheSkiesBtn'>QUIET THE SKIES</button>
         </div>
        <p></p>
      </div>
    </div>
    <div class="div4 gridCell">
      <div id = 'degreesContainer'>
          <h1 id = 'degreesValue'>{{Math.round(weather.main.temp)}}
            <div class="degress-sub-wrapper">

              <div id = 'degrees'>degrees</div>
            <div id = 'degreesType'>celsius</div>
            </div>

          </h1>
        
          <!-- <p id = 'degreesType'>celsius</p> -->
      </div>
</div>
<div class="div5 gridCell">
      <div id = 'temperatureGraphContainerBasicMode'>
        <img src="../assets/img/graphBasicMode.svg" id = 'imgGraphBasicMode'>
      </div>
    </div>
    <div class="div6 gridCell">
      <div id = 'airQualityContainer'>
        <div id = 'airQualityHeader'>Air Quality</div>
        <p id = 'airQualityMeaning'>{{ airQualityMeaning() }}</p>
        <div id = 'airQualityData'>
          <div id = 'circleAirQuality'>
          <h2 id = 'airQualityValue'>{{ air_quality.list[0].main.aqi }}</h2>
        </div>
       
        </div>
      </div>
    </div>
    <div class="div7 gridCell">
      <section id = 'thisWeekSection'>
        <div id = 'thisWeekContainer'><p>This Week</p></div>
        <div id = 'mondayContainer'>
          <h3 class = 'dayTitle'>{{ getDayOfWeek(0) }}</h3>
          <img id = 'mondayImg' :src="getWeatherWeeklyIllustration(0)">
          <div id = 'mondayTemp'>
            <p id = 'minTempMonday'>{{getMinAndMaxTemp(0, 'temp_min').min}}°</p>
            <p id = 'maxTempMonday'>/{{getMinAndMaxTemp(0, 'temp_max').max}}°</p>
          </div>
        </div>
        <div id = 'tuesdayContainer'>
          <h3 class = 'dayTitle'>{{ getDayOfWeek(1) }}</h3>
          <img id = 'tuesdayImg' :src="getWeatherWeeklyIllustration(1)">
          <div id = 'tuesdayTemp'>
            <p id = 'minTempTuesday'>{{getMinAndMaxTemp(1, 'temp_min').min}}°</p>
            <p id = 'maxTempTuesday'>/{{getMinAndMaxTemp(1, 'temp_max').max}}°</p>
          </div>
        </div>
        <div id = 'wednesdayContainer'>
          <h3 class = 'dayTitle'>{{ getDayOfWeek(2) }}</h3>
          <img id = 'wednesdayImg' :src="getWeatherWeeklyIllustration(2)">
          <div id = 'wednesdayTemp'>
            <p id = 'minTempWednesday'>{{getMinAndMaxTemp(2, 'temp_min').min}}°</p>
            <p id = 'maxTempWednesday'>/{{getMinAndMaxTemp(2, 'temp_max').max}}°</p>
          </div>
        </div>
        <div id = 'thursdayContainer'>
          <h3 class = 'dayTitle'>{{ getDayOfWeek(3) }}</h3>
          <img id = 'thursdayImg' :src="getWeatherWeeklyIllustration(3)">
          <div id = 'thursdayTemp'>
            <p id = 'minTempThursday'>{{getMinAndMaxTemp(3, 'temp_min').min}}°</p>
            <p id = 'maxTempThursday'>/{{getMinAndMaxTemp(3, 'temp_max').max}}°</p>
          </div>
        </div>
        <div id="fridayContainer">
          <h3 class = 'dayTitle'>{{ getDayOfWeek(4) }}</h3>
          <img id="fridayImg" :src="getWeatherWeeklyIllustration(4)">
          <div id="fridayTemp">
            <p id="minTempFriday">{{getMinAndMaxTemp(4, 'temp_min').min}}°</p>
            <p id="maxTempFriday">/{{getMinAndMaxTemp(4, 'temp_max').max}}°</p>
          </div>
        </div>
      </section>
    </div>
    <div class="div8 gridCell">
      <div id = 'sunshineInfo'>
        <span id = 'sunriseSunsetContainer'>
          <div id = 'sunriseContainer'>
            <p id = 'sunrise'>Sunrise</p>
            <p id = 'sunriseTime'>{{ formatTime(weather.sys.sunrise, weather.timezone) }} am</p>
          </div>
            <div id = 'sunriseSunsetIllustration'>
              <div id = 'sunriseSunsetBigLine'></div>
              <div id='sunriseSunsetBigLine'></div>
              <div id='ssSmallLine'></div>
              <div id='ssCircle'></div>
            </div>
       
          <div id = 'sunsetContainer'>
            <p id = 'sunset'>Sunset</p>
            <p id = 'sunsetTime'>{{ formatTime(weather.sys.sunset, weather.timezone)}} pm</p>
          </div>
        </span>
        <span id = 'uvLightContainer'>
          <div id = 'uvHeader'>
            <h3 id = 'uv'>UV</h3>
            <p id = 'uvRec'>Cover up, stay in shade.</p>
          </div>
          <div id = 'uvIllustration'>
              <div id = 'uvBigLine'></div>
              <div id = 'uvSmallLine'></div>
              <div id = 'uvCircle'></div>
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
  height: fit-content;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
 /*  background-color: #01542C; */
  color: #49ABFB;
  overflow: scrol;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 50px 1fr 1fr 1fr; /* Adjust the first value for the header row height */
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  height: 850px;
  width: 1260px;
}

.gridCell {
  background-color: #F2E6DD;
  border: 1px solid #303030;
  border-radius: 20px;
/*   padding: 13px 13px; */
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease-in-out; 
  display: flex;
  justify-content: center;
}

.div0 { grid-area: 1 / 1 / 2 / 5;
border-radius: 50px 50px 10px 10px ;}

.div1 { grid-area: 2 / 1 / 3 / 2;}

.div2 { grid-area: 2 / 2 / 3 / 4;}

.div3 { grid-area: 2 / 4 / 3 / 4;}

.div4 { grid-area: 3 / 1 / 4 / 2;}

.div5 { grid-area: 3 / 2 / 4 / 4;}

.div6 { grid-area: 3 / 4 / 4 / 4;}

.div7 { grid-area: 4/ 1/ 5 / 4;}

.div8 { grid-area: 4 / 4/ 5 / 4;}
:root{
  background-color: #EDDED4;
}
#containerWeatherToday {
    /* width: 245px; */
    width: 100%;
    /* height: 248px; */
    flex-shrink: 0;
    border-radius: 10px;
    /* border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030); */
    background: #C3C3C3;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
}
#weatherTodayIllustration{
  max-width: 12em;
  height: auto;
}

.date-icon-header {
  display: flex;
  width: fit-content;
  margin-top: 1rem;
}
#date{
  color: #F8FAFB;
  margin: 0;
  font-family: Asap;
  font-size: 1.5625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

#location{
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #303030;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 1rem;
}
.locationCity {

  font-family: 'Asap', sans-serif;
  font-weight: bold;
  font-size: 1.75rem;
}

#containerWeatherInfoToday {
    /* position: absolute; */
    /* left: 28.88em; */
    width: 100%;
    /* height: 15.5rem; */
    border-radius: 10px;
    /* border: 1px solid #000; */
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
/*   position: absolute;
  left: 13.5em;
  top: 7.44em; */
  width: 8.1875rem;
  height: 5.1875rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #D9D5EE;
}
#windContainer{
/*   position: absolute;
  left:23.56em;
  top: 7.44em; */
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
 /*  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030); */
  background: var(--Secondary-Color-Palette-Sky-Wash, #ADD8FB);
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

.personalization-arrow:first-child {
 /*  margin-bottom: 1rem; */
}
.arrow-button.personalization-arrow {
background-color: #FAF8ED;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* .arrow-button.personalization-arrow .arrow-icon {
  width: 30px;
  height: 30px;
} */
/* #buttonsHeaderNimbusNudges button{
  width: 1.4375rem;
  height: 1.4375rem;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #FAF8ED;
  border: solid 0.05em #303030;
} */
#buttonsOptionsNimbusNudges{
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-right: 0.94em;
  padding-bottom: 0.94em;
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
/*   position: absolute; */
}
/* #ColdOrWarm{
  transform: translateX(-32%);
}
 */
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
 /*  border: 1px solid #000; */
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
 /*  border: 1px solid #000; */
  background: #F2E6DD;

  display: flex;
  align-items: center;
  justify-content: center;
}
/* #imgGraphBasicMode{
  margin-top: 0.5em;
} */

#airQualityContainer{
  width: 100%;
  flex-shrink: 0;
  border-radius: 1.25rem;
 /*  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030); */
  background: #FF87AB;
/*   position: absolute;
  right: 11.44em;
  top: 24em; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    /* height: 8.3125rem; */
    flex-shrink: 0;
    border-radius: 1.25rem;
  /*   border: 1px solid #303030; */
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

    /* align-self: baseline; */
    width: 100%;
    height: 1rem;
    padding-top: 0.4em;
    /* flex-shrink: 0; */
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
/*   flex-shrink: 0; */
  border-radius: 0.625rem;
  background: #D9D9D9;
  z-index: 2;
}
#uvSmallLine{
  width: 30%;
  justify-self: flex-end;
  height: 0.25rem;
  transform: translateY(-0.25rem);
 /*  flex-shrink: 0; */
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
  /* transform: translateY(-0.3rem); */
  border-radius: 50%;
/*   flex-shrink: 0; */
  background-color: #FABE32;
  z-index: 5;
}
</style>
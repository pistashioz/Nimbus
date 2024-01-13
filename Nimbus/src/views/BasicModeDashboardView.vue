<script>
import moment from 'moment';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
//import { useWeatherStore } from '@/stores/weather'

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
  mounted() {
    this.$nextTick(() => {
      this.calculateSunPosition();
    });
  },
  computed: {
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
        const formattedsunriseTime = this.formatTime(this.weather.sys.sunrise, this.weather.timezone)
        const formattedsunsetTime =this.formatTime(this.weather.sys.sunset, this.weather.timezone)
        const timeStampCurrentTime = Math.round(cityTime / 1000);
        const sunriseTime = this.weather.sys.sunrise
        const sunsetTime = this.weather.sys.sunset

        
          if (formattedTime > formattedsunriseTime && formattedTime < formattedsunsetTime) {

            const daylightDuration = sunsetTime - sunriseTime;
            const timeSinceSunrise = timeStampCurrentTime * 100;
            let percentageOfDaylight = (timeSinceSunrise / daylightDuration) / 100000;
            console.log('Percentage of daylight:', percentageOfDaylight);

            smallLine.style.width = `${percentageOfDaylight}%`;
            sunCircle.style.left = `${percentageOfDaylight}%`;
          } else {
            smallLine.style.width = '0';
            sunCircle.style.left = '0';
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
  <main>
    <input type = 'text' class = 'search-bar' placeholder="search..." v-model="query" @keypress = 'fetchWeather'>
    <div id="basicModeContainer" v-if="(typeof weather.main != 'undefined')">
      <div id = 'containerWeatherToday'>

        <h3 id = 'date'>{{dateBuilder()}}</h3>
        <img id = 'weatherTodayIllustration' :src = 'getWeatherTodayIllustration' :alt="getWeatherAltText" >
        <div id = 'location' :style="{ fontSize: computeFontSize(weather.name.length) }">

          <font-awesome-icon icon="location-dot" style="color: #303030;" />
          <h2 id = 'locationCity' >{{ weather.name }}</h2>
        </div>
      </div>
      <div id = 'containerWeatherInfoToday'>
        <div id = 'feelsLikeContainer'>
          <p id = 'feelsLikeTitle'>Feels Like</p>
          <p id = 'feelsLikeData'> {{Math.round(weather.main.feels_like)}}°C</p>
          <p id = 'ColdOrWarm'>{{ warmOrCold() }}</p>
        </div>
        <div id = 'expectedContainer'>
          <p id = 'expectedTitle'>Expected</p>
          <p id = 'expectedData'>{{ weather.weather[0].description }}</p>
        </div>
        <div id = 'humidityContainer'>
          <div id = 'humidityContainerHeader'>
            <img src = '../assets/img/humidityIcon.svg' id = 'humidityIcon'>
          <p id = 'humidityTitle'>Humidity</p>
          </div>
          <div id = 'humidityData'>
            <p id = 'humidityPercentage'>{{ weather.main.humidity}}%</p>
            <p id = 'refreshingOrDry'>{{ refreshingOrDry() }}</p>
          </div>
        </div>
        <div id = 'rainContainer'>
          <div id = 'rainContainerHeader'>
            <img src = '../assets/img/rainIcon.svg' id = 'rainIcon'>
            <p id = 'rainTitle'>Rain</p>
          </div>
          <p id = 'rainData'>{{ Math.round(this.five_day_forecast.list[0].pop * 100) }} % Chance</p>
        </div>
        <div id = 'windContainer'>
          <div id = 'windContainerHeader'>
            <img src = '../assets/img/windIcon.svg' id = 'windIcon'>
            <p id = 'windTitle'>Wind</p>
          </div>
          <p id = 'windData'>{{ windSpeed() }}</p>
        </div>
        <RouterLink :to="{ name: 'advancedModeDashboard', params: { city: weather.name }} " id = 'seeMoreBtn'>See more</RouterLink>
      </div>
      <div id = 'containerNimbusNudges'>
        <div id = 'headerNimbusNudges'>
          <h3 id = 'titleNimbusNudges'>Nimbus Nudges</h3>
          <div id = 'buttonsHeaderNimbusNudges'>
            <button id = 'leftNimbusNudges'><font-awesome-icon icon="fa-solid fa-arrow-left " style="color: #303030;"  /></button>
            <button id = 'rightNimbusNudges'><font-awesome-icon icon="fa-solid fa-arrow-right" style="color: #303030;" /></button>
          </div>
        </div>
         <div id = 'nimbusNudgesData'></div>
         <div id = 'buttonsOptionsNimbusNudges'>
          <button id = 'allClearBtn'>ALL CLEAR!</button>
          <button id = 'quietTheSkiesBtn'>QUIET THE SKIES</button>
         </div>
        <p></p>
      </div>
      <div id = 'degreesContainer'>
          <h1 id = 'degreesValue'>{{Math.round(weather.main.temp)}}</h1>
          <p id = 'degrees'>degrees</p>
          <p id = 'degreesType'>celsius</p>
      </div>

      <div id = 'temperatureGraphContainer'>
        <Bar
          id="my-chart-id"
          :data="chartData"
        />
      </div>

      <div id = 'airQualityContainer'>
        <div id = 'airQualityHeader'>AirQuality</div>
        <div id = 'airQualityData'>
          <div id = 'circleAirQuality'>
          <h2 id = 'airQualityValue'>{{ air_quality.list[0].main.aqi }}</h2>
        </div>
        <p id = 'airQualityMeaning'>{{ airQualityMeaning() }}</p>
        </div>
      </div>
      <section id = 'thisWeekSection'>
        <div id = 'thisWeekContainer'><p>This Week</p></div>
        <div id = 'mondayContainer'>
          <h3 class = 'dayTitle'>{{ getDayOfWeek(0) }}</h3>
          <img id = 'mondayImg' src = '../assets/img/sunnyImg.svg'>
          <div id = 'mondayTemp'>
            <p id = 'minTempMonday'>{{getMinAndMaxTemp(0, 'temp_min').min}}°</p>
            <p id = 'maxTempMonday'>/{{getMinAndMaxTemp(0, 'temp_max').max}}°</p>
          </div>
        </div>
        <div id = 'tuesdayContainer'>
          <h3 class = 'dayTitle'>{{ getDayOfWeek(1) }}</h3>
          <img id = 'tuesdayImg' src = '../assets/img/sunnyImg.svg'>
          <div id = 'tuesdayTemp'>
            <p id = 'minTempTuesday'>{{getMinAndMaxTemp(1, 'temp_min').min}}°</p>
            <p id = 'maxTempTuesday'>/{{getMinAndMaxTemp(1, 'temp_max').max}}°</p>
          </div>
        </div>
        <div id = 'wednesdayContainer'>
          <h3 class = 'dayTitle'>{{ getDayOfWeek(2) }}</h3>
          <img id = 'wednesdayImg' src = '../assets/img/sunnyImg.svg'>
          <div id = 'wednesdayTemp'>
            <p id = 'minTempWednesday'>{{getMinAndMaxTemp(2, 'temp_min').min}}°</p>
            <p id = 'maxTempWednesday'>/{{getMinAndMaxTemp(2, 'temp_max').max}}°</p>
          </div>
        </div>
        <div id = 'thursdayContainer'>
          <h3 class = 'dayTitle'>{{ getDayOfWeek(3) }}</h3>
          <img id = 'thursdayImg' src = '../assets/img/sunnyImg.svg'>
          <div id = 'thursdayTemp'>
            <p id = 'minTempThursday'>{{getMinAndMaxTemp(3, 'temp_min').min}}°</p>
            <p id = 'maxTempThursday'>/{{getMinAndMaxTemp(3, 'temp_max').max}}°</p>
          </div>
        </div>
        <div id="fridayContainer">
          <h3 class = 'dayTitle'>{{ getDayOfWeek(4) }}</h3>
          <img id="fridayImg" src="../assets/img/sunnyImg.svg">
          <div id="fridayTemp">
            <p id="minTempFriday">{{getMinAndMaxTemp(4, 'temp_min').min}}°</p>
            <p id="maxTempFriday">/{{getMinAndMaxTemp(4, 'temp_max').max}}°</p>
          </div>
        </div>
      </section>
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
  </main>
</template>
<style>

:root{
  background-color: #EDDED4;
}
#containerWeatherToday{
  position: absolute;
  left: 11.43em;
  top: 7em;
  width: 245px;
  height: 248px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #C3C3C3;
  display: flex;
  justify-content: center;
}
#weatherTodayIllustration{
  max-width: 12em;
  height: auto;
}
#date{
  color: #F8FAFB;
  font-family: Asap;
  font-size: 1.5625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;

}

#location{
  width: 100%;
  margin: 0;

  position: absolute;
  bottom: -2em;
  margin-bottom: 1em;
  padding-left: 3em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #303030;
  font-family: Asap;
  font-size: 2.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#locationCity {
  max-width: calc(100% - 20px);
}
#containerWeatherInfoToday{
  position: absolute;
  left: 28.88em;
  top: 7em;
  width: 34.5625rem;
  height: 15.5rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid #000;
  background: #B7AFE2;
}
#feelsLikeContainer{
  position: absolute;
  left: 2.13em;
  top: 2.81em;
  width: 12.375rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: 3.125rem;
  border: 1px solid #303030;
  background: #D9D5EE;
  display: flex;
  align-items: center;
}
#expectedContainer{
  position: absolute;
  left: 16.38em;
  top: 2.81em;
  width: 16.125rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: 3.125rem;
  border: 1px solid #303030;
  background: #D9D5EE;
  display: flex;
  align-items: center;
}
#humidityContainer{
  position: absolute;
  left: 2.13em;
  top: 7.44em;
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
#rainContainer{
  position: absolute;
  left: 13.5em;
  top: 7.44em;
  width: 8.1875rem;
  height: 5.1875rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #D9D5EE;
}
#windContainer{
  position: absolute;
  left:23.56em;
  top: 7.44em;
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
  position: absolute;
  left: 65em;
  top: 7em;
  width: 15.5rem;
  height: 15.5rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: var(--Secondary-Color-Palette-Sky-Wash, #ADD8FB);
}
#headerNimbusNudges{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-left: 1.12em;
  padding-right: 0.94em;
}
#titleNimbusNudges{
  color: #303030;
  font-family: Asap;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}

#buttonsHeaderNimbusNudges{
  width: 5em;
  height: 2em;
  display: flex;
  justify-content: space-around;
}
#buttonsHeaderNimbusNudges button{
  width: 1.4375rem;
  height: 1.4375rem;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #FAF8ED;
  border: solid 0.05em #303030;
}
#buttonsOptionsNimbusNudges{
  position: absolute;
  bottom: 0;
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

#feelsLikeTitle, #expectedTitle, #humidityTitle, #rainTitle, #windTitle{
  color: #303030;
  position: absolute;
  left: 1.44em;
  text-align: right;
  font-family: Asap;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: absolute;
}
#feelsLikeData, #ColdOrWarm, #expectedData{
  color: var(--Textual-Elements-Stormcloud-Grey, #858585);
  font-family: Asap;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
}
#ColdOrWarm{
  left: 1em;
}
#humidityIcon, #rainIcon, #windIcon{
  position: absolute;
  left: 1.25em;
  top: 1em;
}

#humidityTitle, #rainTitle, #windTitle{
  left: 4.25em;
}
#feelsLikeData{
  left: 6em;
}
#ColdOrWarm{
  left: 8.3em;
}

#expectedTitle{
  left: 1.75em;
}

#expectedData{
  left:6.5em;
}

#rainData, #humidityData, #windData{
  display: flex;
  align-items: center;
  color: var(--Textual-Elements-Stormcloud-Grey, #858585);
  text-align: right;
  font-family: Asap;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  bottom: 0.05em;
  left: 1.19em;
}
#humidityData{
  width: 8em;
  left: 1em;
  display: flex;
  justify-content: space-around;
}

#degreesContainer{
  width: 10rem;
  height: 8.625rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid #000;
  background: rgba(156, 200, 161, 0.80);
  position: absolute;
  top:24em;
  left:11.44em;
  display: flex;
  align-items: center;
  flex-direction: column;
}
#degreesValue{
  color: #303030;
  margin: 0;
  font-family: Recoleta;
  font-size: 6.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  align-self: center;
}
#degreesType, #degrees{
  color: var(--textual-elements-20-saturation-midnight-onyx-20-sat, #302727);
  font-family: Asap;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: absolute;
  bottom:0.2em;
}
#degrees{
  left:2.5em;
}
#degreesType{
  
  right:2.5em;
}

#temperatureGraphContainer{
  width: 38.9375rem;
  height: 8.5625rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid #000;
  background: #F2E6DD;
  position: absolute;
  left: 24.5em;
  top:24em;
}

#airQualityContainer{
  width: 15.4375rem;
  height: 8.75rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #FF87AB;
  position: absolute;
  right: 11.44em;
  top: 24em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#airQualityHeader{
  color: #303030;
  font-family: Asap;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: absolute;
  left: 1.18em;
  top:0.69em;
}

#airQualityData{
  width: 100%;
  height: auto;
  margin: 0;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

#circleAirQuality{
  width: 5.0625rem;
  height: 5.0625rem;
  flex-shrink: 0;
  background-color: #FFECA7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 1.2em ;
  left:1em;
  color: #303030;
  font-family: Recoleta;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
#airQualityMeaning{
  margin-left: 6em;
  margin-bottom:2em;
  color: #F8FAFB;
  text-align: right;
  font-family: Asap;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 7.16244rem;
  height: 3.3125rem;
  flex-shrink: 0;
}
#thisWeekSection{
  display: flex;
  width: 55rem;
  height: 8.3125rem;
  position: absolute;
  left: 10.5em;
  bottom: 1em;
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
  width: 14.25rem;
  height: 8.3125rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid #303030;
  background: var(--primary-color-palette-40-saturation-sunbeam-gold-40-sat, #FAE3AF);
  position: absolute;
  left: 66.31em;
  bottom: 1em;
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

}
#uvHeader{
  align-self:baseline;
  width: 10.5rem;
  height: 1rem;
  padding-top: 0.4em;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1em;
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

}

#uvIllustration{
  align-self: center;
  width: 2em;
  height:1em;
  margin: auto;
  display: flex;
  align-items: center;
  position: absolute;
  top: 75%;
  left: 10%;

}
#uvBigLine{
  width: 10.5rem;
  height: 0.25rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #D9D9D9;
  z-index: 2;
}
#uvSmallLine{
  width: 8.8125rem;
  height: 0.25rem;
  flex-shrink: 0;
  z-index: 4;
  border-radius: 0.625rem;
  background: var(--secondary-color-palette-20-saturation-autumn-blaze-20-sat, #E64000);
  position: absolute;
  left: 0;
}
#uvCircle{
  width: 0.6875rem;
  height: 0.6875rem;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: #FABE32;
  z-index: 5;
  position: absolute;
  left: 8.5em;
}
</style>
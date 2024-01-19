<script>
import { useUserStore } from "@/stores/user";
import { fetchDataByCityName, fetchAirQuality, fetchFiveDayForecast } from '@/weatherService';
import HeaderDashboard from "@/components/HeaderDashboard.vue";
import { useWeatherStore } from '@/stores/weather'
export default {
  name: 'advancedMode',
  data(){
    return{
      isWeatherLoaded: false,
      currentTime: '',
      currentDay: 0,
      currentDate: "",
      currentMonth: "",
      daysOfWeek: ["M", "T", "W", "T", "F", "S", "S"],
      currentYear: new Date().getFullYear(),
      currentMonth: "",
      currentDayOfWeek: "",
      weatherCity: [],
      weather: [],
      countryMapping: {},
    }
  },
  components: {
    HeaderDashboard,
  },
  created() {
    this.fetchWeather()
    this.startUpdatingTime();
  
    this.currentMonth = this.getMonthName(this.monthIndex);
    this.currentDay = new Date().getDate();

    this.fetchCountries();
  },
/*   mounted() {

  }, */
  computed: {
    store() {
       return useUserStore();
     },
     weatherStore() {
      return useWeatherStore()
     },
     weatherData() {
      return this.weatherStore.weatherData;
    },
    regionWeatherData(){
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
      firstDayOfMonth(){
      const firstDay = new Date(this.currentYear, this.monthIndex, 1).getDate()
      return firstDay === 0 ? 6 : firstDay - 1
    },
    daysInMonth(){
      return new Date(this.currentYear, this.monthIndex + 1, 0).getDate()
    },
    monthIndex(){
      return new Date().getMonth()
    }
    },
  methods:{
    async fetchCountries() {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const countries = await response.json();
        this.countryMapping = countries.reduce((acc, country) => {
          // Use alpha2Code (e.g., "PT") as the key
          acc[country.cca2] = country.name.common;
          return acc;
        }, {});
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    },
    async fetchWeather(){
      try {
/*         const region = this.userLocation.region;
        console.log(this.getAuthenticatedUser);
        console.log(this.userLocation);
        console.log(this.userLocations);
        this.weatherStore.updateUserWeather(region, this.userLocations); */
        this.weatherCity = this.weatherStore.weatherData.locations.map((locationData) => {
          return locationData.currentWeather;
        });
        this.weather = this.weatherStore.regionWeatherData.currentWeather
        console.log(this.weather)
        console.log('weather city: ',this.weatherCity)

        
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
    updateCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
  this.currentTime = `${hours}:${formattedMinutes}`;
  // Removed the part that sets currentDay to a string representing the day of the week
  const date = now.getDate();
  this.currentDate = date < 10 ? `0${date}` : date.toString();
  const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
      const dayIndex = now.getDay();
      this.currentDayOfWeek = daysOfWeek[dayIndex];
    
      this.currentDate = date < 10 ? `0${date}` : date.toString();
      const monthIndex = now.getMonth();
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      this.currentMonth = months[monthIndex];
    },
    startUpdatingTime() {
      this.updateCurrentTime();

    
      setInterval(() => {
        this.updateCurrentTime();
      }, 1000);
    },
    getMonthName(index) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return months[index];
    },

    getWeatherIcon() {
    const weatherMain = this.weather.weather[0].main.toLowerCase();
    
    const iconMap = {
      'clear': '../assets/img/sunnyImg.svg',
      'clouds': '../assets/img/cloudImg.svg',
      'rain': '../assets/img/rainImg.svg',
      'thunderstorm':'../assets/img/thunderImg.png',
      'snow':'../assets/img/snowImg.png',
      'mist':'../assets/img/mistImg.png',
    };

    return iconMap[weatherMain] || '../assets/img/sunnyImg.svg';
  },
  getWeatherIcon(iconCode) {
  const baseUrl = 'https://openweathermap.org/img/wn/';
  return `${baseUrl}${iconCode}@2x.png`;
}

  }
  
}
</script>
<template>
   <RouterLink :to="{ name: 'basicModeDashboard' }" id = 'backBtn'><font-awesome-icon icon="fa-solid fa-chevron-left" id = 'backIcon'/></RouterLink>
  <main class = 'dash-body2'>
   
    <div class = 'gridAM '>
    <div class="div0AM gridCellAM">
      <HeaderDashboard />
    </div>
    <section v-if="weather" id='basicInfoToday' class="div1AM gridCellAM" >
      <div id = 'containerBasicWeatherInfo'>
        <!-- <img src="../assets/img/sunnyImg.svg" id = 'todaysWeatherIconAdvacedMode'> -->
        <img :src="getWeatherIcon(weather.weather[0].icon)" id='todaysWeatherIconAdvacedMode' alt="Weather Icon">
        <div id = 'headerBasicWeatherInfo'>
          <h1 id = 'currentTemperatureHeader'>{{Math.round(weather.main.temp)}}°</h1>
          <h2 id = 'degreeTypeHeader'>C</h2>
          <div id = 'locationAdvancedMode'>
            <div class="locationAdvancedMode-row">            <font-awesome-icon icon="location-dot" style="color: #303030;" id ='locationIconAdvancedMode' />
            <h2 id = 'locationCityAdvancedMode'>{{ weather.name }}</h2></div>

            <p v-if="weather.main" id='time'>{{ currentTime }}</p>
          </div>
        </div>
      </div>
      <div id = 'containerTodayCalendar'>
        <div id = 'month'>{{ currentMonth }}</div>
        <div id = 'dateAndDayAdvancedMode'>
          <h2 id = 'dateAdvancedMode'>{{ currentDate }}</h2>
          <h3 id = 'dayAdvancedMode'>{{ currentDayOfWeek }}</h3>
        </div>
      </div>
    </section>
    <section id='citiesContainer' class="div2AM gridCellAM">
  <div v-for="(city, index) in weatherCity" :key="index" class='cityContainer' >
    <div class='cityContainerHeader'>
  <div class='cityName'>{{ city.name }}</div>
  <div class='countryName' v-if="countryMapping[city.sys.country]">{{ countryMapping[city.sys.country] }}</div>
</div>

    <img class='cityWeatherIcon' :src="getWeatherIcon(city.weather[0].icon)" alt="Weather Icon">
    <div class='cityContainerTemperature'>
      <h2 class='currentTempCityContainer'>{{ Math.round(city.main.temp) }}° </h2>
      <h3 class='maxTempCityContainer'> / {{ Math.round(city.main.temp_max) }}°</h3>
    </div>
  </div>
</section>


    <div class="div3AM gridCellAM">
      <section id = 'containerNimbusNudges' >
        <div id = 'headerNimbusNudges'>
          <h3 id = 'titleNimbusNudges'>Nimbus Nudges</h3>
          <div id = 'buttonsHeaderNimbusNudges'>
            <button id = 'leftNimbusNudges'><font-awesome-icon icon="fa-solid fa-arrow-left " style="color: #303030;"  /></button>
            <button id = 'rightNimbusNudges'><font-awesome-icon icon="fa-solid fa-arrow-right" style="color: #303030;" /></button>
          </div>
        </div>
         <div id = 'nimbusNudgesData'>Step into the sun's embrace for a mood-lifting dose of vitamin D, but ensure skin protection by applying sunscreen. Make the most of this radiant day! ☀️</div>
         <div id = 'buttonsOptionsNimbusNudges'>
          <button id = 'allClearBtn'>ALL CLEAR!</button>
          <button id = 'quietTheSkiesBtn'>QUIET THE SKIES</button>
         </div>
      </section>
    </div>

      <section id = 'temperatureGraphContainerAdvancedMode' class="div4AM gridCellAM">
        <img src = '../assets/img/graphAdvancedMode.svg' id ='imgGraphAdvancedMode'>
      </section>
      <section id = 'weatherInfoAdvancedModeContainer' class="div5AM gridCellAM">
        <div id = 'windContainerAdvancedMode'>
          <div class = 'headerContainers'>
            <h2 class = 'weatherInfoContainerHeader' id = 'windTitle' >Wind</h2>
            <img class = 'weatherInfoIllustrations' alt = 'Wind' src = '../assets/img/windIcon.svg'>
          </div>
          <h3 class = 'dataContainers'>{{ weather.wind.speed }} m/s</h3>
          
        </div>
        <div id = 'rainContainerAdvancedMode'>
          <div class = 'headerContainers'>
            <h2 class = 'weatherInfoContainerHeader' id = 'rainTitle'>Rain</h2>
            <img class = 'weatherInfoIllustrations' alt = 'Rain' src = '../assets/img/rainIcon.svg'>
          </div>
          <h3 class = 'dataContainers'> {{ weatherStore.regionWeatherData.fiveDayForecast && weatherStore.regionWeatherData.fiveDayForecast.list ? Math.round(weatherStore.regionWeatherData.fiveDayForecast.list[0].pop * 100) :'' }}  %</h3>
        </div>
        <div id = 'humidityContainerAdvancedMode'>
          <div class = 'headerContainers'>
            <h2 class = 'weatherInfoContainerHeader' id = 'humidityTitle'>Humidity</h2>
            <img class = 'weatherInfoIllustrations' alt = 'Humidity' src = '../assets/img/humidityIcon.svg'>
          </div>
          <h3 class = 'dataContainers'>{{ weather.main.humidity }} %</h3>
        </div>
        <div id = 'wavesContainerAdvancedMode'>
          <div class = 'headerContainers'>
            <h2 class = 'weatherInfoContainerHeader' id = 'wavesTitle'>Sea Levels</h2>
            <img class = 'weatherInfoIllustrations' alt = 'Waves' src = '../assets/img/wavesIcon.png'>
          </div>
          <h3 class='dataContainers' v-if="weather.main && weather.main.sea_level">{{ weather.main.sea_level }} hPa</h3>
          <h3 class='dataContainers' v-else>N/A</h3>
        </div>
        <div id = 'visibilityContainerAdvancedMode'>
          <div class = 'headerContainers'>
            <h2 class = 'weatherInfoContainerHeader' id = 'visibilityTitle'>Visibility</h2>
            <img class = 'weatherInfoIllustrations' alt = 'Visibility' src = '../assets/img/visibilityIcon.png'>
          </div>
          <h3 class = 'dataContainers'>{{ weather.visibility / 1000 }} km</h3>
        </div>
        <div id = 'pressureContainerAdvancedMode'>
          <div class = 'headerContainers'>
            <h2 class = 'weatherInfoContainerHeader' id ='pressureTitle'>Pressure</h2>
            <img class = 'weatherInfoIllustrations' alt = 'Pressure' src = '../assets/img/pressureIcon.svg'>
          </div>
          <h3 class = 'dataContainers'>{{weather.main.pressure}}hPa</h3>
        </div>
      </section> 
      <section id = 'calendarAdvancedMode' class="div6AM gridCellAM" >
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
<style>
.v-main {align-items: center;
overflow: hidden;}

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
/*   padding: 13px 13px; */
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease-in-out; 
  display: flex;
  justify-content: center;
}
.div0AM { grid-area: 1 / 1 / 2 / 5;
border-radius: 50px 50px 10px 10px ;}

.div1AM { /* grid-area: 2 / 1 / 3 / 2; */
  
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;}

.div2AM { 
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;}

.div3AM {

  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 3;}

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
  .div5AM.gridCellAM { justify-content: flex-start;
   overflow: visible;
   border: 0;
}



.div6AM { /* grid-area: 3 / 4 / 4 / 4; */

  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 3;
  grid-row-end: 4;}

#backBtn{
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
#backIcon{
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
#containerBasicWeatherInfo {
    width: 60%;
    padding: 1rem;
    /* height: 10.0625rem; */
    flex-shrink: 0;
    border-radius: 1.25rem;
    border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
    background: var(--secondary-color-palette-20-saturation-sky-wash-20-sat, #DFEFFB);
    display: flex;
    justify-content: space-around;
    align-items: center;
}
/* #todaysWeatherIconAdvacedMode{
  width: 8rem;
  height: auto;
  z-index: 2;
} */
#locationIconAdvancedMode {
  transform: translateY(-4px);
}
#currentTemperatureHeader{
  color: #303030;
  font-family: Recoleta;
  font-size: 6rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0;
}
#degreeTypeHeader{
  color: #303030;
  font-family: Recoleta;
  font-size:3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  position:absolute;
  /* left:6em; */
  transform: translateY(4%);
  margin: 0;
}
#headerBasicWeatherInfo {
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
}
#locationAdvancedMode {
    /* height: 3em; */
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
  margin-top: 0;
  margin-bottom: 0;
  transform: translateY(1px);
}

#locationAdvancedMode h2 {
  margin-left: 0.3rem;
  margin-bottom: 0;
  margin-top: 0;
}
#locationCityAdvancedMode, #locationIconAdvancedMode{
  align-items: center;
  color: #303030;
  font-family: Asap;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
#locationCity{
  margin-right: 2em;
}
#time{
  color: #303030;
  font-family: Recoleta;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left:0.5em;
}
#containerTodayCalendar{
  width: 7.875rem;
  height: 9.625rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #F2E6DD;
/*   position: absolute;
  top:2.37em;
  right:2.19em; */
  display: flex;
  flex-direction: column;
  align-items: center;
}
#month {
    width: 7.875rem;
    height: 2.75rem;
    flex-shrink: 0;
    border-radius: 1.0rem 1.0rem 0rem 0rem;
    /* border: 1px solid #000; */
    background: #E74727;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #303030;
    font-family: Asap;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
}
#dateAndDayAdvancedMode{
  width: 7.875em;
  height: 7em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  z-index: 1;
}
#dateAdvancedMode{
  color: #303030;
  font-family: Recoleta;
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
}
#dayAdvancedMode{
  color: #303030;
  font-family: Asap;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;  
}
#basicInfoToday{
/*   width: 35.4375rem;
  height: 14.312rem;
  flex-shrink: 0; */
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: var(--Primary-Color-Palette-Sunbeam-Gold, #FAC54B);
  display: flex;
  align-items: center;
  justify-content: space-around;
  /*
  position: absolute;
  left: 8.44em;
  top:7em;
  */
}
#citiesContainer{
    background: var(--secondary-color-palette-20-saturation-orchid-flush-20-sat, #E15CC9);
    display: flex;
    align-items: center;
    /* flex-direction: column; */
    justify-content: space-evenly;
    flex-wrap: wrap;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.cityContainer {
/*     width: 7rem;
    height: 7rem; */
    /* flex-shrink: 0; */
    border-radius: 1.25rem;
    border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
    background: #F2E6DD;
    width: 5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0.8rem;
}
.cityContainerHeader{
  width: 100%;
 /*  margin-top: 0.5em; */
  justify-self: flex-start;
  height: 1.55625rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 5;
}

#headerNimbusNudges{
  padding-top: 0;
}
.cityName {
  color: #E65E2A;
  font-family: Asap;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;       
  overflow: hidden;          
  text-overflow: ellipsis;   
  width: 100%;              
  text-align: center;     
}

.countryName{
  color: #303030;
  font-family: Asap;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.cityWeatherIcon{
  max-width: 4em;
  height: auto;
  z-index: 2;
}
.cityContainerTemperature{
  display: flex;
  flex-direction: row ;
  align-items: center;
  height: 1em;
}
.currentTempCityContainer{
  color: #303030;
text-align: right;
font-family: Asap;
font-size: 1.5625rem;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-right: 0.3rem;
}

.maxTempCityContainer{
  color: #303030;
text-align: right;
font-family: Asap;
font-size: 0.9rem;
font-style: normal;
font-weight: 400;
line-height: normal;
margin: 0;
margin-left: -0.5em;
margin-bottom: -0.5em;
}
#temperatureGraphContainerAdvancedMode{
/*   width: 34.125rem;
  height: 17.9375rem; */
 /*  flex-shrink: 0; */
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #F2E6DD;
  /*
  position: absolute;
  left: 8.44em;
  top:23.62em;
  */
  display: flex;
  justify-content: center;
  align-items: center;
}

#imgGraphAdvancedMode{
  margin-right: 1em;
}

#weatherInfoAdvancedModeContainer{
  display: flex;
/*   width: 11.25rem;
  height: 19.6875rem;
  flex-shrink: 0; */
  /*
  position: absolute;
  left: 45.75em;
  top:23.62em;
  */
  flex-direction: column;
}


/* #weatherInfoAdvancedModeContainer > div:not(#pressureContainerAdvancedMode):hover {
  transform: translateY(-1.5em); 
  transition: transform 0.3s ease-in-out;
} */

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

/* Apply the transition to all divs */
#weatherInfoAdvancedModeContainer > div {
  transition: transform 0.3s ease-in-out;
}


#weatherInfoAdvancedModeContainer #pressureContainerAdvancedMode {
  border-radius: 1.25rem;
}


#windContainerAdvancedMode, #rainContainerAdvancedMode, #humidityContainerAdvancedMode,#wavesContainerAdvancedMode, #visibilityContainerAdvancedMode, #pressureContainerAdvancedMode{
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
#windContainerAdvancedMode{
  background: #C8BDFF;
/*   position: absolute;
  top:1.5em; */
}
#rainContainerAdvancedMode{
  background: #43AA8B;
  transform: translateY(-40px);
/*   position: absolute;
  top:4em; */
}
#humidityContainerAdvancedMode{
  background: #FFEA8A;
  transform: translateY(-80px);
/*   position: absolute;
  top:6.5em; */
}
#wavesContainerAdvancedMode{
  background: #F4F4F4;
  transform: translateY(-120px);
/*   position: absolute;
  top:9em; */
}
#visibilityContainerAdvancedMode{
  background: #FFA646;
  transform: translateY(-160px);
/*   position: absolute;
  top:11.5em; */
}

#pressureContainerAdvancedMode{
  background: #FFBEED;
  transform: translateY(-200px);
/*   position: absolute;
  top:14em;
  height: 8rem; */
}

.headerContainers{
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
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-top: 0.40em;
  flex-direction: row;
}
#pressureTitle{
  color: #B21C29;
}
#windTitle{
  color: #685E9A;
}
#rainTitle{
  color: #185850;
}
#humidityTitle{
  color: #826022;
}
#wavesTitle{
  color: #303030;
  font-size: 1.4rem;
}
#visibilityTitle{
  color: #9B4F19;
}

.dataContainers{
  width: auto;
  height: auto;
  flex-shrink: 0;
    color: #484848;
  font-family: Asap;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  justify-content: center;
  margin: 0;
  margin-top: 0.2em;
  margin-left: 1.13em;
}

#calendarAdvancedMode{

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
    font-size: 1rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    margin: 0;
    /* width: 5em; */
    margin-top: 1em;
    margin-left: 1.3rem;
    /* padding-left: 2em; */
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
  font-style: normal;
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
  background-color: #E18AD1; /* Pink background */
  border: 1px solid #303030; /* Solid border */
  color: #303030; /* Text color for better contrast */
  width: 2.0625rem;
  height: 2.0625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}


</style>
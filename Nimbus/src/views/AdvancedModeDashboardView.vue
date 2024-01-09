<script>
</script>
<template>
  <main>
    <RouterLink :to="{ name: 'basicModeDashboard' }" id = 'backBtn'><font-awesome-icon icon="fa-solid fa-chevron-left" id = 'backIcon'/></RouterLink>
    <section id = 'basicInfoToday'>
      <div id = 'containerBasicWeatherInfo'>
        <img src = '../assets/img/cloudImg.svg' id = 'todaysWeatherIconAdvacedMode'>
        <div id = 'headerBasicWeatherInfo'>
          <h1 id = 'currentTemperatureHeader'>23°</h1>
          <h2 id = 'degreeTypeHeader'>c</h2>
          <div id = 'locationAdvancedMode'>
            <font-awesome-icon icon="location-dot" style="color: #303030;" id ='locationIconAdvancedMode' />
            <h2 id = 'locationCityAdvancedMode'>Porto</h2>
            <p id = 'time'>16:44</p>
          </div>
        </div>
      </div>
      <div id = 'containerTodayCalendar'>
        <div id = 'month'>NOV</div>
        <div id = 'dateAndDayAdvancedMode'>
          <h2 id = 'dateAdvancedMode'>26</h2>
          <h3 id = 'dayAdvancedMode'>SUNDAY</h3>
        </div>
      </div>
    </section>
    <section id = 'citiesContainer'>
      <div class = 'cityContainer'>
        <div class = 'cityContainerHeader'>
          <div class = 'cityName'>Lisbon</div> 
          <div class = 'countryName'>Portugal</div>
        </div>
        <img class = 'cityWeatherIcon' src  = '../assets/img/sunnyImg.svg'>
        <div class = 'cityContainerTemperature'>
          <h2 class = 'currentTempCityContainer'>19°</h2>
          <h3 class = 'maxTempCityContainer'>/23°</h3>
        </div>
      </div>
      <div class = 'cityContainer'>
        <div class = 'cityContainerHeader'>
          <div class = 'cityName'>Cape Town</div> 
          <div class = 'countryName'>South Africa</div>
        </div>
        <img class = 'cityWeatherIcon' src  = '../assets/img/sunnyImg.svg'>
        <div class = 'cityContainerTemperature'>
          <h2 class = 'currentTempCityContainer'>36°</h2>
          <h3 class = 'maxTempCityContainer'>/41°</h3>
        </div>
      </div>
      <div class = 'cityContainer'>
        <div class = 'cityContainerHeader'>
          <div class = 'cityName'>Bogotá</div> 
          <div class = 'countryName'>Colombia</div>
        </div>
        <img class = 'cityWeatherIcon' src  = '../assets/img/sunnyImg.svg'>
        <div class = 'cityContainerTemperature'>
          <h2 class = 'currentTempCityContainer'>24°</h2>
          <h3 class = 'maxTempCityContainer'>/31°</h3>
        </div>
      </div>
      <div class = 'cityContainer'>
        <div class = 'cityContainerHeader'>
          <div class = 'cityName'>Madrid</div> 
          <div class = 'countryName'>Spain</div>
        </div>
        <img class = 'cityWeatherIcon' src  = '../assets/img/sunnyImg.svg'>
        <div class = 'cityContainerTemperature'>
          <h2 class = 'currentTempCityContainer'>18°</h2>
          <h3 class = 'maxTempCityContainer'>/21°</h3>
        </div>
      </div>
    </section>
    <section id = 'containerNimbusNudgesAdvancedMode'>
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
      </section>
      <section id = 'temperatureGraphContainerAdvancedMode'></section>
      <section id = 'weatherInfoAdvancedModeContainer'>
        <div id = 'windContainerAdvancedMode'></div>
        <div id = 'rainContainerAdvancedMode'></div>
        <div id = 'humidityContainerAdvancedMode'></div>
        <div id = 'wavesContainerAdvancedMode'></div>
        <div id = 'visibilityContainerAdvancedMode'></div>
        <div id = 'pressureContainerAdvancedMode'></div>
      </section> 

  </main>
</template>
<style>


#backBtn{
width: 3.125rem;
  height: 3.125rem;
  border-radius: 100px;
  border: 0.1em solid #303030;
  cursor: pointer;
  position: absolute;
  top: 1.13em;
  left: 1.37em;
  display: flex;
  justify-content: center;
  align-items: center;
}
#backIcon{
  font-size: 1.5em;
}
#containerNimbusNudgesAdvancedMode{
  position: absolute;
  left: 63em;
  top: 7em;
  width: 15.5rem;
  height: 14.312rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: var(--Secondary-Color-Palette-Sky-Wash, #ADD8FB);
}
#containerBasicWeatherInfo{
  width: 21.0625rem;
height: 10.0625rem;
flex-shrink: 0;
border-radius: 1.25rem;
border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
background: var(--secondary-color-palette-20-saturation-sky-wash-20-sat, #DFEFFB);
position: absolute;
left: 2em;
top:2.37em;
display: flex;
}
#todaysWeatherIconAdvacedMode{
  max-width: 10.5rem;
  height: auto;
  z-index: 2;
  margin-left: 2em;
}
#currentTemperatureHeader{
  color: #303030;
  font-family: Recoleta;
  font-size: 6rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  align-self: start;
  margin: 0;
  margin-bottom: 0.2em;
}
#degreeTypeHeader{
  color: #303030;
  font-family: Recoleta;
  font-size: 3.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  position: absolute;
  left:2.44em;
  top: -0.38em;
}
#headerBasicWeatherInfo{
  width: 10.3125rem;
  height: 8.1875rem;
  position: absolute;
  top:1.5em;
  right:1.25em;
  z-index: 3;
  display: flex;
  flex-direction: column-reverse;
}
#locationAdvancedMode{
  width: 100%;
  height: 2em;
  position: absolute;
  bottom: 0em;
  margin-bottom: 1em;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
}
#containerTodayCalendar{
  width: 7.875rem;
  height: 9.625rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #F2E6DD;
  position: absolute;
  top:2.37em;
  right:2.19em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#month{
  width: 7.875rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: 1.25rem 1.25rem 0rem 0rem;
  border: 1px solid #000;
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
  width: 35.4375rem;
  height: 14.312rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: var(--Primary-Color-Palette-Sunbeam-Gold, #FAC54B);
  position: absolute;
  left: 8.44em;
  top:7em;
}
#citiesContainer{
  width: 15.5rem;
  height:14.312rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: var(--secondary-color-palette-20-saturation-orchid-flush-20-sat, #E15CC9);
  position: absolute;
  left:45.75em;
  top:7em;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: wrap;
  
}
.cityContainer{
  width:6rem;
  height:6rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #F2E6DD;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.cityContainerHeader{
  width: 100%;
  margin-top: 0.5em;
  justify-self: flex-start;
  height: 1.55625rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 5;
}

.cityName{
  color: #E65E2A;
  font-family: Asap;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
  width: 34.125rem;
  height: 17.9375rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #F2E6DD;
  position: absolute;
  left: 8.44em;
  top:23.62em;
}

#weatherInfoAdvancedModeContainer{
  display: flex;
  width: 11.25rem;
  height: 19.6875rem;
  flex-shrink: 0;
  position: absolute;
  left: 45.75em;
  top:23.62em;
  flex-direction: column;
}





#windContainerAdvancedMode, #rainContainerAdvancedMode, #humidityContainerAdvancedMode,#wavesContainerAdvancedMode, #visibilityContainerAdvancedMode, #pressureContainerAdvancedMode{
  width: 11.25rem;
  height: 8rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
}
#windContainerAdvancedMode{
  background: #C8BDFF;
}
#rainContainerAdvancedMode{
  background: #43AA8B;
  position: absolute;
  top:2.50em;
}
#humidityContainerAdvancedMode{
  background: #FFEA8A;
  position: absolute;
  top:5em;
}
#wavesContainerAdvancedMode{
  background: #F4F4F4;
  position: absolute;
  top:7.50em;
}
#visibilityContainerAdvancedMode{
  background: #FFA646;
  position: absolute;
  top:10em;
}

#pressureContainerAdvancedMode{
  background: #FFBEED;
  position: absolute;
  top:13.50em;
  height: 5rem;
}
</style>
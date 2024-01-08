<script>

</script>
<template>
  <main>
    <div id="basicModeContainer">
      <div id = 'containerWeatherToday'>
        <!-- info do clima aqui (iamgem, cidade e data do dia) -->
        <h3 id = 'date'>Sunday, 26 Nov</h3>
        <div id = 'location'>
          <font-awesome-icon icon="location-dot" style="color: #303030;" />
          <h2 id = 'locationCity'>Porto</h2>
        </div>


      </div>
      <div id = 'containerWeatherInfoToday'>
        <div id = 'feelsLikeContainer'>
          <p id = 'feelsLikeTitle'>Feels Like</p>
          <p id = 'feelsLikeData'>23º</p>
          <p id = 'ColdOrWarm'>Warm</p>
        </div>
        <div id = 'expectedContainer'>
          <p id = 'expectedTitle'>Expected</p>
          <p id = 'expectedData'>Cloudy Afternoon</p>
        </div>
        <div id = 'humidityContainer'>
          <div id = 'humidityContainerHeader'>
            <img src = '../assets/img/humidityIcon.svg' id = 'humidityIcon'>
          <p id = 'humidityTitle'>Humidity</p>
          </div>
          <div id = 'humidityData'>
            <p id = 'humidityPercentage'>85%</p>
            <p id = 'refreshingOrDry'>Refreshing</p>
          </div>
        </div>
        <div id = 'rainContainer'>
          <div id = 'rainContainerHeader'>
            <img src = '../assets/img/rainIcon.svg' id = 'rainIcon'>
            <p id = 'rainTitle'>Rain</p>
          </div>
          <p id = 'rainData'>15% Chance</p>
        </div>
        <div id = 'windContainer'>
          <div id = 'windContainerHeader'>
            <img src = '../assets/img/windIcon.svg' id = 'windIcon'>
            <p id = 'windTitle'>Wind</p>
          </div>
          <p id = 'windData'>Gentle Breeze</p>
        </div>
        <RouterLink :to="{ name: 'advancedModeDashboard' }" id = 'seeMoreBtn'>See more</RouterLink>
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
          <h1 id = 'degreesValue'>23</h1>
          <p id = 'degrees'>degrees</p>
          <p id = 'degreesType'>celsius</p>
      </div>
      <div id = 'temperatureGraphContainer'></div>
      <div id = 'airQualityContainer'>
        <div id = 'airQualityHeader'>AirQuality</div>
        <div id = 'circleAirQuality'></div>
      </div>
      <section id = 'thisWeekSection'>
        <div id = 'thisWeekContainer'><p>This Week</p></div>
        <div id = 'mondayContainer'>
          <h3 id = 'monday'>MON</h3>
          <img id = 'mondayImg' src = '../assets/img/sunnyImg.svg'>
          <div id = 'mondayTemp'>
            <p id = 'minTempMonday'>10°</p>
            <p id = 'maxTempMonday'>/22°</p>
          </div>
        </div>
        <div id = 'tuesdayContainer'>
          <h3 id = 'tuesday'>TUE</h3>
          <img id = 'tuesdayImg' src = '../assets/img/sunnyImg.svg'>
          <div id = 'tuesdayTemp'>
            <p id = 'minTempTuesday'>10°</p>
            <p id = 'maxTempTuesday'>/21°</p>
          </div>
        </div>
        <div id = 'wednesdayContainer'>
          <h3 id = 'wednesday'>WED</h3>
          <img id = 'wednesdayImg' src = '../assets/img/sunnyImg.svg'>
          <div id = 'wednesdayTemp'>
            <p id = 'minTempWednesday'>08°</p>
            <p id = 'maxTempWednesday'>/22°</p>
          </div>
        </div>
        <div id = 'thursdayContainer'>
          <h3 id = 'thursday'>THU</h3>
          <img id = 'thursdayImg' src = '../assets/img/sunnyImg.svg'>
          <div id = 'thursdayTemp'>
            <p id = 'minTempThursday'>10°</p>
            <p id = 'maxTempThursday'>/21°</p>
          </div>
        </div>
        <div id="fridayContainer">
          <h3 id="friday">FRI</h3>
          <img id="fridayImg" src="../assets/img/sunnyImg.svg">
          <div id="fridayTemp">
            <p id="minTempFriday">10°</p>
            <p id="maxTempFriday">/23°</p>
          </div>
        </div>
        <div id = 'saturdayContainer'>
          <h3 id = 'saturday'>SAT</h3>
          <img id = 'saturdayImg' src = '../assets/img/sunnyImg.svg'>
          <div id = 'saturdayTemp'>
            <p id = 'minTempSaturday'>11°</p>
            <p id = 'maxTempSaturday'>/25°</p>
          </div>
        </div>
        <div id = 'sundayContainer'>
          <h3 id = 'sunday'>SUN</h3>
          <img id = 'sundayImg' src = '../assets/img/sunnyImg.svg'>
          <div id = 'sundayTemp'>
            <p id = 'minTempSunday'>10°</p>
            <p id = 'maxTempSunday'>/21°</p>
          </div>
        </div>
      </section>
      <div id = 'sunshineInfo'>
        <span id = 'sunriseSunsetContainer'>
          <div id = 'sunriseContainer'>
            <p id = 'sunrise'>Sunrise</p>
            <p id = 'sunriseTime'>6:42 am</p>
          </div>
            <div id = 'sunriseSunsetIllustration'>
              <div id = 'sunriseSunsetBigLine'></div>
              <div id = 'sunriseSunsetSmallLine'></div>
              <div id = 'sunsireSunsetCircle'></div>
            </div>
       
          <div id = 'sunsetContainer'>
            <p id = 'sunset'>Sunset</p>
            <p id = 'sunsetTime'>8:12 pm</p>
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
  width: 40%;
  height: 1em;
  position: absolute;
  bottom: 0em;
  margin-bottom: 1em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #303030;
  font-family: Asap;
  font-size: 2.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
  left: 7.5em;
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
  width: 7em;
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
  top:24.81em;
  left:11.44em;
}
#degreesValue{
  color: #303030;
  font-family: Recoleta;
  font-size: 6.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  position: absolute;
  right: 0.21em;
  bottom: -0.5em;
}
#degreesType, #degrees{
  color: var(--textual-elements-20-saturation-midnight-onyx-20-sat, #302727);
  font-family: Asap;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: absolute;
}
#degrees{
  bottom:1.19em;
  left:2.5em;
}
#degreesType{
  bottom:1.19em;
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
  top:24.94em;
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
  top: 24.81em;
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

#circleAirQuality{
  width: 5.0625rem;
  height: 5.0625rem;
  flex-shrink: 0;
  background-color: #FFECA7;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  bottom: 1.2em ;
  left:1em;
}

#thisWeekSection{
  display: flex;
  width: 55rem;
  height: 8.3125rem;
  position: absolute;
  left: 11.44em;
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

#mondayContainer, #tuesdayContainer, #wednesdayContainer, #thursdayContainer, #fridayContainer, #saturdayContainer, #sundayContainer{
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

#mondayContainer h3, #tuesdayContainer h3, #wednesdayContainer h3, #thursdayContainer h3, #fridayContainer h3, #saturdayContainer h3, #sundayContainer h3{
  margin-top: 0.5em;
}

#sundayTemp, #mondayTemp, #tuesdayTemp, #thursdayTemp, #saturdayTemp, #wednesdayTemp, #fridayTemp{
  margin-top: auto; 
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

#sundayTemp p,
#mondayTemp p,
#tuesdayTemp p,
#thursdayTemp p,
#saturdayTemp p,
#wednesdayTemp p,
#fridayTemp p {
  margin: 0; 
  margin-bottom: 0.5em;
}

#minTempMonday, #minTempTuesday, #minTempWednesday, #minTempThursday, #minTempFriday, #minTempSaturday, #minTempSunday{
  color: #303030;
text-align: right;
font-family: Asap;
font-size: 1.125rem;
font-style: normal;
font-weight: 700;
line-height: normal;
}
#maxTempMonday, #maxTempTuesday, #maxTempWednesday, #maxTempThursday, #maxTempFriday, #maxTempSaturday, #maxTempSunday{
  
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
  width: 4.5rem;
  height: 0.25rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #D9D9D9;
  z-index: 2;
}
#sunriseSunsetSmallLine{
  width: 1.5rem;
  height: 0.25rem;
  flex-shrink: 0;
  z-index: 4;
  border-radius: 0.625rem;
  background: var(--secondary-color-palette-40-saturation-sky-wash-40-sat, #49ABFB);
  position: absolute;
  left: 0;
}
#sunsireSunsetCircle{
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
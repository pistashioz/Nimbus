<script>
</script>
<template>
  <main>
    <RouterLink :to="{ name: 'basicModeDashboard' }" id = 'backBtn'><font-awesome-icon icon="fa-solid fa-chevron-left" id = 'backIcon'/></RouterLink>
    <section id = 'basicInfoToday'>
      <div id = 'containerBasicWeatherInfo'>
        <img src = '../assets/img/cloudImg.svg'>
        <div id = 'headerBasicWeatherInfo'>
          <h1 id = 'currentTemperatureHeader'>23°</h1>
          <h2 id = 'degreeTypeHeader'>c</h2>
          <div id = 'location'>
            <font-awesome-icon icon="location-dot" style="color: #303030;" />
            <h2 id = 'locationCity'>Porto</h2>
            <p id = 'time'>16:44</p>
          </div>
        </div>
      </div>
      <div id = 'containerTodayCalendar'>
        <div id = 'month'>NOV</div>
        <div id = 'dateAndDay'>
          <h2 id = 'date'>26</h2>
          <h3 id = 'day'>SUNDAY</h3>
        </div>
      </div>
    </section>
    <section id = 'citiesContainer'></section>
    <section id = 'containerNimbusNudges'>
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
#basicInfoToday{
  width: 35.4375rem;
  height: 15.5rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: var(--Primary-Color-Palette-Sunbeam-Gold, #FAC54B);
  position: absolute;
  left: 5.44em;
  top:7em;
}
#citiesContainer{
  width: 15.5rem;
  height: 15.5rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: var(--secondary-color-palette-20-saturation-orchid-flush-20-sat, #E15CC9);
  position: absolute;
  left:45.75em;
  top:7em;
  
}

</style>
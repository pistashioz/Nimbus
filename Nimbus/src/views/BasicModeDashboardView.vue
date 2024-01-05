<script>

</script>
<template>
  <main>
    <div id="basicModeContainer">
      <div id = 'containerWeatherToday'>
        <!-- info do clima aqui (iamgem, cidade e data do dia) -->
      </div>
      <div id = 'containerWeatherInfoToday'>
        <div id = 'feelsLikeContainer'></div>
        <div id = 'expectedContainer'></div>
        <div id = 'humidityContainer'></div>
        <div id = 'rainContainer'></div>
        <div id = 'windContainer'></div>
        <RouterLink :to="{ name: 'advancedModeDashboard' }" id = 'seeMoreBtn'>See more</RouterLink>
      </div>
      <div id = 'containerNimbusNudges'>

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
  left: 5.43em;
  top: 10em;
  width: 245px;
  height: 248px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: #C3C3C3;
}
#containerWeatherInfoToday{
  position: absolute;
  left: 22.88em;
  top: 10em;
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
</style>
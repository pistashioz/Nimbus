<script>


document.addEventListener('DOMContentLoaded', function () {
  const goTopBtn = document.querySelector('.scrollTopBtn');
  console.log(goTopBtn)
  window.addEventListener('scroll', checkHeight);

  function checkHeight() {
    if (window.scrollY > 800) {
      goTopBtn.style.display = 'flex';
    } else {
      goTopBtn.style.display = 'none';
    }
  }

  goTopBtn.addEventListener('click', ()=>{
    window.scrollTo({
      top: 0
    })
  })
});

</script>
<template>
  <main>
    <div id = 'introText' class = 'text'>Embrace the sky's narrative with Nimbus – your dedicated daily weather guide. Our cutting-edge platform merges precision forecasting with user-friendly design, ensuring you stay ahead of the weather, whatever your day holds. Whether you're a planner, an adventurer, or just looking for a sunny spot to relax, Nimbus brings you real-time weather updates with a touch of charm. <br><br> Join us on a journey where each cloud tells a story, and every raindrop is a beat in the rhythm of your day. With Nimbus, you're not just checking the weather; you're syncing your life with the pulse of the planet. So, why wait? Sign up today and transform how you interact with the world around you.</div>
    <button id = 'accDashboardBtn'>Access the Dashboard</button>
    <span id = 'AboutSection'>
      <div id = 'aboutTitle'>
        <h1 id = 'forecasting'>Forecasting</h1>
        <img id = 'logoImgAbout' src = '../assets/logo.svg'>
        <h1 id = 'reimagined'>REIMAGINED</h1>
        <h1 id = 'welcomeToNimbus'>Welcome to Nimbus.</h1>
      </div>
      <div id = 'aboutContent'>
        <button id = 'introductionBtn'>01. INTRODUCTION</button> 
        <button id = 'featuresBtn'>02. FEATURES</button>
        <button id = 'teamBtn'>03. TEAM</button>
      </div>
      <button class = 'scrollTopBtn'>Scroll</button>
    </span>
    <section id = 'nimbusAttributes'>
      <div id  = 'attTitle'>
        <h2 id = 'attributesTitleText'>From Clouds to Clarify: Your Weather Ally.</h2>
        <img id = 'underlineImg' src = '../assets/img/underline.svg'>
      </div>
      <span id = 'attributesContent'>
        <div class= 'containersAttributes' id = 'realTimeUpd'>
          <h3 class = 'attributesHeader' id = 'realTimeUpdHeader'>Real-Time Updates</h3>
          <img class = 'attributesImg' src = '../assets/img/Attribute1Img.svg'>
          <p class = 'attributesText'>Stay informed with real-time weather updates that ensure you're never caught off guard.</p>
        </div>
        <div class= 'containersAttributes' id = 'precisionForecast'>
          <h3 class = 'attributesHeader' id = 'presicionForecastHeader'>Precision Forecasting</h3>
          <img class = 'attributesImg' src = '../assets/img/Attribute2Img.svg'>
          <p class = 'attributesText'>Our state-of-the-art prediction algorithms mean you’re always one step ahead of the weather.</p>
        </div>
        <div class= 'containersAttributes' id = 'presonalizedWeather'>
          <h3 class = 'attributesHeader'>Personalized Weather Experience</h3>
          <img class = 'attributesImg' src = '../assets/img/Attribute3Img.svg'>
          <p class = 'attributesText'>Customize your alerts to receive the information that matters most to you.</p>
        </div>
      </span>
    </section>
    <hr class="solid">
    <section id = 'reviews'>
      <h3 id = 'subHeadingReviews'>Beyond the forecast</h3>
      <h2 id = 'headingReviews'>Nimbus awaits</h2>
      <section class = 'containerReview'>
        <div class = 'cardContainer'>
        <div class = 'cardContent'>
          <div class = 'swipper-wrapper'>
            <article class = 'cardArticle'>
              <div class = 'cardImage'>
                <img src = '../assets/img/quotationMarkReview.svg'>
              </div>
              <div class = 'cardData'>
                <p class = 'cardDescription'>Top-notch weather app! Nimbus keeps me informed with accurate forecasts and handy features. The attention to detail in both design and data sets it apart.</p>
                <small class = 'cardName'>Freya, Norway</small>
              </div>
            </article>

            <article class = 'cardArticle'>
              <div class = 'cardImage'>
                <img src = '../assets/img/quotationMarkReview.svg'>
              </div>
              <div class = 'cardData'>
                <p class = 'cardDescription'>Five stars for Nimbus! The app delivers precise weather updates with an elegant interface. The interactive map is a great touch, providing a comprehensive view.</p>
                <small class = 'cardName'>Isabella, Sweeden</small>
              </div>
            </article>

            <article class = 'cardArticle'>
              <div class = 'cardImage'>
                <img src = '../assets/img/quotationMarkReview.svg'>
              </div>
              <div class = 'cardData'>
                <p class = 'cardDescription'>Nimbus is my weather go-to! Accurate forecasts, user-friendly interface, and an interactive radar map for a complete experience. Highly recommended!</p>
                <small class = 'cardName'>Alex, Canada</small>
              </div>
            </article>

            <article class = 'cardArticle'>
              <div class = 'cardImage'>
                <img src = '../assets/img/quotationMarkReview.svg'>
              </div>
              <div class = 'cardData'>
                <p class = 'cardDescription'>Informative and customizable. Real-time notifications for severe weather are a plus. A reliable weather companion</p>
                <small class = 'cardName'>Zoe, UK</small>
              </div>
            </article>

            <article class = 'cardArticle'>
              <div class = 'cardImage'>
                <img src = '../assets/img/quotationMarkReview.svg'>
              </div>
              <div class = 'cardData'>
                <p class = 'cardDescription'>Outstanding! Nimbus provides precise forecasts with a sleek design. Love the real-time notifications for severe weather. A top-notch weather app!</p>
                <small class = 'cardName'>Aisha, UAE</small>
              </div>
            </article>
          </div>
        </div>
      </div>
      </section>
    </section>
    <hr class="solid" id = 'secondDivider'>
    <footer>
      <div id = 'legalRsrc'>
        <img id = 'lglRsrcImg' src = '../assets/img/EllipseLegalResources.svg'>
        <RouterLink :to="{ name: 'legalResources' }" id = 'legalResourcesBtn'>legal resources</RouterLink>
      </div>
      <div id = 'addInfo'>
        <img id = 'addInfoImg' src = '../assets/img/EllipseAdditionalInfo.svg'>
        <RouterLink :to="{ name: 'additionalInformation' }" id = 'additionalInfoBtn'>additional info</RouterLink>
      </div>
    </footer>
  </main>

</template>
<style>
html {
  scroll-behavior: smooth;
}
:root{
  background-color: #EDDED4;
}
button{
  cursor: pointer;
}

#introText{
  position: relative;
  top:5vh;
  max-width: 30vw;
  margin-left: auto;
  margin-right: auto;
}

.text{
  font-family: Asap;
  font-size:1.2vw;

}
#logoImgAbout{
  width: 8vw; 
  height: auto;
  position: relative;
  margin-top: -160vh;
  margin-right: 3vw;
  margin-left: 3vw; 
}

#accDashboardBtn{
  position: relative;
  border: none;
  background-color: #D8C5B6;
  display: flex;
  height: 8vh;
  border-radius: 20vh; 
  align-items: center;
  padding: 0 2vw;
  font-family: 'Recoleta';
  font-weight: bold;
  font-size: 1.3vw;
  top: 18vh;
  max-width: 30vw;
  margin-left: auto;
  margin-right: auto;
}
#AboutSection{
  background-color: #F2E6DD;
  width: 100%;
  height: 800px;
  flex-shrink: 0;
  position: relative;
  top: 28vh;
  display: flex;
  align-items: center;
  justify-content: center; 
}
#aboutTitle{
  display: flex;
  height: 200vh;
  margin-left: auto;
  margin-right: auto;
  max-width: 80vw;
  position: relative;
  top: 35vh;
  transform: translate(15%, 0);
}
#forecasting{
  font-family: 'Recoleta';
  color: #303030;
  font-size: 100px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: relative;
  top: 0vh;
  height: 0;
}
#reimagined{
  font-family: asap;
  color: #303030;
  font-size: 60px;
  font-style: normal;
  font-weight: 600;
  position: relative;
  top: 9vh;
  line-height: normal;
  height: 0;
}
#welcomeToNimbus{
  color: #303030;
  font-family: Recoleta;
  font-size: 112px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  margin-top: 25vh;
  position: absolute;
  white-space: nowrap;
  left:49%;
  top: 8%;
  transform: translate(-50%, -50%);
}
.scrollTopBtn{
  z-index: 10;
  position: fixed;
  border: solid #303030 0.5;
  background-color: #FAF8ED;
  display: none;
  height: 8vh;
  position: fixed;
  right: 2em;
  border-radius: 20vh; 
  align-items: center;
  padding: 0 2vw;
  font-family: 'Recoleta';
  font-weight: bold;
  font-size: 1.3vw;
  bottom: 1.5em;
  max-width: 30vw;
  margin-left: auto;
  margin-right: auto;
  
}
#aboutContent{
  position: relative;
  margin-right: auto; 
  height: 20em;
  padding: 20px;
  box-sizing: border-box;
  width: 50%;
  left:-50%;
  top: 8%;
  transform: translate(-90%, 20%);
}
#aboutContent button{
  border: none;
  width: 324px;
  padding: 10px 30px 10px 25px;
  font-family: 'Asap';
  font-size: 30px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  align-items: flex-start;
  gap: 15px;
  border-radius: 30px;
  background: #E2D8D1;
  margin-bottom: 2em; 
  display: flex;
  align-items: flex-start;
}
#nimbusAttributes {
  width: 100%;
  height: 800px;
  flex-shrink: 0;
  position: relative;
  top: -18vh;
  align-items: center;
  justify-content: center;
}
#attTitle {
  top: 22em;
  position: relative;
  color: #303030;
  text-align: center;
  font-family: Recoleta;
  font-size: 1em;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

#underlineImg {
  position: absolute;
  bottom: -1.8em;
  left: 50%;
  transform: translateX(-50%);
  z-index: -2; 

}

#attributesContent{
  width: 100%;
  position: relative;
  top: 25em;
  flex-shrink: 1;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
  flex-wrap: wrap;
}

.containersAttributes{
  align-items: center;
}


.attributesHeader {
  color: #303030;
  font-family: Asap;
  font-size: 22px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  position: relative;
  white-space: normal;
  width: 9em;
  left: 3em;
}
#presicionForecastHeader{
  left: 5em;
}

#realTimeUpdHeader{
  width: 8em;
}

.attributesText {
  width: 18em;
  color: #303030;
  font-family: Asap;
  font-size: 1em;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: relative;
  top: -5em
}

.attributesImg{
  position: relative;
  top: -5em;
  left: -4em;
}

hr.solid {
  border-top: 0.1em solid #303030;
  position: relative;
  top: -10em;
}

#subHeadingReviews{
  color: #303030;
  text-align: center;
  font-family: Asap;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: relative;
  top: -5em;
}
#headingReviews{
  color: #303030;
  text-align: center;
  font-family: Recoleta;
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: relative;
  top: -3em;
}

.containerReview{
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -10em;
}


.cardContainer{
  margin-left:auto;
  margin-right:auto;
  position:relative;
  overflow:hidden;
  list-style:none;
  padding:0;
  z-index:1;
  padding-block: 5rem;
}

.cardContent{
  margin-inline: 1.75rem;
  border-radius: 1.25rem;
  overflow: hidden;
}

.cardArticle{
  border-radius: 20px;
background: #F2E6DD;
  flex-shrink:0;
  width:100%;
  height:100%;
  position:relative;
  transition-property:transform;
}

.cardImage{
  position: relative;
padding-top: 1rem;
margin-bottom: -0.75rem;
}
.swipper-wrapper {
  display: grid;
  grid-auto-flow: column;
  overflow: auto; 
}

.cardData{
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  text-align: start;
  position: relative;
  color: #303030;
  font-family: Asap;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

small{
  color: #858585;
  font-family: Asap;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  align-items: start;
}
#secondDivider{
  border-top: 0.1em solid #303030;
  position: relative;
  top: -4em;
}

footer{
  color: #303030;
  display: flex;
  justify-content: space-around;
  width: 20em;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: relative;
  top: -1em;
}

#legalRsrc,
#addInfo {
  font-weight: bold;
  font-size: 1.3vw;
  display: flex;
  align-items: center;
}

#lglRsrcImg,
#addInfoImg {
  height: auto;
  margin-right: 0.5em;
}

#legalResourcesBtn, #additionalInfoBtn{
  color: #303030;
text-align: center;
font-family: Recoleta;
font-size: 25px;
font-style: normal;
font-weight: 700;
line-height: normal;
}
</style>

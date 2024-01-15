<!-- <script>


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
 -->
 <script>
 import { useUserStore } from "@/stores/user";
 
 export default {
   computed: {
     store() {
       return useUserStore();
     },
     isUser() {
       return this.store.isUser;
     },
     userLocations() {
       return this.store.userLocations;
     }
   },
   methods: {
     navigateToDashboard() {
       if (this.isUser) {
        console.log(this.store.userLocations);
        //console.log(this.store.userLocations.length);
        console.log(this.userLocations);
         if (this.userLocations && this.userLocations.length > 0) {
          // this.$router.push({ name: 'advancedModeDashboard' });
           this.$router.push({ name: 'basicModeDashboard' });
         } else {
           this.$router.push({ name: 'basicModeDashboard' });
         }
       } else {
         // Handle for other cases if necessary
       }
     },
   },
 };
 </script>
<template>
  <main class="landing-page">
    <div class="first-vp">
      <div id = 'introText' class = 'text'>
        Embrace the sky's narrative with Nimbus – your dedicated daily weather guide. Our cutting-edge platform merges precision forecasting with user-friendly design, ensuring you stay ahead of the weather, whatever your day holds. Whether you're a planner, an adventurer, or just looking for a sunny spot to relax, Nimbus brings you real-time weather updates with a touch of charm. <br><br> Join us on a journey where each cloud tells a story, and every raindrop is a beat in the rhythm of your day. With Nimbus, you're not just checking the weather; you're syncing your life with the pulse of the planet. So, why wait? Sign up today and transform how you interact with the world around you.
        <button v-if="isUser" class='accDashboardBtn' @click="navigateToDashboard">
        Access the Dashboard
      </button>
      </div>
      <div class="first-vp-bg">
        <img id = 'sunLandingPage' src = '../assets/img/sunLandingPage.svg'>
      <img id = 'cloud1LandingPage' src = '../assets/img/cloud1LandingPage.svg'>
      <img id = 'cloud2LandingPage' src = '../assets/img/cloud2LandingPage.svg'> 
      </div>
    </div>
<div class="second-vp">

      <div id = 'aboutTitle'>
        <h1 id = 'forecasting'>Forecasting</h1>
        <img id = 'logoImgAbout' src = '../assets/logo.svg'>
        <h1 id = 'reimagined'>REIMAGINED</h1>
        <h1 id = 'welcomeToNimbus'>Welcome to Nimbus.</h1>
      </div>
      <div id = 'aboutContent'>
        <div class="aboutButtons">
          <button id = 'introductionBtn'>01. INTRODUCTION</button> 
        <button id = 'featuresBtn'>02. FEATURES</button>
        <button id = 'teamBtn'>03. TEAM</button>
        </div>
        <div class="aboutText">
          <div class = 'introductionText'>
            At Nimbus, our mission is to redefine the way the world interacts with weather, and our vision is to become an indispensable part of daily life. We strive to empower our users with the tools to not only navigate but also to appreciate the beauty and intricacy of the Earth's atmosphere.
          </div>
        </div>
      </div>
      <div class="about-sub-sec">
        <div class="sub-sec-one">mission and vision</div>
        <div class="sub-sec-two">benefits</div>
        <div class="sub-sec-three">impact</div>
      </div>
      <button class = 'scrollTopBtn'>Scroll</button>

  </div>
  <div class="third-vp">
    <div class = 'nimbusAttributes'>
      <div id  = 'attTitle'>
        <h2 class = 'attributesTitleText'>From Clouds to Clarify: Your Weather Ally.</h2>
        <img id = 'underlineImg' src = '../assets/img/underline.svg'>
      </div>
      <div class = 'attributesContent'>
        <div class= 'containersAttributes' id = 'realTimeUpd'>
          <div class="icon-header">          
            <img class = 'attributesImg' src = '../assets/img/Attribute1Img.svg'>
        </div>
          <div class = 'header-text'>
            <h3 class = 'attributesHeader' id = 'realTimeUpdHeader'>Real-Time Updates</h3>
            Stay informed with real-time weather updates that ensure you're never caught off guard.</div>
        </div>
        <div class= 'containersAttributes' id = 'precisionForecast'>
          <div class="icon-header">  
          <img class = 'attributesImg' src = '../assets/img/Attribute2Img.svg'>
          </div>
          <div class = 'header-text'>
          <h3 class = 'attributesHeader' id = 'presicionForecastHeader'>Precision Forecasting</h3>
         Our state-of-the-art prediction algorithms mean you’re always one step ahead of the weather.
          </div>
        </div>
        <div class= 'containersAttributes' id = 'presonalizedWeather'>
          <div class="icon-header"> 
          <img class = 'attributesImg' src = '../assets/img/Attribute3Img.svg'>
          </div>
          <div class = 'header-text'>
          <h3 class = 'attributesHeader'>Unique Experience</h3>
          <p class = 'attributesText'>Customize your alerts to receive the information that matters most to you.</p>
          </div>
        </div>
      </div>
    </div>
    <div id = 'reviews'>
      <div class="review-titles">
        <h3 id = 'subHeadingReviews'>Beyond the forecast</h3>
      <h2 id = 'headingReviews'>Nimbus awaits</h2>
      </div>

      <div class = 'containerReview'>
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
    </div>
    </div>
  </div>
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
/* .v-main {
  position: absolute;
  top: 0;
} */

.v-main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
/* .landing-page{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
} */
.first-vp{
  height: 55vh;
/*   background-color: aqua; */
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: -1;
}

.first-vp-bg{
  width: 100%;
  height: 100%;
}
body{
  animation: transitionIn 1.25s;
}
@keyframes transitionIn{
  from {
    opacity: 0;
    transform: rotateX('-10deg');
  }
  to{
    opacity: 1;
    transform: rotateX('0');
  }
}
html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}
:root{
  background-color: #EDDED4;
}
button{
  cursor: pointer;
}
/*  #intro{
 width: 100%;
  height: 532px; 
  margin:0;
   position: absolute;
  top: 50%; 
  display: flex;
flex-direction: column;
}  */
#sunLandingPage{
  width: 25em;
  height: auto;
  z-index: 2;
  position: absolute;
  left: 5em;
  
}
@keyframes drift {
  from {
    transform: translateX(300px);
  }
  to {
    transform: translateX(-1350px);
  }
}

#cloud1LandingPage{
  width: 28em;
  height: auto;
  z-index: 3;
  position: absolute;
  right: 5em;
  animation: drift 50s ease infinite;
}
#cloud2LandingPage{
  width: 35em;
  height: auto;
  z-index: 2;
  position: absolute;
  right: -7em;
  top: 25em;
  animation: drift 90s ease infinite;
}
#introText {
  max-width: 30vw;
    height: fit-content;
    z-index: 3;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-45%, 0%);
    align-items: center;
    justify-content: space-around;
}

.accDashboardBtn {
  border: 1px solid #303030;
  background-color: #D8C5B6;
  width: fit-content;
  height: fit-content;
  border-radius:30px;
  font-family: Recoleta;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
padding: 1rem;
margin-top: 2rem;
}

.second-vp{
  height: 65vh;
/*   background-color: red; */
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: -1;
}

.text{
  font-family: Asap;
  font-size:1.2vw;

}
#logoImgAbout{
  width: 8vw; 
  height: auto;
  margin: 0 2rem 0 0;
/*   position: relative;
  margin-top: -160vh;
  margin-right: 3vw;
  margin-left: 3vw;  */
}


#AboutSection{
  background-color: #F2E6DD;
  width: 100%;
  height: 800px;
  flex-shrink: 0;
  position: relative;
  top: 80vh;
  display: flex;
  align-items: center;
  justify-content: center; 
}
#aboutTitle {
  display: flex;
    height: fit-content;
    /* width: 100%; */
    /* max-width: 80vw; */
    /* position: relative; */
    /* transform: translate(15%, 0); */
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    justify-content: center;
    /* margin-left: 10%; */
    margin-top: 1rem;
    margin-bottom: 0;

}
#forecasting{
  font-family: 'Recoleta';
  color: #303030;
  font-size: 100px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0 2rem 0 0;
  
  letter-spacing: 0.2rem;
}
#reimagined{
  font-family: asap;
  color: #303030;
  font-size: 60px;
  font-style: normal;
  font-weight: 600;
  margin: 0;
  
  letter-spacing: 0.2rem;
/*   position: relative;
  top: 9vh;
  line-height: normal;
  height: 0; */
}
#welcomeToNimbus{
  color: #303030;
    font-family: Recoleta;
    font-size: 112px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: flex;
    justify-items: center;
    letter-spacing: 0.2rem;
    width: 100%;
    margin: 0;
    white-space: nowrap;
    justify-content: center;

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

    height: 40%;
    box-sizing: border-box;
    width: 100%;
    margin-left: 7%;
    margin-top: 1%;
    display: flex;

}
.aboutButtons {
  width: 50%;
  height: fit-content;
  display: flex;
  flex-direction: column;
}
#aboutContent button {
    border: 1px solid #303030;
    width: fit-content;
    padding: 1rem 1.2rem;
    font-family: 'Asap Regular' sans-serif;
    font-size: 1.2rem;
    border-radius: 30px;
    background: #E2D8D1;
    margin-bottom: 1.2rem;
    display: flex;
    justify-self: center;
}

.aboutText {
  font-family: 'Asap Regular' sans-serif;
  font-size: 1.2rem;
  margin: 0 2rem 0 0;
  width: 39%;
}

.introductionText {
  text-align: right;
}

.about-sub-sec {
  display: flex;
  width: 50%;
  justify-content: space-around;
  margin-top: 1%;
  color: #303030;
  color: #303030;
  
  text-align: center;
  font-family: Recoleta;
  font-size: 1.2rem;
  
  font-weight: 500;
}

.sub-sec-one {
text-decoration: underline;
}

.third-vp{
  height: fit-content;
/*   background-color: green; */
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 2rem;
  z-index: -1;
}
.nimbusAttributes {
   width: 100%;
 /* height: 800px;
  flex-shrink: 0; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#attTitle {
/*   top: 22em;
  position: relative; */
  color: #303030;
  height: 6rem;
  text-align: center;
  font-family: Recoleta;
  font-size: 1em;
  font-style: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
    font-weight: 700;
  line-height: normal;
}
.attributesTitleText {
  z-index: 1;
}
#underlineImg {
/*   position: absolute;
  bottom: -1.8em;
  left: 50%;*/
  transform: translateY(-90%); 


}

.attributesContent{
  width: 90%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    height: 15vh;
}

.icon-header {
  display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 1rem;
}
.containersAttributes{
  display: flex;
  align-items: center;
  flex-direction: row;
}

.containersAttributes:nth-child(2) {
  transform: translateX(-3%);
}

.containersAttributes:nth-child(2) .icon-header {
  margin-right: 0.8rem;
}
.attributesHeader {
  color: #303030;
  font-family: Asap;
  font-size: 22px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
/*   position: relative; */
  white-space: normal;

  width: fit-content;
  margin-top: 0;
  margin-bottom: 0.5rem;
}
/*   left: 3em; */




.header-text {
  width: 13em;
  color: #303030;
  font-family: Asap;
  font-size: 1em;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

}

hr.solid {
  border-top: 0.1em solid #303030;
  position: relative;
  top: 10em;
}

#reviews {
    width: 100%;
    display: flex;
    /* height: 25em; */
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;

}
.review-titles {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
#subHeadingReviews{
  color: #303030;
  text-align: center;
  font-family: Asap;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
/*   position: relative;
  top: -5em; */
}
#headingReviews{
  color: #303030;
  text-align: center;
  font-family: Recoleta;
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
/*   position: relative;
  top: -3em; */
}

.containerReview{
  display: flex;
  justify-content: center;
  align-items: center;
/*   position: relative;
  top: -17em; */
  
}


.cardContainer{
  margin-left:auto;
  margin-right:auto;
  position:relative;
  overflow:hidden;
  list-style:none;
  padding:0;
  z-index:1;
}

.cardContent{
  
  margin-inline-start: 2.5rem;
  border-radius: 1.25rem;
  overflow: hidden;
}

.cardArticle{
  border-radius: 20px;
background: #F2E6DD;
  flex-shrink:0;
  width:340px;
  height:auto;
  margin-right: 80px;
  position:relative;
  transition-property:transform;
}

.cardImage{
  position: relative;
padding-top: 1rem;
padding-left: 1rem;
margin-bottom: -0.75rem;
}
.swipper-wrapper {
  display: grid;
  grid-auto-flow: column;
  overflow: auto; 
  transform: translateX(0px); /* play with this from swipe of the reviews */
}

.cardData{
  padding: 0rem 1.5rem 1.5rem 1.5rem;
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
  top: 20em;
}

footer{
  color: #303030;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 4em;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border-top: 1px solid #303030;
 
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
margin-right: 4rem;
}

#legalRsrc {
  margin-left: 3rem;
}
</style>
<template>
  <main class="landing-page">
    <head>
      <link rel="preload" href="/images/photo.jpg" as="image" fetchpriority="high" />
      <link rel="preload" href="@/assets/img/sunLandingPage.webp" as="image">
      <link rel="preload" href="@/assets/img/cloud1LandingPage.webp" as="image">
      <link rel="preload" href="@/assets/img/cloud2LandingPage.webp" as="image">
      <link rel="preload" href="@/assets/img/graphAdvancedMode_large.webp" as="image">
    </head>
    <div class="first-vp">
      <div id="introText" class="text">
        Embrace the sky's narrative with Nimbus – your dedicated daily weather guide. Our cutting-edge platform merges precision forecasting with user-friendly design, ensuring you stay ahead of the weather, whatever your day holds. Whether you're a planner, an adventurer, or just looking for a sunny spot to relax, Nimbus brings you real-time weather updates with a touch of charm. <br><br> Join us on a journey where each cloud tells a story, and every raindrop is a beat in the rhythm of your day. With Nimbus, you're not just checking the weather; you're syncing your life with the pulse of the planet. So, why wait? Sign up today and transform how you interact with the world around you.
        <button v-if="isUser" class="accDashboardBtn" @click="navigateToDashboard">
          Access the Dashboard
        </button>
      </div>
      <div class="first-vp-bg">
        <picture>
    <source 
      srcset="@/assets/img/sunLandingPage_small.webp 960w,
              @/assets/img/sunLandingPage.webp 1024w,
              @/assets/img/sunLandingPage_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             40vw"
      type="image/webp">
    <source 
      srcset="@/assets/img/sunLandingPage_small.webp 960w,
              @/assets/img/sunLandingPage.webp 1024w,
              @/assets/img/sunLandingPage_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             80vw"
      type="image/jpeg">
    <img src="@/assets/img/sunLandingPage.webp" id="sunLandingPage" alt="sun Landing Page" width="800" height="400">
  </picture>
  <picture>
    <source 
      srcset="@/assets/img/cloud1LandingPage_small.webp 960w,
              @/assets/img/cloud1LandingPage.webp 1024w,
              @/assets/img/cloud1LandingPage_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             40vw"
      type="image/webp">
    <source 
      srcset="@/assets/img/cloud1LandingPage_small.webp 960w,
              @/assets/img/cloud1LandingPage.webp 1024w,
              @/assets/img/cloud1LandingPage_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             80vw"
      type="image/jpeg">
    <img src="@/assets/img/cloud1LandingPage.webp" id="cloud1LandingPage" alt="Cloud 1" width="800" height="400">
  </picture>
  <picture>
    <source 
      srcset="@/assets/img/cloud2LandingPage_small.webp 960w,
              @/assets/img/cloud2LandingPage.webp 1024w,
              @/assets/img/cloud2LandingPage_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             40vw"
      type="image/webp">
    <source 
      srcset="@/assets/img/cloud2LandingPage_small.webp 960w,
              @/assets/img/cloud2LandingPage.webp 1024w,
              @/assets/img/cloud2LandingPage_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             80vw"
      type="image/jpeg">
    <img src="@/assets/img/cloud2LandingPage.webp" id="cloud2LandingPage" alt="Cloud 2" width="800" height="400">
  </picture>
      </div>
    </div>
    <div class="second-vp">
      <div id="aboutTitle">
        <h1 id="forecasting">Forecasting</h1>
        <img :src="nimbusLogo" width="100px" height="auto" alt="Nimbus Logo">
        <h1 id="reimagined">REIMAGINED</h1>
        <h1 id="welcomeToNimbus">Welcome to Nimbus.</h1>
      </div>
      <div id="aboutContent">
        <div class="aboutButtons">
          <button id="introductionBtn"
            :class="{ active: selectedTab === 'introduction' }"
            @click="selectTab('introduction')">01. INTRODUCTION</button>
          <button id="featuresBtn"
            :class="{ active: selectedTab === 'features' }"
            @click="selectTab('features')">02. FEATURES</button>
          <button id="teamBtn"
            :class="{ active: selectedTab === 'team' }"
            @click="selectTab('team')">03. TEAM</button>
        </div>
        <div class="aboutText">
          <div class="introductionText">
            {{ selectedTab === 'introduction' ? subSectionContent[selectedSubSection] : tabContent[selectedTab] }}
          </div>
        </div>
      </div>
      <div class="about-sub-sec" v-if="selectedTab === 'introduction'">
        <div class="sub-sec-one"
          :class="{ 'active': isActiveSubSection('missionAndVision') }"
          @click="selectSubSection('missionAndVision')">
          mission and vision
        </div>
        <div class="sub-sec-two"
          :class="{ 'active': isActiveSubSection('benefits') }"
          @click="selectSubSection('benefits')">
          benefits
        </div>
        <div class="sub-sec-three"
          :class="{ 'active': isActiveSubSection('impact') }"
          @click="selectSubSection('impact')">
          impact
        </div>
      </div>
      <button class="scrollTopBtn">Scroll</button>
    </div>
    <div class="third-vp">
      <div class="nimbusAttributes">
        <div id="attTitle">
          <h2 class="attributesTitleText">From Clouds to Clarify: Your Weather Ally.</h2>
          <picture>
    <source 
      srcset="@/assets/img/underline_small.webp 960w,
              @/assets/img/underline.webp 1024w,
              @/assets/img/underline_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             40vw"
      type="image/webp">
    <source 
      srcset="@/assets/img/underline_small.webp 960w,
              @/assets/img/underline.webp 1024w,
              @/assets/img/underline_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             80vw"
      type="image/jpeg">
    <img src="@/assets/img/underline.webp" id="underlineImg" alt="Underline" width="500" height="auto">
  </picture>
        </div>
        <div class="attributesContent">
          <div class="containersAttributes" id="realTimeUpd">
            <div class="icon-header">   
              <picture>
    <source 
      srcset="@/assets/img/Attribute1Img_small.webp 960w,
              @/assets/img/Attribute1Img.webp 1024w,
              @/assets/img/Attribute1Img_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             40vw"
      type="image/webp">
    <source 
      srcset="@/assets/img/Attribute1Img_small.webp 960w,
              @/assets/img/Attribute1Img.webp 1024w,
              @/assets/img/Attribute1Img_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             80vw"
      type="image/jpeg">
    <img src="@/assets/img/Attribute1Img.webp" class="attributesImg" alt="Real-Time Updates" width="100" height="auto">
  </picture>  
            </div>
            <div class="header-text">
              <h3 class="attributesHeader" id="realTimeUpdHeader">Real-Time Updates</h3>
              Stay informed with real-time weather updates that ensure you're never caught off guard.
            </div>
          </div>
          <div class="containersAttributes" id="precisionForecast">
            <div class="icon-header">  

              <picture>
    <source 
      srcset="@/assets/img/Attribute2Img_small.webp 960w,
              @/assets/img/Attribute2Img.webp 1024w,
              @/assets/img/Attribute2Img_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             40vw"
      type="image/webp">
    <source 
      srcset="@/assets/img/Attribute2Img_small.webp 960w,
              @/assets/img/Attribute2Img.webp 1024w,
              @/assets/img/Attribute2Img_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             80vw"
      type="image/jpeg">
    <img src="@/assets/img/Attribute2Img.webp" class="attributesImg" alt="Precision Forecasting" width="150" height="auto">
  </picture>  
            </div>
            <div class="header-text">
              <h3 class="attributesHeader" id="presicionForecastHeader">Precision Forecasting</h3>
              Our state-of-the-art prediction algorithms mean you’re always one step ahead of the weather.
            </div>
          </div>
          <div class="containersAttributes" id="presonalizedWeather">
            <div class="icon-header"> 
              <picture>
    <source 
      srcset="@/assets/img/Attribute3Img_small.webp 960w,
              @/assets/img/Attribute3Img.webp 1024w,
              @/assets/img/Attribute3Img_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             40vw"
      type="image/webp">
    <source 
      srcset="@/assets/img/Attribute3Img_small.webp 960w,
              @/assets/img/Attribute3Img.webp 1024w,
              @/assets/img/Attribute3Img_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             80vw"
      type="image/jpeg">
    <img src="@/assets/img/Attribute3Img.webp" class="attributesImg" alt="Personalized Weather" width="100" height="auto">
  </picture>  
            </div>
            <div class="header-text">
              <h3 class="attributesHeader">Unique Experience</h3>
              <p class="attributesText">Customize your alerts to receive the information that matters most to you.</p>
            </div>
          </div>
        </div>
      </div>
      <Reviews /> 
    </div>
    <footer>
      <div id="legalRsrc">
        <picture>
    <source 
      srcset="@/assets/img/EllipseLegalResources_small.webp 960w,
              @/assets/img/EllipseLegalResources.webp 1024w,
              @/assets/img/EllipseLegalResources_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             40vw"
      type="image/webp" >
    <source 
      srcset="@/assets/img/EllipseLegalResources_small.webp 960w,
              @/assets/img/EllipseLegalResources.webp 1024w,
              @/assets/img/EllipseLegalResources_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             80vw"
      type="image/jpeg">
    <img src="@/assets/img/EllipseLegalResources.webp" id="lglRsrcImg" alt="Legal Resources" width="25px" height="auto">
  </picture>  
        <RouterLink :to="{ name: '' }" id="legalResourcesBtn">legal resources</RouterLink>
      </div>
      <div id="addInfo">
        <picture>
    <source 
      srcset="@/assets/img/EllipseAdditionalInfo_small.webp 960w,
              @/assets/img/EllipseAdditionalInfo.webp 1024w,
              @/assets/img/EllipseAdditionalInfo_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             40vw"
      type="image/webp">
    <source 
      srcset="@/assets/img/EllipseAdditionalInfo_small.webp 960w,
              @/assets/img/EllipseAdditionalInfo.webp 1024w,
              @/assets/img/EllipseAdditionalInfo_large.webp 1920w"
      sizes="(max-width: 600px) 90vw, 
             (max-width: 900px) 70vw, 
             (max-width: 1200px) 50vw, 
             80vw"
      type="image/jpeg">
    <img src="@/assets/img/EllipseAdditionalInfo.webp" id="addInfoImg" alt="Additional Info" width="25px" height="auto">
  </picture>  
        <RouterLink :to="{ name: '' }" id="additionalInfoBtn">additional info</RouterLink>
      </div>
    </footer> 
  </main>
</template>
<script>
import { useUserStore } from "@/stores/user";
import nimbusLogo from "@/assets/icons/logo.min.svg";


export default {
  components: { Reviews: () => import('@/components/Reviews.vue') },
  data() {
    return {
      nimbusLogo,
      selectedTab: 'introduction', // Default tab
      selectedSubSection: 'missionAndVision', // Default sub-section
      tabContent: {
        introduction: 'Introduction content here...',
        features: 'Features content here...',
        team: 'Team content here...'
      },
      subSectionContent: {
        missionAndVision: 'Content for Mission and Vision...',
        benefits: 'Content for Benefits...',
        impact: 'Content for Impact...'
      }
    };
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
    }
  },
  methods: {
    navigateToDashboard() {
      if (this.isUser) {
        const { userLocations } = this.userLocations;
        if (userLocations && userLocations.length > 0) {
          this.$router.push({ name: 'basicModeDashboard' });
        } else {
          this.$router.push({ name: 'basicModeDashboard' });
        }
      }
    },
    selectTab(tabName) {
      this.selectedTab = tabName;
      if (tabName === 'introduction') {
        this.selectedSubSection = 'missionAndVision'; // Reset to default when Introduction is selected
      }
    },
    selectSubSection(section) {
      this.selectedSubSection = section;
    },
    isActiveSubSection(section) {
      return this.selectedSubSection === section;
    }
  }
};
</script>

 <style scoped>
 .v-main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
 }
 .first-vp {
  height: 65vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: -1;
 }
 
 .first-vp-bg {
  width: 100%;
  height: 100%;
 }
 
 #sunLandingPage {
  width: 25em;
  height: auto;
  z-index: 2;
  position: absolute;
  left: 5em;
 }
 
 #cloud1LandingPage {
  width: 28em;
  height: auto;
  z-index: 2;
  position: absolute;
  right: 5em;
  animation: drift 50s ease infinite;
 }
 
 #cloud2LandingPage {
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
  border: 1px solid var(--main-color);
  background-color: #D8C5B6;
  width: fit-content;
  height: fit-content;
  border-radius: 30px;
  font-family: var(--font-family-primary);
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
  padding: 1rem;
 }
 
 .second-vp {
  height: 85vh;
  display: flex;
  margin-top: 3rem;
  padding-left: 5rem;
  padding-right: 5rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
 }
 
 .text {
  font-family: var(--font-family-secondary);
  font-size: 1.2vw;
 }
 
 #aboutTitle {
  display: flex;
  height: fit-content;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  align-content: flex-start;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 0;
 }
 
 #forecasting {
  font-family: var(--font-family-primary);
  color: var(--main-color);
  font-size: 100px;
  font-weight: 700;
  line-height: normal;
  margin: 0 2rem 0 0;
  letter-spacing: 0.2rem;
 }
 
 #reimagined {
  font-family: var(--font-family-secondary);
  color: var(--main-color);
  font-size: 60px;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.2rem;
 }
 
 #welcomeToNimbus {
  color: var(--main-color);
  font-family: var(--font-family-primary);
  font-size: 112px;
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
 
 .scrollTopBtn {
  z-index: 10;
  position: fixed;
  border: solid var(--main-color) 0.5;
  background-color: var(--secondary-background-color);
  display: none;
  height: 8vh;
  right: 2em;
  border-radius: 20vh; 
  align-items: center;
  padding: 0 2vw;
  font-family: var(--font-family-primary);
  font-weight: bold;
  font-size: 1.3vw;
  bottom: 1.5em;
  max-width: 30vw;
  margin-left: auto;
  margin-right: auto;
 }
 
 #aboutContent {
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
  border: 1px solid var(--main-color);
  width: fit-content;
  padding: 1rem 1.2rem;
  font-family: var(--font-family-secondary);
  font-size: 1.2rem;
  border-radius: 30px;
  background: #E2D8D1;
  margin-bottom: 1.2rem;
  display: flex;
  justify-self: center;
 }
 
 #aboutContent button:hover {
  background-color: #F0E6D2; 
  cursor: pointer;
 }
 
 .aboutText {
  font-family: var(--font-family-secondary);
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
  color: var(--main-color);
  text-align: center;
  font-family: var(--font-family-primary);
  font-size: 1.2rem;
  font-weight: 500;
 }
 
 .sub-sec-one, .sub-sec-two, .sub-sec-three {
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
 }
 
 .sub-sec-one:hover, .sub-sec-two:hover, .sub-sec-three:hover {
  text-decoration: underline;
 }
 
 .third-vp {
  height: fit-content;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 }
 
 #attTitle {
  color: var(--main-color);
  height: 6rem;
  text-align: center;
  font-family: var(--font-family-primary);
  font-size: 1em;
  font-weight: 700;
  line-height: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
 }
 
 .attributesTitleText {
  z-index: 1;
 }
 
 #underlineImg {
  transform: translateY(-90%); 
 }
 
 .attributesContent {
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
 
 .containersAttributes {
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
  color: var(--main-color);
  font-family: var(--font-family-secondary);
  font-size: 22px;
  font-weight: 800;
  line-height: normal;
  white-space: normal;
  width: fit-content;
  margin-top: 0;
  margin-bottom: 0.5rem;
 }
 
 .header-text {
  width: 13em;
  color: var(--main-color);
  font-family: var(--font-family-secondary);
  font-size: 1em;
  font-weight: 400;
  line-height: normal;
 }
 
 footer {
  color: var(--main-color);
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 4em;
  font-size: 25px;
  font-weight: 700;
  line-height: normal;
  border-top: 1px solid var(--main-color);
 }
 </style>
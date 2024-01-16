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
  mounted() {
    this.query=this.userLocation.region;
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


},
  methods: {
  }
  
};
</script>
<template>

  <main class="account-body">
    <div class="account-grid" >
    <div class="div0 gridCell">
      <HeaderDashboard />
    </div>
      <div class="div1 gridCell">
        <div class = 'personal-data'>
          <div class="personal-username" >
      <div class="username" > {{ this.getAuthenticatedUser.username }}</div>
      <div class="joined" > Joined in 16th Jan, 2024<!-- {{ this.getAuthenticatedUser.joinedDate }} --></div>
    </div>
    <div class="avatar-credentials">
    <div class="avatar-selection">

      <div class="default-avatar" :style="{ backgroundColor: defaultAvatarColor }">
        <!-- Default avatar icon goes here -->
      </div>    
  </div>
  <div class="credentials">  
    <div class="personal-email" >
    <div class="email" >
      <div class="label" >  <h1>Email</h1></div>
      <div class="email" > {{ this.getAuthenticatedUser.email }}</div>
    </div>  
    <button type="button" class="change-emai"> Change Email</button>
  </div>
    <div class="personal-username" >
      <div class="username" >{{ this.getAuthenticatedUser.username }}</div>
      <div class="joined" > Joined in 16th Jan, 2024<!-- {{ this.getAuthenticatedUser.joinedDate }} --></div>
    </div>
  </div>
</div>

    
      </div>
      </div>
      <div class="div2 gridCell">
      <div class = 'gamification-avatar'>
      </div>
    </div>
   
    <div class="div3 gridCell">
      <div class = 'alter-preferences'>
  
      </div>
    </div>
    <div class="div4 gridCell">
      <div class = 'experiences'>

      </div>
</div>
<div class="div5 gridCell">
      <div class = 'gamification'>

    </div>

 
  </div>  </div>
  </main>
</template>
<style>

.account-body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
 /*  background-color: #01542C; */
  color: #49ABFB;
}

.account-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 50px 1fr 1fr ; /* Adjust the first value for the header row height */
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  height: 850px;
  width: 1260px;
}

.account-grid .gridCell {
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

.account-grid .div0 { grid-area: 1 / 1 / 2 / 6;
border-radius: 50px 50px 10px 10px ;}

.account-grid .div1 { grid-area: 2 / 1 / 3 / 3;}

/* .account-grid .div2 { grid-area: 2 / 3 / 3 / 4;} */

.account-grid .div2 { grid-area: 2 / 3 / 3 / 4;}

.account-grid .div3 { grid-area: 2 / 4 / 3 / 6;}

.account-grid .div4 { 
/*   grid-area: 3 / 1 / 4 / 2; */
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 4;
}
.account-grid .div5 { grid-area: 3 / 3 / 4 / 6;}

.personal-data {
    width: 100%;    border-radius: 10px;
    background: #C3C3C3;
    display: flex;
    justify-content: space-between;
    flex-direction: column; 
    align-items: center;
}

.personal-email {
  width: 100%;    border-radius: 10px;
    background: #C3C3C3;
    display: flex;
    justify-content: space-between;
 /*    flex-direction: column; */
    align-items: center;
}

.email {
    width: 100%;    
    background: red;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.label h1 {
  margin: 0;
  height: 2.2rem
}
.gamification-options {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
}
.personal-username {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  background-color: #ccc;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}
.avatar-credentials {
  display: flex;
}
.credentials {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  background-color: green;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.username {
  width: fit-content;
}


.default-avatar {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background-color: #303030;
  /* margin-right: 20px; */
}

.avatar-options div {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
}

.avatar-options {
  display: flex;
}

.gamification-avatar {
    width: 100%;
    border-radius: 10px;
    background: #B7AFE2;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.alter-preferences {
  width: 100%;
  background: var(--Secondary-Color-Palette-Sky-Wash, #ADD8FB);
}
.experiences{
  width: 100%;
  border-radius: 1.25rem;
  background: rgba(156, 200, 161, 0.80);
  display: flex;
  align-items: center;
  flex-direction: column;
}
.gamification{
  width: 100%;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #F2E6DD;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
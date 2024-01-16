<script>
import ArrowButton from '@/components/ArrowButton.vue';
import HeaderDashboard from "@/components/HeaderDashboard.vue";
import { useUserStore } from "@/stores/user";


export default {
  name: 'basicMode',
  data() {
    return {
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

    <div class="avatar-credentials">
    <div class="avatar-selection">

      <div class="default-avatar" :style="{ backgroundColor: defaultAvatarColor }">
        <!-- Default avatar icon goes here -->
      </div>    
  </div>
  <div class="credentials">  
    <div class="personal-username" >
      <div class="username" > {{ this.getAuthenticatedUser.username }}</div>
      <div class="joined" > Joined in 16th Jan, 2024<!-- {{ this.getAuthenticatedUser.joinedDate }} --></div>
    </div>
    <div class="personal-email" >
    <div class="email" >
      <div class="label" >  <h1>Email</h1></div>
      <div class="email" > {{ this.getAuthenticatedUser.email }}</div>
    </div>  
    <button type="button" class="change-email"> Change Email</button>
  </div>
    <div class="personal-password" >
      <div class="password">
        <div class="label" >  <h1>Password</h1></div>
      <div class="password" >{{ this.getAuthenticatedUser.password }}</div>
      </div>
      <button type="button" class="change-password"> Change Password</button>
    </div>
  </div>
</div>

    
      </div>
      </div>
      <div class="div2 gridCell">
      <div class = 'explanations'>
      </div>
    </div>
   
    <div class="div3 gridCell">
      <div class = 'alter-preferences'>
  
      </div>
    </div>

    <div class="div3-5 gridCell">
      <div class = 'gamification-avatar'>

      </div>
</div>

    <div class="div4 gridCell">
      <div class = 'experiences'>
        <div class="exp one">
          <div class="exp-img">
            <!-- <img src="" alt=""> -->
          </div>
          <div id="exp-content">
            <h3 class="exp-title">     National Geographic Subscription</h3>
            <span class="exp-text">Unlock the world's secrets with an exclusive subscription discount.</span>
            <span class="exp-price">Price: 12 nimbus coins</span>
            <button class="exp-buy">X</button>
          </div>
     
        </div>
        <div class="exp two">Adventure Gear Vouchers</div>
        <div class="exp three">Wellness Retreat Discounts</div>
        <div class="exp four">Eco-Friendly Product Deals</div>
        <div class="exp five">Chapter-by-Chapter Savings</div>
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
  color: #303030;
}

.account-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 50px 1fr 1fr 1fr ; /* Adjust the first value for the header row height */
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

.account-grid .div0 { grid-area: 1 / 1 / 2 / 7;
border-radius: 50px 50px 10px 10px ;}

.account-grid .div1 { grid-area: 2 / 1 / 3 / 3;

  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;}

/* .account-grid .div2 { grid-area: 2 / 3 / 3 / 4;} */

.account-grid .div2 { grid-area: 2 / 3 / 3 / 4;

  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 3;
}

.account-grid .div3 { grid-area: 2 / 4 / 3 / 6;

  grid-column-start: 5;
  grid-column-end: 7;
  grid-row-start: 2;
  grid-row-end: 4;
}

.account-grid .div3-5 { 

grid-column-start: 3;
grid-column-end: 5;
grid-row-start: 3;
grid-row-end: 4;
}


.account-grid .div4 { 
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 5;
}
.account-grid .div5 { grid-area: 3 / 3 / 4 / 6;

  grid-column-start:3;
  grid-column-end: 7;
  grid-row-start: 4;
  grid-row-end: 5;
}

.personal-data {
    width: 100%;    border-radius: 10px;
    background: #C3C3C3;
    display: flex;
    justify-content: space-around;
    flex-direction: column; 
    align-items: flex-start;
}

.personal-email,
.personal-password {
  width: 100%;    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.email, .password
{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.change-email,
.change-password {
  width: 40%;    border-radius: 10px;
  background-color: #f1f1f1;
  border: 1px solid #303030;
  padding: 1rem;
  color: #c3c3c3;
  font-family: 'Asap', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
}

.change-email:hover,
.change-password:hover{
  width: 40%;    border-radius: 10px;
  background-color: #FAC54B;
  color: #858585;
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
    justify-content: space-between;
    width: 100%;
    position: relative;
    transition: all 0.3s ease;
}
/* .username {
  color: #E6612E;
} */
.avatar-credentials {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
}
.credentials {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 65%;
    height: 100%;
    position: relative;
    transition: all 0.3s ease;
    justify-content: space-between;
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

.explanations {
    width: 100%;
    border-radius: 10px;
    background: #FFF9CF;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
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
  justify-content: flex-start;
  flex-direction: column;
  padding: 1rem;
}
.exp {
  background-color: #FAC54B;
  border: 1px solid #303030;
  border-radius: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

}
.exp-img {
  background-color: red;
  width: 100%;
  height: 80%;
  border: 1px solid #303030;
  border-radius: 10px;
  margin-left: 1rem;
}
.exp-title {
  margin-bottom: 0;
  margin-top: 3%;
 };

#exp-content{ 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
background-color: green
 };
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
<script>
 import ArrowButton from '@/components/ArrowButton.vue'; 
import HeaderDashboard from "@/components/HeaderDashboard.vue";
import { useUserStore } from "@/stores/user";


export default {
  name: 'basicMode',
  data() {
    return {
      experiencePrices: {
        nationalGeographic: 12,
        adventureGear: 23,
        wellnessRetreat: 37,
        ecoFriendlyProducts: 7,
        chapterByChapter: 16
      }
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
    purchaseExperience(experienceKey) {
    const price = this.experiencePrices[experienceKey];
    if (this.getAuthenticatedUser.nimbusCoins >= price) {
      // Subtract the price from user's nimbus coins
      this.getAuthenticatedUser.nimbusCoins -= price;
      // Additional logic to record the purchase or notify the user
    } else {
      // Handle insufficient funds
      alert("Insufficient nimbus coins.");
    }
  }
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

      <div class="default-avatar" >
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
          <div class="exp-content">
            <h3 class="exp-title">     National Geographic Subscription</h3>
            <span class="exp-text">Unlock the world's secrets with an exclusive subscription discount.</span>
            <div class="exp-price">
      <p>Price: {{ experiencePrices.nationalGeographic }} nimbus coins</p>
      <ArrowButton @click="purchaseExperience('nationalGeographic')" direction="up" button-class="personalization-arrow" />
    </div>
          </div>
     
        </div>
        <div class="exp two">
          
          <div class="exp-img">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="exp-content">
            <h3 class="exp-title">    Adventure Gear Vouchers</h3>
            <span class="exp-text">Redeem for savings on the latest outdoor and adventure equipment.</span>
            <div class="exp-price"><p>Price: 23 nimbus coins</p> <ArrowButton direction="up" button-class="personalization-arrow" /></div>
            
          </div>
        </div>
        <div class="exp three">
          
          <div class="exp-img">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="exp-content">
            <h3 class="exp-title">    Wellness Retreat Discounts</h3>
            <span class="exp-text">Exchange coins for relaxation with spa and wellness offers.</span>
            <div class="exp-price"><p>Price: 37 nimbus coins</p> <ArrowButton direction="up" button-class="personalization-arrow" /></div>
            
          </div>
        </div>
        <div class="exp four">
          
          <div class="exp-img">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="exp-content">
            <h3 class="exp-title">    Eco-Friendly Product Deals</h3>
            <span class="exp-text">Get deals on products that love the earth as much as you do.</span>
            <div class="exp-price"><p>Price: 7 nimbus coins</p> <ArrowButton direction="up" button-class="personalization-arrow" /></div>
            
          </div>
        </div>
        <div class="exp five">
          
          <div class="exp-img">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="exp-content">
            <h3 class="exp-title">   Chapter-by-Chapter Savings</h3>
            <span class="exp-text">Bookstore discounts to indulge your literary appetite.</span>
            <div class="exp-price"><p>Price: 16 nimbus coins</p> <ArrowButton direction="up" button-class="personalization-arrow" /></div>
            
          </div>
        </div>
      </div>
</div>
<div class="div5 gridCell">
      <div class = 'gamification'>
        <div class="personal-email" >
    <div class="nimbus-coins" >
      <div class="coins-number" > <h3>185</h3> <!-- {{ this.getAuthenticatedUser.nimbusCoins }} --></div>
      <div class="coins-label" > nimbus coins</div>
    </div>  
  </div>
    </div>

 
  </div>  </div>
  </main>
</template>
<style>
.nimbus-coins {
  display: flex;
  align-items: center;
  justify-content: center;
}
.coins-number h3 {
  margin-right: 0.8rem;
  margin-bottom: 0;
  margin-top: 0;
}
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
  grid-template-columns: 1fr 1.3fr 1fr 1fr 1fr 1fr;
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
  overflow-y: scroll;
  background: rgba(156, 200, 161, 0.80);
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
  height: 50rem;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 1rem;
}
.exp {
    border: 1px solid #303030;
    border-radius: 10px;
    width: 90%;
    display: flex;
    align-items: center;
    padding: 1rem;
    justify-content: center;
    height: 100%;
    margin-bottom: 1rem;
}
.exp.one {
  background: #E1B6D9;
}

.exp.two {
  background: #E8AC82;
}

.exp.three {
  background: #DFE287;
}

.exp.four {
  background: #ADD8FB;
}
.exp.five {
  margin-bottom: 0;
  background: #FAC54B;
}
.exp-img {
  background-color: red;
  width: 222px;
  height: 100%;
  border: 1px solid #303030;
  border-radius: 10px;

}
.exp-title {
  margin-bottom: 0;
  margin-top: 0;
 }
 .exp-text {
  font-size: 0.8rem;
  letter-spacing: 0.01rem;
  color: #858585;
 }

.exp-content{ 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 1rem;
  height: 100%;
  width: 100%;
/* background-color: green; */
 }

 .exp-price {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
  position: relative;
  transition: all 0.3s ease;

 }

.exp-price .arrow-button.personalization-arrow {
background-color: #FAF8ED;
  width: 52px;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(30%) rotate(180deg) !important;
}

.arrow-button.personalization-arrow .arrow-icon {
  transform: rotate(90deg);
  width: 15px;
  height: 15px;
}

 .exp-price p {
  margin: 0;
  font-weight: bold;
  font-size: 0.8rem;
  transform: translateY(15%)
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
<script>
 import ArrowButton from '@/components/ArrowButton.vue'; 
import HeaderDashboard from "@/components/HeaderDashboard.vue";
import { useUserStore } from "@/stores/user";
import rightButtonIcon from "@/assets/icons/right-button.svg";
import wrongButtonIcon from "@/assets/icons/wrong-button.svg";


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
      },
      daysActive: {
      dayOne: false,
      dayTwo: false,
      dayThree: false,
      dayFour: false,
      dayFive: false,
      daySix: false,
      daySeven: false
    }, bgColors: ['#FAC54B', '#858585', '#DFE287', '#E6612E', '#E18AD1', '#ADD8FB'],
      selectedBgColor: '',
      avatars: [
        { src: 'path-to-avatar1', price: 10 },
        { src: 'path-to-avatar2', price: 15 },
        { src: 'path-to-avatar3', price: 20 },
      ],
      currentAvatarIndex: 0,
    rightButtonIcon,
    wrongButtonIcon
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
     firstThreeColors() {
    return this.bgColors.slice(0, 3);
  },
  lastThreeColors() {
    return this.bgColors.slice(3);
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
  },
  toggleDay(day) {
    this.daysActive[day] = !this.daysActive[day];
  },
  handleRightButtonClick() {
      // Implement logic for right button click
      console.log("Right button clicked");
    },
    handleWrongButtonClick() {
      // Implement logic for wrong button click
      console.log("Wrong button clicked");
    },
    selectBgColor(color) {
      this.selectedBgColor = color;
    },
    slideAvatar(direction) {
      if (direction === 'left' && this.currentAvatarIndex > 0) {
        this.currentAvatarIndex--;
      } else if (direction === 'right' && this.currentAvatarIndex < this.avatars.length - 1) {
        this.currentAvatarIndex++;
      }
    },
    claimAvatar() {
      const avatarPrice = this.avatars[this.currentAvatarIndex].price;
      const totalPrice = avatarPrice + 2/* price of selected background color */;
      if (this.getAuthenticatedUser.nimbusCoins >= totalPrice) {
        this.getAuthenticatedUser.nimbusCoins -= totalPrice;
        // Handle avatar claiming logic
      } else {
        alert("Insufficient nimbus coins.");
      }
    },

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
    <div class="gamification-avatar">
      <!-- Small Circles for Background Colors -->
      <div class="bg-colors-container">
  <!-- First Container for the first three colors -->
  <div class="bg-3">
    <div v-for="(color, index) in firstThreeColors" 
         :key="index" 
         class="small-circle" 
         :class="{'active': selectedBgColor === color}" 
         :style="{backgroundColor: color}" 
         @click="selectBgColor(color)">
    </div>
  </div>

  <!-- Second Container for the last three colors -->
  <div class="bg-4">
    <div v-for="(color, index) in lastThreeColors" 
         :key="index" 
         class="small-circle" 
         :class="{'active': selectedBgColor === color}" 
         :style="{backgroundColor: color}" 
         @click="selectBgColor(color)">
    </div>
  </div>
</div>


      <!-- Avatar Display Area -->
      <div class="avatar-display-container">
        <ArrowButton direction="down" 
                     button-class="personalization-arrow" 
                     @clickButton="slideAvatar('left')" 
                     :disabled="currentAvatarIndex === 0" />
        <div class="avatar-display" 
             :style="{backgroundColor: selectedBgColor}">
          <img :src="avatars[currentAvatarIndex].src" alt="Avatar">
        </div>
        <ArrowButton direction="up" 
                     button-class="personalization-arrow" 
                     @clickButton="slideAvatar('right')" 
                     :disabled="currentAvatarIndex === avatars.length - 1" />
      </div>

      <!-- Total Price and Claim Button -->
      <div class="claim-avatar-container">
        <div class="total-price">
          <span class="price">Price:</span> <span class="sum-price">{{ avatars[currentAvatarIndex].price + 2/* price of selected background color */ }} </span>
        </div>
        <button class="claim-avatar-button" @click="claimAvatar">CLAIM WITH COINS</button>
      </div>
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
        <div class="gamification-row-one" >
    <div class="nimbus-coins" >
      <div class="coins-number" > <h3>185</h3> <!-- {{ this.getAuthenticatedUser.nimbusCoins }} --></div>
      <div class="coins-label" > nimbus coins</div>
    </div>
    <div class="run-streak-container">
      <div class="run-streak" >
      <div class="streak-title" > <h3>Run Streak</h3> <!-- {{ this.getAuthenticatedUser.nimbusCoins }} --></div>
      <div class="streak-week" > 
        <div class="day one" :class="{ active: daysActive.dayOne }" @click="toggleDay('dayOne')">S</div>
        <div class="day two" :class="{ active: daysActive.dayTwo }" @click="toggleDay('dayTwo')">M</div>
        <div class="day three" :class="{ active: daysActive.dayThree }" @click="toggleDay('dayThree')">T</div>
        <div class="day four" :class="{ active: daysActive.dayFour }" @click="toggleDay('dayFour')">W</div>
        <div class="day five" :class="{ active: daysActive.dayFive }" @click="toggleDay('dayFive')">T</div>
        <div class="day six" :class="{ active: daysActive.daySix }" @click="toggleDay('daySix')">F</div>
        <div class="day seven" :class="{ active: daysActive.daySeven }" @click="toggleDay('daySeven')">S</div>
        </div>
    </div> 
    <div class="week-saying" >
      <div class="streak-saying" > <h3>Start your streak, grow your Nimbus companion!</h3> <!-- {{ this.getAuthenticatedUser.nimbusCoins }} --></div>
    </div>
    </div>
    
  </div>
  <div class="gamification-row-two" >
    <div class="daily-digest" >
      <div class="title" > <h3>Daily Digest</h3> </div>
      <div class="daily-digest-quest">
      <div class="digest-container" >
      <div class="digest-header" > 16º/18º </div>
      <div class="digest-quest" > 
        <p>How did we do? Was today's forecast spot on or a bit off?</p>
        </div>
    </div> 
    <div class="quest-button" >
      <button type="button" class="right-button">
        <img :src="rightButtonIcon" class="icon" />
      </button>
      <button type="button" class="wrong-button">
        <img :src="wrongButtonIcon" class="icon" />
      </button>
    </div>
    </div>
    </div>
    <div class="weather-timeline" >
      <div class="title" > <h3>Weather Timeline</h3> </div>
      <div class="weather-timeline-container">
        <div class="timeline-container" >
      <div class="digest-quest" >
        <h3>Porto</h3>
        <div class="weather-one city1"> Icon 23º</div>
        <div class="weather-two city1"> Icon 15%</div>
<!--         <p>How did we do? Was today's forecast spot on or a bit off?</p> -->
        </div>
      </div>
      <div class="timeline-container" >
        <div class="digest-quest" >
        <h3>Porto</h3>
        <div class="weather-one city1"> Icon 23º</div>
        <div class="weather-two city1"> Icon 15%</div>
<!--         <p>How did we do? Was today's forecast spot on or a bit off?</p> -->
        </div>
      </div>
      <div class="timeline-container" >
        <div class="digest-quest" >
        <h3>Porto</h3>
        <div class="weather-one city1"> Icon 23º</div>
        <div class="weather-two city1"> Icon 15%</div>
<!--         <p>How did we do? Was today's forecast spot on or a bit off?</p> -->
        </div>
    </div> 
      </div>

   
    </div>
  </div>
    </div>

 
  </div>  
</div>
  </main>
</template>
<style>
/* ... existing styles */
.bg-colors-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 25%;
}
.small-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #303030;
  box-shadow: 0 1px 0 #000;
  cursor: pointer;
  transition: box-shadow 0.1s ease, background-color 0.3s ease;
}

.small-circle.active {
  box-shadow: 0 0 0 #000;
}

.claim-avatar-container {
display: flex;
flex-direction: column;
  justify-content: center;
  align-items: center;
}
.total-price .price {
  color: #303030;
font-size: 12px;
font-family: Asap;
font-weight: bold;
text-transform: uppercase;
}

.total-price .sum-price {
  color: #303030;
font-size: 12px;
font-family: Asap;
font-weight: light;
text-transform: uppercase;
word-wrap: break-word
}
.claim-avatar-button {
  border: 1px solid #303030;
  padding: 0.5rem;
  border-radius: 20px;
  color: #303030;
font-size: 11px;
font-family: Asap;
font-weight: bold;
text-transform: uppercase;
word-wrap: break-word
}
/* Add specific colors for each small circle */
.small-circle.color1 { background-color: /* color1 */; }
.small-circle.color2 { background-color: /* color2 */; }
/* ... more colors */
.avatar-display-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-display {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #FAC54B /* dynamic based on selectedBgColor */;
  /* Style for avatar image display */
  border: 1px solid #303030;
}

/* Style for ArrowButton components */
.avatar-display-container button:nth-child(1) {
  transform: translateX(55%) !important;
}

.avatar-display-container button:nth-child(3) {
  transform: translateX(-55%) rotate(180deg) !important;
}

/* ... other styles */



.run-streak-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 60%;
}
.nimbus-coins,
.run-streak {
  display: flex;
  align-items: center;
  justify-content: center;
}

.run-streak {
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.streak-title {
  margin-left: 2rem;
}
.streak-title h3 {
  margin: 0;
}
.streak-title h3,
.daily-digest h3,
.weather-timeline .title h3 {
  color: #303030;
font-size: 1.2rem;
font-family: Asap;
font-weight: 800;
word-wrap: break-word;
text-align: right;
}

.weather-one.city1 {
 margin-bottom: 1rem
}
.streak-week {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 60%;
}
.streak-week .day {
  width: 30px;
  height: 30px;
  line-height: 30px; /* Center the text vertically */
  border: 1px solid #303030;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #303030;
font-size: 15px;
font-family: Recoleta;
font-weight: 900;
}

.streak-week .day.active {
  background-color: #FF5733; 
}

.week-saying {
    border: 1px solid #303030;
    border-radius: 20px;
    padding: 1rem;
    text-align: center;
    width: 85%;
    height: 0.5rem;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    background-image: linear-gradient( 135deg, rgba(144, 238, 144, 0.3) 25%, /* Soft green */ rgba(255, 182, 193, 0.3) 50%, /* Soft pink */ rgba(173, 216, 230, 0.3) 75% /* Soft blue */ );
    justify-content: center;
}

.streak-saying h3 {
  font-size: 1rem;
  margin: 0;
font-family: Recoleta;
font-weight: normal;
word-wrap: break-word
}

.daily-digest {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 28%;
}

.weather-timeline {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 70%;
}

.daily-digest .title h3{
  margin-top: 0;
}

.daily-digest-quest,
.weather-timeline-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.weather-timeline-container  {width: 100%;
justify-content: space-between;}
.timeline-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #DEE25A;
  border: 1px solid #303030;
  border-radius: 20px ;
  padding: 1rem;
  width: 7rem;
  height: 7rem;
}

.timeline-container:first-child {
  background-color: #CCEECE;
}
.timeline-container:nth-child(2){
background-color: #FFF9CF;
}

.timeline-container:nth-child(3){
background-color: #FFCFD1;
}
.timeline-container .digest-quest h3 {
  margin-top: 0;
}
.digest-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #DEE25A;
  border: 1px solid #303030;
  border-radius: 20px ;
  padding: 1rem;
  width: 60%;
}
.quest-button {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    height: 8rem;
}

.quest-button button {
  border: 1px solid #303030;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.quest-button .right-button {
  background-color: #90ee90; /* Soft green */
  background-size: cover;
}

.quest-button .wrong-button {
  background-color: #ffcccb; /* Soft red */
  background-size: cover;
}

.quest-button button:active {
  transform: translateY(4px);
}


.gamification-row-one,
.gamification-row-two {
  width: 100%;    border-radius: 10px;
    display: flex;
    
    justify-content: space-between;
    align-items: center;
}

.gamification-row-two {
  align-items: flex-end;
  transform: translateY(10px);
}
/* .streak-week .day-one.active { background-color: #FF5733; }
.streak-week .day-two.active { background-color: #33FF57; }

.streak-week.day-three.active { background-color: #57FF33; }

.streak-week.day-four.active { background-color: #3357FF; }

.streak-week.day-five.active { background-color: #FF3357; }

.streak-week.day-six.active { background-color: #5733FF; }

.streak-week.day-seven.active { background-color: #FF3333; } */

.coins-number h3 {
  margin-right: 0.8rem;
  margin-bottom: 0;
  margin-top: 0;
  color: #303030;
font-size: 50px;
font-family: Recoleta;
font-weight: 600;
word-wrap: break-word
}
.coins-label {
  color: #858585;
font-size: 24px;
font-family: Asap;
font-weight: 800;
text-transform: lowercase;
line-height: 20.73px;
word-wrap: break-word
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
  grid-template-rows: 50px 1fr 1fr 2fr ; /* Adjust the first value for the header row height */
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
.personal-password,
.gamification-row1 {
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
  /*   flex-wrap: wrap; */
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

.exp-price .arrow-button.personalization-arrow button{
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

  border-radius: 1.25rem;
  background: #F2E6DD;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
}
</style>
<script>
import ArrowButton from "@/components/ArrowButton.vue";
import HeaderDashboard from "@/components/HeaderDashboard.vue";
import { useUserStore } from "@/stores/user";
import rightButtonIcon from "@/assets/icons/right-button.min.svg";
import wrongButtonIcon from "@/assets/icons/wrong-button.min.svg";

import user1Png from "@/assets/img/user1.png";
import user2Png from "@/assets/img/user2.png";
import user3Png from "@/assets/img/user3.png";
import user1Webp from "@/assets/img/user1.webp";
import user2Webp from "@/assets/img/user2.webp";
import user3Webp from "@/assets/img/user3.webp";
import { reverseGeocodeOpenWeather} from "@/weatherService.js";


export default {
  name: "MyAccountView",
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
      },
      bgColors: ["#FAC54B", "#858585", "#DFE287", "#E6612E", "#E18AD1", "#ADD8FB"],
      selectedBgColor: "",
      avatars: [
        { src: user1Png, srcWebp: user1Webp, price: 10 },
        { src: user2Png, srcWebp: user2Webp, price: 15 },
        { src: user3Png, srcWebp: user3Webp, price: 20 }
      ],
      currentAvatarIndex: 0,
      rightButtonIcon,
      wrongButtonIcon,
      editableEmail: "",
      editablePassword: "",
      userPreferences: [],
      userLang: "",
      userRegion: {}
    };
  },
  components: { ArrowButton, HeaderDashboard },
  created() {
    this.editableEmail = this.store.getUser?.email || "";
    this.editablePassword = this.store.getUser?.password || "";
    this.userPreferences = this.getAuthenticatedUser.userPreferences || [];
    this.userLang = this.getAuthenticatedUser.userLang || "";
    this.userRegion = this.getAuthenticatedUser.userRegion || {};
  },
  computed: {
    store: () => useUserStore(),
    isUser() { return this.store.isUser },
    getAuthenticatedUser() { return this.store.authenticatedUser },
    userLocations() { return this.getAuthenticatedUser.userLocations },
    userLocation() { return this.getAuthenticatedUser.userRegion },
    firstThreeColors() { return this.bgColors.slice(0, 3) },
    lastThreeColors() { return this.bgColors.slice(3) }
  },
  methods: {
    purchaseExperience(experience) {
      let price = this.experiencePrices[experience];
      if (this.getAuthenticatedUser.nimbusCoins >= price) {
        this.getAuthenticatedUser.nimbusCoins -= price;
      } else {
        alert("Insufficient nimbus coins.");
      }
    },
    toggleDay(day) {
      this.daysActive[day] = !this.daysActive[day];
    },
    handleRightButtonClick() {
      console.log("Right button clicked");
    },
    handleWrongButtonClick() {
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
      this.lazyLoadAvatar(this.currentAvatarIndex);
    },
    lazyLoadAvatar(index) {
      const avatar = this.avatars[index];
      if (!avatar.srcWebpLazyLoaded) {
        avatar.srcWebpLazyLoaded = true;
      }
      if (!avatar.srcPngLazyLoaded) {
        avatar.srcPngLazyLoaded = true;
      }
    },
    claimAvatar() {
      let avatarPrice = this.avatars[this.currentAvatarIndex].price;
      let totalPrice = avatarPrice + 2; // price of selected background color
      if (this.getAuthenticatedUser.nimbusCoins >= totalPrice) {
        this.getAuthenticatedUser.nimbusCoins -= totalPrice;
      } else {
        console.log("Insufficient nimbus coins.");
      }
    },
    saveEmail() {
      this.store.updateUser(this.getAuthenticatedUser.username, { email: this.editableEmail });
    },
    savePassword() {
      this.store.updateUser(this.getAuthenticatedUser.username, { password: this.editablePassword });
    },
    togglePreference(preference) {
      let index = this.userPreferences.indexOf(preference);
      if (index === -1) {
        this.userPreferences.push(preference);
      } else {
        this.userPreferences.splice(index, 1);
      }
      this.updateUserPreferences();
    },
    updateUserPreferences() {
      this.store.updateUser(this.getAuthenticatedUser.username, { userPreferences: this.userPreferences });
    },
    selectLanguage(lang) {
      this.userLang = lang;
      this.updateUserLang();
    },
    updateUserLang() {
      this.store.updateUser(this.getAuthenticatedUser.username, { userLang: this.userLang });
    },
    fetchLocationNameFromOpenWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          try {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            console.log(`latitude: ${latitude}, longitude: ${longitude}`);
            let locationName = await reverseGeocodeOpenWeather(latitude, longitude);
            if (locationName.length > 0) {
              console.log("Location name:", locationName[0].name);
              this.userRegion = { latitude, longitude, region: locationName[0].name };
            }
            if (this.userRegion.latitude !== latitude || this.userRegion.longitude !== longitude) {
              this.updateUserRegion(latitude, longitude, locationName[0].name);
            }
          } catch (error) {
            console.error("Error fetching location name:", error);
          }
        }, (error) => {
          console.error("Error fetching location name:", error);
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
        this.errorMessage = "Geolocation is not supported by your browser.";
      }
    },
    updateUserRegion(latitude, longitude, region) {
      this.store.updateUser(this.getAuthenticatedUser.username, { userRegion: { latitude, longitude, region } });
    }
  },
  mounted() {
    this.lazyLoadAvatar(this.currentAvatarIndex);
  }
};
</script>

<template>
  <main class="account-body">
    <head>   <link rel="preload" href="/src/assets/img/nationalGeographic_small.webp" as="image" type="image/webp" />
  <link rel="preload" href="/src/assets/img/nationalGeographic_medium.webp" as="image" type="image/webp" />
</head>
    <div class="account-grid">
      <div class="div0 gridCell">
        <HeaderDashboard></HeaderDashboard>
      </div>
      <div class="div1 gridCell">
        <div class="personal-data">
          <div class="avatar-credentials">
            <div class="avatar-selection">
              <div class="default-avatar"></div>
            </div>
            <div class="credentials">
              <div class="personal-username">
                <div class="username">
                  <h1>{{ getAuthenticatedUser.username }}</h1>
                </div>
                <div class="joined">Joined in 16th Jan, 2024</div>
              </div>
              <div class="personal-email">
                <div class="email">
                  <div class="label">
                    <label for="emailInput">
                      <h1>Email</h1>
                    </label>
                  </div>
                  <input id="emailInput" class="email" v-model="editableEmail">
                </div>
                <button type="button" class="change-email" @click="saveEmail">Change Email</button>
              </div>
              <div class="personal-password">
                <div class="password">
                  <div class="label">
                    <label for="passwordInput">
                      <h1>Password</h1>
                    </label>
                  </div>
                  <input id="passwordInput" class="password" type="password" v-model="editablePassword">
                </div>
                <button type="button" class="change-password" @click="savePassword">Change Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="div2 gridCell">
        <div class="explanations"></div>
      </div>
      <div class="div3 gridCell">
        <div class="alter-wrapper">
          <div class="alter-preferences">
            <h2>Alert Preferences</h2>
            <div class="preferences">
              <button type="button" v-for="preference in ['Temperature', 'Wind', 'Moon Phases', 'Precipitation', 'Waves']" :key="preference" :class="{ selected: userPreferences.includes(preference) }" @click="togglePreference(preference)">
                {{ preference }}
              </button>
            </div>
          </div>
          <div class="alter-lgrg">
            <h2>Language and Region</h2>
            <div class="lg-rg">
              <label class="section-label">Language</label>
              <div class="lang-btn-wrapper">
                <button type="button" v-for="lang in ['pt', 'en']" :key="lang" :class="{ selected: userLang === lang }" @click="selectLanguage(lang)">
                  {{ lang.toUpperCase() }}
                </button>
              </div>
            </div>
            <div class="lg-rg">
              <label class="section-label">Region</label>
              <div class="lang-btn-wrapper">
                <input readonly @click="fetchLocationNameFromOpenWeather" :placeholder="userRegion.region || 'Select your region'" :value="userRegion.region || ''" class="region-input">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="div3-5 gridCell">
        <div class="gamification-avatar">
          <div class="bg-colors-container">
            <div class="bg-3">
              <div v-for="(color, index) in firstThreeColors" :key="index" class="small-circle" :class="{'active': selectedBgColor === color}" :style="{ backgroundColor: color }" @click="selectBgColor(color)"></div>
            </div>
            <div class="bg-4">
              <div v-for="(color, index) in lastThreeColors" :key="index" class="small-circle" :class="{'active': selectedBgColor === color}" :style="{ backgroundColor: color }" @click="selectBgColor(color)"></div>
            </div>
          </div>
          <div class="avatar-display-container">
            <ArrowButton direction="down" button-class="personalization-arrow" @clickButton="slideAvatar('left')" :disabled="currentAvatarIndex === 0" aria-label="Previous Avatar"></ArrowButton>
            <div class="avatar-display" :style="{ backgroundColor: selectedBgColor }">
              <picture>
                <source :srcset="avatars[currentAvatarIndex].srcWebp" type="image/webp">
                <source :srcset="avatars[currentAvatarIndex].srcPng" type="image/png">
                <img :src="avatars[currentAvatarIndex].srcPng" alt="Avatar" width="100" height="100">
              </picture>
            </div>
            <ArrowButton direction="up" button-class="personalization-arrow" @clickButton="slideAvatar('right')" :disabled="currentAvatarIndex === avatars.length - 1" aria-label="Next Avatar"></ArrowButton>
          </div>
          <div class="claim-avatar-container">
            <div class="total-price">
              <span class="price">Price:</span>
              <span class="sum-price">{{ avatars[currentAvatarIndex].price + 2/* price of selected background color */ }}</span>
            </div>
            <button class="claim-avatar-button" @click="claimAvatar">CLAIM WITH COINS</button>
          </div>
        </div>
      </div>
      <div class="div4 gridCell">
        <div class="experiences">
          <div class="exp one">
            <div class="exp-img">
              <picture>
                <source srcset="@/assets/img/nationalGeographic_small.webp 185w, @/assets/img/nationalGeographic_medium.webp 370w, @/assets/img/nationalGeographic_large.webp 555w" sizes="(max-width: 600px) 90vw, (max-width: 900px) 70vw, (max-width: 1200px) 50vw, 185px" type="image/webp">
                <source srcset="@/assets/img/nationalGeographic_small.jpg 185w, @/assets/img/nationalGeographic_medium.jpg 370w, @/assets/img/nationalGeographic_large.jpg 555w" sizes="(max-width: 600px) 90vw, (max-width: 900px) 70vw, (max-width: 1200px) 50vw, 185px" type="image/jpeg">
                <img src="@/assets/img/nationalGeographic_large.jpg" alt="National Geographic" width="185" height="185">
              </picture>
            </div>
            <div class="exp-content">
              <h3 class="exp-title">National Geographic Subscription</h3>
              <span class="exp-text">Unlock the world's secrets with an exclusive subscription discount.</span>
              <div class="exp-price">
                <p>Price: {{ experiencePrices.nationalGeographic }} nimbus coins</p>
                <ArrowButton @click="purchaseExperience('nationalGeographic')" direction="up" button-class="personalization-arrow" aria-label="Purchase National Geographic Subscription"></ArrowButton>
              </div>
            </div>
          </div>
          <div class="exp two">
            <div class="exp-img">
              <picture>
                <source srcset="@/assets/img/adventureGear_small.webp 185w, @/assets/img/adventureGear_medium.webp 370w, @/assets/img/adventureGear_large.webp 555w" sizes="(max-width: 600px) 90vw, (max-width: 900px) 70vw, (max-width: 1200px) 50vw, 185px" type="image/webp">
                <source srcset="@/assets/img/adventureGear_small.jpg 185w, @/assets/img/adventureGear_medium.jpg 370w, @/assets/img/adventureGear_large.jpg 555w" sizes="(max-width: 600px) 90vw, (max-width: 900px) 70vw, (max-width: 1200px) 50vw, 185px" type="image/jpeg">
                <img src="@/assets/img/adventureGear_large.jpg" alt="Adventure Gear" width="185" height="122.95">
              </picture>
            </div>
            <div class="exp-content">
              <h3 class="exp-title">Adventure Gear Vouchers</h3>
              <span class="exp-text">Redeem for savings on the latest outdoor and adventure equipment.</span>
              <div class="exp-price">
                <p>Price: 23 nimbus coins</p>
                <ArrowButton @click="purchaseExperience('adventureGear')" direction="up" button-class="personalization-arrow" aria-label="Purchase Adventure Gear Vouchers"></ArrowButton>
              </div>
            </div>
          </div>
          <div class="exp three">
            <div class="exp-img">
              <picture>
                <source srcset="@/assets/img/wellnessRetreat_small.webp 185w, @/assets/img/wellnessRetreat_medium.webp 370w, @/assets/img/wellnessRetreat_large.webp 555w" sizes="(max-width: 600px) 90vw, (max-width: 900px) 70vw, (max-width: 1200px) 50vw, 185px" type="image/webp">
                <source srcset="@/assets/img/wellnessRetreat_small.jpg 185w, @/assets/img/wellnessRetreat_medium.jpg 370w, @/assets/img/wellnessRetreat_large.jpg 555w" sizes="(max-width: 600px) 90vw, (max-width: 900px) 70vw, (max-width: 1200px) 50vw, 185px" type="image/jpeg">
                <img src="@/assets/img/wellnessRetreat_large.jpg" alt="Wellness Retreat" width="185" height="123.48">
              </picture>
            </div>
            <div class="exp-content">
              <h3 class="exp-title">Wellness Retreat Discounts</h3>
              <span class="exp-text">Exchange coins for relaxation with spa and wellness offers.</span>
              <div class="exp-price">
                <p>Price: 37 nimbus coins</p>
                <ArrowButton @click="purchaseExperience('wellnessRetreat')" direction="up" button-class="personalization-arrow" aria-label="Purchase Wellness Retreat Discounts"></ArrowButton>
              </div>
            </div>
          </div>
          <div class="exp four">
            <div class="exp-img">
              <picture>
                <source srcset="@/assets/img/ecoFriendlyProducts_small.webp 185w, @/assets/img/ecoFriendlyProducts_medium.webp 370w, @/assets/img/ecoFriendlyProducts_large.webp 555w" sizes="(max-width: 600px) 90vw, (max-width: 900px) 70vw, (max-width: 1200px) 50vw, 185px" type="image/webp">
                <source srcset="@/assets/img/ecoFriendlyProducts_small.jpg 185w, @/assets/img/ecoFriendlyProducts_medium.jpg 370w, @/assets/img/ecoFriendlyProducts_large.jpg 555w" sizes="(max-width: 600px) 90vw, (max-width: 900px) 70vw, (max-width: 1200px) 50vw, 185px" type="image/jpeg">
                <img src="@/assets/img/ecoFriendlyProducts_large.jpg" alt="Eco-Friendly Products" width="185" height="268.77" loading="lazy">
              </picture>
            </div>
            <div class="exp-content">
              <h3 class="exp-title">Eco-Friendly Product Deals</h3>
              <span class="exp-text">Get deals on products that love the earth as much as you do.</span>
              <div class="exp-price">
                <p>Price: 7 nimbus coins</p>
                <ArrowButton @click="purchaseExperience('ecoFriendlyProducts')" direction="up" button-class="personalization-arrow" aria-label="Purchase Eco-Friendly Product Deals"></ArrowButton>
              </div>
            </div>
          </div>
          <div class="exp five">
            <div class="exp-img">
              <picture>
                <source srcset="@/assets/img/chapterByChapter_small.webp 185w, @/assets/img/chapterByChapter_medium.webp 370w, @/assets/img/chapterByChapter_large.webp 555w" sizes="(max-width: 600px) 90vw, (max-width: 900px) 70vw, (max-width: 1200px) 50vw, 185px" type="image/webp">
                <source srcset="@/assets/img/chapterByChapter_small.jpg 185w, @/assets/img/chapterByChapter_medium.jpg 370w, @/assets/img/chapterByChapter_large.jpg 555w" sizes="(max-width: 600px) 90vw, (max-width: 900px) 70vw, (max-width: 1200px) 50vw, 185px" type="image/jpeg">
                <img src="@/assets/img/chapterByChapter_large.jpg" alt="Chapter-by-Chapter Savings" width="185" height="123.33" loading="lazy">
              </picture>
            </div>
            <div class="exp-content">
              <h3 class="exp-title">Chapter-by-Chapter Savings</h3>
              <span class="exp-text">Bookstore discounts to indulge your literary appetite.</span>
              <div class="exp-price">
                <p>Price: 16 nimbus coins</p>
                <ArrowButton @click="purchaseExperience('chapterByChapter')" direction="up" button-class="personalization-arrow" aria-label="Purchase Chapter-by-Chapter Savings"></ArrowButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="div5 gridCell">
        <div class="gamification">
          <div class="gamification-row-one">
            <div class="nimbus-coins">
              <div class="coins-number">
                <h3>{{ getAuthenticatedUser.nimbusCoins }}</h3>
              </div>
              <div class="coins-label">nimbus coins</div>
            </div>
            <div class="run-streak-container">
              <div class="run-streak">
                <div class="streak-title">
                  <h3>Run Streak</h3>
                </div>
                <div class="streak-week">
                  <div class="day one" :class="{ active: daysActive.dayOne }" @click="toggleDay('dayOne')">S</div>
                  <div class="day two" :class="{ active: daysActive.dayTwo }" @click="toggleDay('dayTwo')">M</div>
                  <div class="day three" :class="{ active: daysActive.dayThree }" @click="toggleDay('dayThree')">T</div>
                  <div class="day four" :class="{ active: daysActive.dayFour }" @click="toggleDay('dayFour')">W</div>
                  <div class="day five" :class="{ active: daysActive.dayFive }" @click="toggleDay('dayFive')">T</div>
                  <div class="day six" :class="{ active: daysActive.daySix }" @click="toggleDay('daySix')">F</div>
                  <div class="day seven" :class="{ active: daysActive.daySeven }" @click="toggleDay('daySeven')">S</div>
                </div>
              </div>
              <div class="week-saying">
                <div class="streak-saying">
                  <h3>Start your streak, grow your Nimbus companion!</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="gamification-row-two">
            <div class="daily-digest">
              <div class="title">
                <h3>Daily Digest</h3>
              </div>
              <div class="daily-digest-quest">
                <div class="digest-container">
                  <div class="digest-header">16º/18º</div>
                  <div class="digest-quest">
                    <p>How did we do? Was today's forecast spot on or a bit off?</p>
                  </div>
                </div>
                <div class="quest-button">
                  <button type="button" class="right-button" aria-label="Correct">
                    <img :src="rightButtonIcon" class="icon" alt="Correct Answer Icon" width="18" height="18">
                  </button>
                  <button type="button" class="wrong-button" aria-label="Wrong">
                    <img :src="wrongButtonIcon" class="icon" alt="Wrong Answer Icon" width="24" height="24">
                  </button>
                </div>
              </div>
            </div>
            <div class="weather-timeline">
              <div class="title">
                <h3>Weather Timeline</h3>
              </div>
              <div class="weather-timeline-container">
                <div class="timeline-container">
                  <div class="digest-quest">
                    <h3>Porto</h3>
                    <div class="weather-one city1">Icon 23º</div>
                    <div class="weather-two city1">Icon 15%</div>
                  </div>
                </div>
                <div class="timeline-container">
                  <div class="digest-quest">
                    <h3>Porto</h3>
                    <div class="weather-one city1">Icon 23º</div>
                    <div class="weather-two city1">Icon 15%</div>
                  </div>
                </div>
                <div class="timeline-container">
                  <div class="digest-quest">
                    <h3>Porto</h3>
                    <div class="weather-one city1">Icon 23º</div>
                    <div class="weather-two city1">Icon 15%</div>
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
.alter-preferences,
.alter-wrapper {
  flex-direction: column;
  display: flex;
}

.claim-avatar-button,
.total-price .price {
  font-weight: 700;
  text-transform: uppercase;
}

.claim-avatar-button,
.lang-btn-wrapper button,
.total-price .price,
.total-price .sum-price {
  text-transform: uppercase;
}

.alter-wrapper {
  align-items: center;
  justify-content: space-between;
}

.alter-preferences {
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 1rem;
  padding-top: 1rem;
}

.alter-lgrg {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding-right: 2rem;
  padding-bottom: 2rem;
  width: 100%;
}

.lg-rg button,
.preferences button,
.region-input {
  padding: 10px;
  background-color: #f0f0f0;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  color: #303030;
  font-family: "Asap Regular", sans-serif;
}

.lg-rg {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}

.lang-btn-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.lang-btn-wrapper button:nth-child(2) {
  margin-right: 0;
}

.alter-lgrg h2 {
  margin-right: 0.4rem;
  text-align: right;
}

.alter-preferences h2 {
  margin-left: 0.4rem;
  margin-top: 0;
}

.lg-rg button,
.preferences button {
  margin: 5px;
  border: 1px solid #303030;
  border-radius: 10px;
}

.region-input {
  margin: 5px 0 5px 5px;
  border: 1px solid #303030;
  border-radius: 10px;
  text-align: center;
}

.run-streak,
.weather-one.city1 {
  margin-bottom: 1rem;
}

.daily-digest .title h3,
.exp-title,
.timeline-container .digest-quest h3 {
  margin-top: 0;
}

.preferences button:hover {
  background-color: #e7e7e7;
}

.lang-btn-wrapper button.selected,
.preferences button.selected {
  background-color: #dfe287;
  color: #303030;
}

.bg-colors-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 25%;
}

.small-circle,
.streak-week .day {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.small-circle {
  border-radius: 50%;
  border: 1px solid #303030;
  box-shadow: 0 1px 0 #000;
  transition: box-shadow 0.1s, background-color 0.3s;
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
}

.total-price .sum-price {
  color: #303030;
  font-size: 12px;
  font-family: Asap;
  font-weight: light;
  word-wrap: break-word;
}

.claim-avatar-button {
  border: 1px solid #303030;
  padding: 0.5rem;
  border-radius: 20px;
  color: #303030;
  font-size: 11px;
  font-family: Asap;
  word-wrap: break-word;
}

.avatar-display-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-display {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fac54b;
  border: 1px solid #303030;
}

.avatar-display img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.avatar-display-container button:first-child {
  transform: translateX(55%) !important;
}

.avatar-display-container button:nth-child(3) {
  transform: translateX(-55%) rotate(180deg) !important;
}

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

.run-streak,
.weather-timeline-container {
  width: 100%;
  justify-content: space-between;
}

.streak-title {
  margin-left: 2rem;
}

.label h1,
.streak-title h3,
.username h1 {
  margin: 0;
}

.daily-digest h3,
.streak-title h3,
.weather-timeline .title h3 {
  color: #303030;
  font-size: 1.2rem;
  font-family: Asap;
  font-weight: 800;
  word-wrap: break-word;
  text-align: right;
}

.streak-week {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 60%;
}

.streak-week .day {
  line-height: 30px;
  border-radius: 50%;
  transition: background-color 0.3s;
  color: #303030;
  font-size: 15px;
  font-family: Recoleta;
  font-weight: 900;
}

.streak-week .day.active {
  background-color: #ff5733;
}

.week-saying {
  border-radius: 20px;
  padding: 1rem;
  width: 85%;
  height: 0.5rem;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  background-image: linear-gradient(135deg, rgba(144, 238, 144, 0.3) 25%, rgba(255, 182, 193, 0.3) 50%, rgba(173, 216, 230, 0.3) 75%);
  justify-content: center;
}

.digest-container,
.timeline-container {
  background-color: #dee25a;
  border: 1px solid #303030;
  padding: 1rem;
  display: flex;
}

.streak-saying h3 {
  font-size: 1rem;
  margin: 0;
  font-family: Recoleta;
  font-weight: 400;
  word-wrap: break-word;
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

.daily-digest-quest,
.weather-timeline-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.timeline-container {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  width: 7rem;
  height: 7rem;
}

.timeline-container:first-child {
  background-color: #cceece;
}

.timeline-container:nth-child(2) {
  background-color: #fff9cf;
}

.timeline-container:nth-child(3) {
  background-color: #ffcfd1;
}

.digest-container {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  width: 60%;
}

.quest-button button,
input {
  background-color: transparent;
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
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.quest-button .right-button {
  background-color: #90ee90;
  background-size: cover;
}

.quest-button .wrong-button {
  background-color: #ffcccb;
  background-size: cover;
}

.right-button .icon {
  width: 14px;
  height: 14px;
}

.icon {
  width: 24px;
  height: 24px;
}

.quest-button button:active {
  transform: translateY(4px);
}

.gamification-row-one,
.gamification-row-two,
.gamification-row1,
.personal-email,
.personal-password {
  width: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gamification-row-two {
  align-items: flex-end;
  transform: translateY(10px);
}

.coins-number h3 {
  margin-right: 0.8rem;
  margin-bottom: 0;
  margin-top: 0;
  color: #303030;
  font-size: 50px;
  font-family: Recoleta;
  font-weight: 600;
  word-wrap: break-word;
}

.coins-label {
  color: #858585;
  font-size: 24px;
  font-family: Asap;
  font-weight: 800;
  text-transform: lowercase;
  line-height: 20.73px;
  word-wrap: break-word;
}

.account-body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #303030;
}

.account-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 50px 1fr 1fr 2fr;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  height: 850px;
  width: 1260px;
}

.account-grid .gridCell {
  background-color: #f2e6dd;
  border: 1px solid #303030;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  display: flex;
  justify-content: center;
}

.account-grid .div0 {
  grid-area: 1 / 1 / 2 / 7;
  border-radius: 50px 50px 10px 10px;
}

.account-grid .div1 {
  grid-area: 2 / 1 / 3 / 3;
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
}

.account-grid .div2 {
  grid-area: 2 / 3 / 3 / 4;
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 3;
}

.account-grid .div3 {
  grid-area: 2 / 4 / 3 / 6;
  grid-column-start: 5;
  grid-column-end: 7;
  grid-row-start: 2;
  grid-row-end: 4;
  background: var(--Secondary-Color-Palette-Sky-Wash, #add8fb);
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
  background: rgba(156, 200, 161, 0.8);
}

.account-grid .div5 {
  grid-area: 3 / 3 / 4 / 6;
  grid-column-start: 3;
  grid-column-end: 7;
  grid-row-start: 4;
  grid-row-end: 5;
}

.personal-data {
  width: 100%;
  border-radius: 10px;
  background: #c3c3c3;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: flex-start;
}

.email,
.password {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

input {
  font-family: "Asap Regular", sans-serif;
  font-size: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: #303030;
  border: none;
  border-radius: 10px;
  outline: 0;
}

.change-email,
.change-password {
  width: 40%;
  border-radius: 10px;
  height: 2rem;
  background-color: #f1f1f1;
  border: 1px solid #303030;
  color: #c3c3c3;
  font-family: Asap, sans-serif;
  font-weight: 700;
  font-size: 1rem;
  transition: 0.3s ease-in-out;
}

.credentials,
.exp-price,
.personal-username {
  position: relative;
  transition: 0.3s;
}

.change-email:hover,
.change-password:hover {
  width: 40%;
  border-radius: 10px;
  background-color: #fac54b;
  color: #858585;
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
}

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
  justify-content: space-between;
}

.username {
  width: fit-content;
}

.email .label,
.password .label,
.username {
  font-size: 0.7rem;
}

.email input {
  text-decoration: underline;
}

.default-avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: #303030;
}

.explanations,
.gamification-avatar {
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  width: 100%;
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
  background: #fff9cf;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.gamification-avatar {
  background: #b7afe2;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.exp,
.experiences {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.alter-preferences {
  width: 100%;
  background: var(--Secondary-Color-Palette-Sky-Wash, #add8fb);
}

.experiences {
  width: 100%;
  height: 50rem;
  border-radius: 1.25rem;
  justify-content: flex-start;
  flex-direction: column;
}

.exp {
  border: 1px solid #303030;
  border-radius: 10px;
  width: 90%;
  justify-content: center;
  height: 100%;
  margin-bottom: 1rem;
}

.exp-title,
.exp.five {
  margin-bottom: 0;
}

.exp.one {
  background: #e1b6d9;
}

.exp.two {
  background: #e8ac82;
}

.exp.three {
  background: #dfe287;
}

.exp.four {
  background: #add8fb;
}

.exp.five {
  background: #fac54b;
}

.exp-img {
  background-color: transparent;
  width: 222px;
  height: 120px;
  overflow: hidden;
  border: 1px solid #303030;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.exp-img img {
  height: auto;
  display: block;
}

.exp-content,
.exp-price,
.gamification {
  width: 100%;
  display: flex;
}

.exp-text {
  font-size: 0.8rem;
  letter-spacing: 0.01rem;
  color: #858585;
}

.exp-content {
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 1rem;
  height: 100%;
}

.exp-price {
  align-items: baseline;
  justify-content: space-between;
}

.exp-price .arrow-button.personalization-arrow button {
  background-color: #faf8ed;
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
  font-weight: 700;
  font-size: 0.8rem;
  transform: translateY(15%);
}

.gamification {
  border-radius: 1.25rem;
  background: #f2e6dd;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
}

</style>

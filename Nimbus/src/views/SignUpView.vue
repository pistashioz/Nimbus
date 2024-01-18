<template>
  <!-- Main container for the forms -->
  <div class="form-wrapper" ref="formWrapper">
    <!-- signup form wrapper -->
    <!-- Conditionally render the first or second form -->
    <main class="sign-up form" ref="signUpForm">
      <!-- Form element with submit event handler -->
      <form @submit.prevent="signUp">
        <!-- Title for the signup form -->
        <h1>Create Account</h1>
        <InputField
        id="email"
        placeholder="email"
        v-model="email"
        required
        />
        <InputField
        id="username"
        placeholder="username"
        v-model="username"
        required
        />
        <InputField
        id="passwordInput"
        type="password"
        placeholder="password"
        v-model="password"
        required
        />
        <InputField
        id="passwordInput"
        type="password"
        placeholder="confirm password"
        v-model="passwordConfirmation"
        required
        />
        <div class="terms-checkbox">
          <input type="checkbox" id="terms" v-model="agreedToTerms" >
          <label for="terms">
            I agree to Nimbu's <a href="/terms" target="_blank">Terms & Conditions</a> and acknowledge the <a href="/privacy" target="_blank">Privacy Policy</a>.
          </label>
        </div>
        <div class="sign-up-wrapper">
          <!-- signup submission button -->
          <CustomButton
          buttonType="submit"
          buttonText="Sign Up"
          />
          <!-- Social signup options -->
          <div class="social-sign-up-wrapper">
            <!-- Google signup button -->
            <CustomButton
            buttonClass="google social-sign-up"
            iconSrc="google"
            />
            <!-- Apple sign button -->
            <CustomButton
            buttonClass="apple social-sign-up"
            iconSrc="apple"
            />
          </div>
        </div>
        <!-- Container for error messages -->
        <ErrorMessage :message="errorMessage" @clear-error="handleClearError" />
        <!-- Link to log-in page -->
        <ActionLink preText="Already have an account?" text="Log In" @handleClick="goToLogIn" />
      </form>
    </main>
    
  </div>
  <div class="personalization form-wrapper" ref="persFormWrapper">
    <!-- personalization form wrapper -->
    <main class="personalization form" ref="personalizationForm">
      
      
      <!-- Form element with submit event handler -->
      <form @submit.prevent="persSave">
        <!-- Title for the signup form -->
        <h1>Make Nimbus truly yours!</h1>
        <div class="personalization-form-wrapper">
          <div class="personalization-area">
            <div 
            class="personalization-container" 
            v-for="area in 4" 
            :key="area"
            :class="{ active: activeArea === area }"
          >
            <div v-if="area === 1">
              <h2>Weather Watchlist</h2>
              <InputField
              id="search"
              type="search"
              placeholder="search location"
              v-model="searchQuery"
              style="margin: 1rem;"
              @focus="handleSearchBoxFocus"
              @add="handleAdd"
              />
              <!-- Display search results -->
              <div v-if="searchResults.length" class="search-results-container">
                <div 
                v-for="result in searchResults" 
                :key="result.name" 
                class="result-item" 
                @click="selectPrediction(result)"
                >
                <span class="main-text">{{ result.main_text }}</span>
                <span class="hyphen" v-if="result.secondary_text">-</span>
                <span class="secondary-text">{{ result.secondary_text }}</span>
              </div>
            </div>
            <AnimatedCircles 
            :selectedLocations="userLocations"
            @remove-location="removeUserLocation"
            />
          </div>
          <div v-else-if="area === 2">
  <h2>Alert Preferences</h2>
  <div class="preferences">
    <button 
    type="button"
      v-for="preference in ['Temperature', 'Wind', 'Moon Phases', 'Precipitation', 'Waves']" 
      :key="preference" 
      :class="{ selected: userPreferences.includes(preference) }" 
      @click="togglePreference(preference)"
    >
      {{ preference }}
    </button>
  </div>
</div>

<div v-else-if="area === 3">
  <h2>Allow Gamification</h2>
  <div class="area-3-organizer">
    <div class="avatar-selection">
    <div class="default-avatar" :style="{ backgroundColor: defaultAvatarColor }">
      <!-- Default avatar icon goes here -->
    </div>

  </div>
  <div class="gamification-options">
    <div class="gamification-toggle" @click="toggleGamification" :class="{ 'on' : allowGamification }">
  <div class="toggle-circle" :class="{ 'toggle-on': allowGamification }"></div>
</div>
<div class="avatar-options">
      <div 
        v-for="(avatar, index) in avatars" 
        :key="index" 
        :class="{ 'selected-avatar': selectedAvatar === avatar }" 
        @click="selectAvatar(avatar)"
      >
        <!-- Avatar icon goes here -->
        <!-- Temporary color change for demonstration -->
        <div :style="{ backgroundColor: avatar }"></div>
      </div>
    </div>

  </div>

</div>
</div>

  
<div v-else-if="area === 4">
  <h2>Language and Region</h2>
  
  <div class="language-selection">
    <label class="section-label">Language</label>
    <div class="languages">
      <img
            :src="langIcon" 
            @click="togglePasswordConfirmationVisibility" 
            class="lang-icon" 
          />
    <button type="button" @click="selectLanguage('pt')" :class="{ selected: userLang === 'pt' } " >PT
     <!--  <img src="/path/to/portugal-flag.svg" alt="Portugal Flag"> -->
    </button>
    <button type="button" @click="selectLanguage('en')" :class="{ selected: userLang === 'en' }">ENG
      <!-- <img src="/path/to/usa-flag.svg" alt="USA Flag"> -->
    </button>
  </div>
  </div>

  <div class="region-detection">
    <div class="region-label"><label class="section-label">Region </label>
      <button type="button" @click="  fetchLocationNameFromOpenWeather">Detect Region</button></div>
    <div class="region">
    <img
            :src="regionIcon" 
            @click="togglePasswordConfirmationVisibility" 
            class="lang-icon" 
          />
          <div class="userRegion">
<!--       <p>Latitude: {{ userRegion.latitude }}</p>
      <p>Longitude: {{ userRegion.longitude }}</p> -->
      <input 
      type="text" 
      disabled 
      :placeholder="userRegion ? userRegion.region : 'Select your region'" 
      :value="userRegion ? userRegion.region : ''"
      class="region-input"
    />
    </div>
    

  </div>
  </div>
</div>

          </div>
        </div>
        
        <div class="button-wrapper">
          <div class="arrow-button-wrapper">
            <ArrowButton direction="up" button-class="personalization-arrow" @clickButton="handleUpClick" />
            <ArrowButton direction="down" button-class="personalization-arrow" @clickButton="handleDownClick" />
          </div>
          <div class="s-button-wrapper">
            <CustomButton
            buttonType="submit"
            buttonText="Save"
            />
            <CustomButton
            buttonType="button"
            buttonText="Skip"
            @click="skipPersonalization"
            />
          </div>
        </div>
      </div>
      
      <ErrorMessage :message="errorMessage" @clear-error="handleClearError" /> 
      <!-- Link to log-in page -->
      <ActionLink preText="Prefer to dive in now? " text="Skip this form" @handleClick="skipPersonalization" />
    </form>
    
  </main>
</div>
</template>

<script>
import InputField from '@/components/InputField.vue';
import CustomButton from '@/components/CustomButton.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import ActionLink from '@/components/ActionLink.vue';
import ArrowButton from '@/components/ArrowButton.vue';
import AnimatedCircles from '@/components/AnimatedCircles.vue';
import { validateEmail, validatePassword, validateUsername, validatePasswordMatch  } from "@/utils.js";
import {fetchPlaceDetails , reverseGeocodeOpenWeather, reverseGeocode, getAutocompletePredictions , loadGoogleMapsAPI, ProvidesLocation } from "@/weatherService.js";

import langIcon from '@/assets/icons/world.svg';
import regionIcon from '@/assets/icons/region.svg';
// Import user store from Pinia
import { useUserStore } from '@/stores/user';

export default {
  data() {
    return {
      email: "", // Bound to email input
      username: "", // Bound to username input
      password: "", // Bound to password input
      passwordConfirmation: "", // Bound to password confirmation input
      errorMessage: "", // Used to display signUp error messages
      agreedToTerms: false, // Tracks whether the terms checkbox is checked

      activeArea: 1, // Start with the first area
      userPreferences: [], // Tracks which preferences the user has selected

      allowGamification: false,
    selectedAvatar: null,
    avatars: ['#FF6347', '#4682B4', '#32CD32'], // Placeholder colors for avatars. Lets hope i dont forget to change this
    defaultAvatarColor: '#ddd', // Default color for the avatar
    userLang: null,
      userRegion: null,

      searchQuery: '', // Bound to search input
      searchResults: [], // Used to display search results
      addedResults: [], 
      userLocations: [], // Used to hold chosen locations
      preferences: null, // Tracks the preferences from the form
      timeoutID: null, // Used to throttle the api call not to overwhelm it
      target: null, // Used to track the target of the click event
      isSelectingPrediction: false, // Flag to indicate prediction selection
      langIcon,
      regionIcon,

      triedToleave: null, // Used to track whether the user has tried to leave the page
    };
  },
  components: {
    InputField,
    CustomButton,
    ErrorMessage,
    ActionLink,
    ArrowButton,
    AnimatedCircles,
  },
  computed: {
    // Access to Pinia user store
    store() {
      return useUserStore();
    }
  },
  watch: {
    email() {
      this.handleClearError(); // Clear error message when email changes
    },
    username() {
      this.handleClearError(); // Clear error message when username changes
    },
    passwordInput() {
      this.handleClearError(); // Clear error message when password changes
    },
    agreedToTerms() {
      this.handleClearError(); // Clear error message when terms checkbox changes
    },
    searchQuery() {
    if (!this.isSelectingPrediction) {
      // Handle search input and clear results if searchQuery is empty
      this.handleSearchInput();

    } else {
      this.isSelectingPrediction = false; // Reset the flag
    }
  },
  },
  mounted () {
    loadGoogleMapsAPI();
  },
  // Methods of the component
  methods: {
    handleSearchBoxFocus() {
      loadGoogleMapsAPI();
    },
    handleSearchInput() {
    clearTimeout(this.timeoutID);
    // Clear searchResults immediately if searchQuery is empty
    if (this.searchQuery === '') {
      this.searchResults = [];
      this.addedResults= [];
      console.log(this.addedResults);
    } else {
      this.timeoutID = setTimeout(() => {
        this.fetchPredictions();
      }, 300);
    }
  },
  async fetchPredictions() {
    try {
      // Only fetch predictions if searchQuery is not empty
      if (this.searchQuery.length >= 1) {
        const predictions = await getAutocompletePredictions(this.searchQuery);
        this.searchResults = predictions.map(p => ({
          description: p.description,
          main_text: p.structured_formatting.main_text,
          secondary_text: p.structured_formatting.secondary_text,
          place_id: p.place_id
        }));
        console.log(predictions);
        console.log(this.searchResults);
      } else {
        // If searchQuery is empty, clear searchResults
        this.searchResults = [];
      }
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  },
  async selectPrediction(prediction) {
  this.isSelectingPrediction = true; // Set the flag

  try {
    const placeDetails = await fetchPlaceDetails(prediction.place_id);
    if (placeDetails) {
      // Get latitude and longitude from the place details
      const locationLatLong = {
        lat: placeDetails.geometry.location.lat(),
        lng: placeDetails.geometry.location.lng(),
      };

      // Construct the object to be added to addedResults
      const resultToAdd = {
        main_text: prediction.main_text,
        description: prediction.description,
        ...locationLatLong // Spread operator to include lat and lng
      };

      this.searchQuery = prediction.description;

/*       this.searchQuery = prediction.secondary_text 
    ? `${prediction.main_text} ${prediction.secondary_text}` 
    : prediction.main_text;
     */
      // Update addedResults with the new object
      this.addedResults = [resultToAdd];

      // Clear the search results
      this.searchResults = [];

    }
  } catch (error) {
    console.error('Error fetching place details:', error);
  }
},
  handleAdd() {

        // Check if no location has been selected
        if (this.addedResults.length === 0) {
      // Set an error message to inform the user to select a location first
      this.searchResults = []; // Clear the predictions
      this.errorMessage = "Please select a location before adding.";
  
      return; // Exit the function to prevent adding empty locations
    }

    // Check if the maximum number of locations has been reached
    if (this.userLocations.length >= 4) {
      // Set the error message to inform the user
      this.errorMessage = "Maximum of 4 locations can be added.";
      this.searchQuery = '';
      return; // Exit the function to prevent adding more locations
    }

    // Check if there's a selected location in addedResults
    if (this.addedResults.length > 0) {
      const selectedLocation = this.addedResults[0];
      // Add the selected location to userLocations
      this.userLocations.push(selectedLocation);
      console.log(this.userLocations);
      // Clear addedResults as the selection is confirmed
      this.addedResults = [];
    }
    // Clear the searchQuery and any existing error message
    this.searchQuery = '';
  },
removeUserLocation(index) {
    this.userLocations.splice(index, 1);
  },
// Function to handle SignUp
async signUp() {
  try {
    // Perform validations first
    validateEmail(this.email);
    validateUsername(this.username);
    validatePasswordMatch(this.password, this.passwordConfirmation);
    if (!this.agreedToTerms) {
      throw new Error('You must agree to the Terms & Conditions and Privacy Policy.');
    }

    // Attempting to sign up with provided credentials
    await this.store.register(this.email, this.username, this.password);

    // If successful, display the personalization form
    this.$refs.signUpForm.classList.add('concluded');
    this.$refs.formWrapper.style.zIndex = '-1';
    setTimeout(() => {
      this.$refs.persFormWrapper.style.zIndex = '1';
      this.$refs.personalizationForm.classList.add('active');
    }, 100);

  } catch (error) {
    console.error(error);
    this.errorMessage = error.message;
  }
},
    handleClearError() {
      this.errorMessage = "";
    },
    goToLogIn(event) {
      if (event.target.classList.contains('main-text')) {
        this.$router.push({ name: 'login' });
      }
    },
    handleUpClick() {
      if (this.activeArea > 1) {
        this.activeArea--;
      }
    },
    handleDownClick() {
      console.log(this.activeArea);
      if (this.activeArea < 4) {
        this.activeArea++;
        console.log(this.activeArea);
      }
    },
    togglePreference(preference) {
    const index = this.userPreferences.indexOf(preference);
    if (index === -1) {
      // Add the preference if not already selected
      this.userPreferences.push(preference);
    } else {
      // Remove the preference if already selected
      this.userPreferences.splice(index, 1);
    }
  },
  toggleGamification() {
    this.allowGamification = !this.allowGamification;
  },
  selectAvatar(avatar) {
  this.selectedAvatar = avatar;
  // Using colors for now, this will change the background color of the default avatar
  // Need to repalce this with changing the SVG icon path when available
  this.defaultAvatarColor = avatar;
},    
selectLanguage(lang) {
  if (this.userLang === lang) {
    this.userLang = null;
  } else {
      this.userLang = lang;
  }
    },
    // Method to do reverse geocoding with google maps API
/*     detectRegion() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const address = await reverseGeocode(position.coords.latitude, position.coords.longitude);
            this.region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              address: address, // human-readable address
            };
            console.log(this.region);
          } catch (error) {
            console.error("Error in reverse geocoding:", error);
            this.errorMessage = "Error obtaining address.";
          }
        },
        (error) => {
          console.error("Error detecting region:", error);
          this.errorMessage = "Error detecting region.";
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      this.errorMessage = "Geolocation is not supported by your browser.";
    }
  }, */
  fetchLocationNameFromOpenWeather() {
    

    // Check if the browser supports geolocation
    if (navigator.geolocation) {
      // Use the Geolocation API to get the current position
      navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Extract latitude and longitude from the position object
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`latitude: ${latitude}, longitude: ${longitude}`);
          
          // Call reverseGeocodeOpenWeather with the obtained coordinates
          const result = await reverseGeocodeOpenWeather(latitude, longitude);
          
          // Check if the result has data
          if (result.length > 0) {
            // Log the first location name from the result
            console.log('Location name:', result[0].name);
            // Update the region data property with relevant information
            this.userRegion = {
              latitude: latitude,
              longitude: longitude,
              region: result[0].name, // Human-readable address
            };
            console.log(this.triedToleave);
           if (this.triedToleave) {
              
              // Save preferences
              this.persSave();
              console.log('Preferences saved.');
             
              // Add a delay before redirecting to the intended route
   
                this.$router.push({ name: this.triedToleave.name });
                this.triedToLeave = null; // Reset the variable
            
            } 
            
          //  console.log(`The user region is: ${this.userRegion.region} with latitude: ${this.userRegion.latitude}, longitude: ${this.userRegion.longitude}`);
          }


          
        } catch (error) {
          // Handle any errors during the API call or processing
          console.error('Error fetching location name:', error);
        }
      },
      (error) => {
        // Handle errors related to the Geolocation API
        console.error('Error fetching location name:', error);
      }
      );
    } else {
      // Browser does not support Geolocation
      console.error("Geolocation is not supported by this browser.");
      this.errorMessage = "Geolocation is not supported by your browser."; 
    }
  },
async persSave() {
      if (!this.username) {
          this.errorMessage = 'No username provided.';
        return;
      } 
      try {
        // Construct the preferences object
        this.preferences = {
            userPreferences: this.userPreferences,
            allowGamification: this.allowGamification,
            selectedAvatar: this.selectedAvatar,
            userLang: this.userLang,
            userRegion: this.userRegion,
            userLocations: this.userLocations,
        };

        // Save the preferences to the database
        await this.store.savePreferences(this.username, this.preferences);

           // Redirect to the landing page
           this.$router.push({ name: "landingPage" });
      } catch (error) {
        console.log(error);
        this.errorMessage = error.message;
      }
    },
    skipPersonalization() {
    // Redirect to the landing page
    // Check if neither userLocations nor userRegion are set
    if (this.userLocations.length === 0 && !this.userRegion) {
      console.log(this.userLocations);
      console.log(this.userRegion);
      this.errorMessage = "Please select at least one location either from the Weather Watchlist or from Language and Region section";
      return;
    }

    this.$router.push({ name: "landingPage" });
},

  },
  //CHECK THIS IF TILL HAVE TIME
/*   beforeRouteLeave(to, from, next) {
    if (this.store.registeredUser) {
    // Check if the user has selected a region
    if (!this.userRegion || this.userRegion.region === '') {
      // Prompt the user
      this.errorMessage = 'Please let us know at least your region for data presentation on the Dashboard.';
      // Make the 4th area active
      this.activeArea = 4;

      this.triedToleave = to;
      console.log(this.triedToleave);
next(false);
    } else {  
      // If the region is selected, save the region and proceed with the navigation
      this.persSave()
      next();
    }} else {
      next();
    }
  }, */
};
</script>


<style scoped>

.language-selection,
.region-detection {
  display: flex;
  flex-direction: column;
}

/* .language-buttons button:hover, .region-detection button:hover {
  background-color: #d0d0d0;
}
 */
 .personalization-area .active {
  border: none;
}
 .languages,
 .region {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
 /*  margin-bottom: 10px; */
 }
 .languages img,
 .region img {
  width: 30px;
  height: 30px;
  margin-right: 5px;
 }
.languages button,
.region-label button{
  margin: 5px;
  padding: 10px;
  background-color: #f0f0f0; 
  border: 1px solid #303030;
  border-radius: 10px;
  cursor: pointer;
  color: #303030;

font-family: 'Asap Regular', sans-serif;
font-size: 1rem;
  transition: background-color 0.3s;
}

.region-input {
/*   flex-grow: 1; */
  width: fit-content;
  padding: 10px;
  border: 1px solid #303030;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: #303030;
  font-family: 'Asap Regular', sans-serif;
font-size: 1rem;
}

.region-input::placeholder {
  color: #858585;
}

.region-input:disabled {
  background-color: #EDDED4;
}
.languages button:hover,
.region-label button:hover {
  background-color: #e7e7e7; 
}

.languages button.selected {
  background-color: #DFE287;; 
  color: #303030;
}

.section-label {
  font-weight: bold;
  margin-bottom: 10px;
}

/* .section-label:nth-child(1) {
  margin-top: 20px;
} */

.area-3-organizer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 7rem;
}
.gamification-options {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
}
.gamification-toggle {
  width: 50px;
  height: 25px;
  background-color: #ccc;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.toggle-circle {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2.5px;
  left: 2.5px;
  transition: all 0.3s ease;
}

.toggle-on {
  transform: translateX(25px);
}

.gamification-toggle.on {
  background-color: #b4b4b4;
}


.default-avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: #303030;
  margin-right: 20px;
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
/* .selected-avatar {
  border: 2px solid #4CAF50;
} */


.preferences button {
  margin: 5px;
  padding: 10px;
  background-color: #f0f0f0; 
  border: 1px solid #303030;
  border-radius: 10px;
  cursor: pointer;
  color: #303030;

font-family: 'Asap Regular', sans-serif;
font-size: 1rem;
  transition: background-color 0.3s;
}

.preferences button:hover {
  background-color: #e7e7e7; 
}

.preferences button.selected {
  background-color: #DFE287;; 
  color: #303030;
}


.search-results-container {
  transform: translateY(-20px);
    display: flex;
    position: absolute;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    border: 1px solid #303030;
    margin: 1rem;
    background-color: #FAC54B;
     z-index: 1; 
    max-width: 345px;
    max-height: 220px;
    overflow-y: hidden;

}

.result-item {
  padding: 0.8rem;
  position: relative;
  text-align: left;
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-height: 1rem;
  margin: 0.5rem 0.5rem;
  cursor: pointer; 
  border-radius: 20px; 
  border: 1px solid #303030; 
  background-color: #f8f8f8; 

}


.result-item:hover {
  background-color: #F2E6DD; /* Change on hover */
}

.main-text {
  font-family: 'Asap', sans-serif;
  font-weight: bold;
  color: #303030; /* Adjust text color as needed */
}

.hyphen {
  margin: 0.2rem 0.2rem;
}

.secondary-text {
  font-family: 'Asap', sans-serif;
  color: #666; /* Adjust text color as needed */
}


.form-wrapper {
    display: flex;
  overflow: hidden;
    flex-direction: column;
    align-items: center;
}
.personalization-area {
  width: 76%;
  min-height: 300px;
  border-radius: 10px;
  border: 1px solid #303030;
  background: #F2E6DD;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}


.personalization-container {
  display: none; /* Initially hide all areas */
}

.personalization-container.active {
  display: block; /* Show active area */
}

.personalization-form-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  transition: transform 0.5s ease-in-out;
}


.sign-up.form {
  width: 360px;
  transform: translateY(0%);
  opacity: 1;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-out;
}

.sign-up.form.concluded {
  transform: translateY(100%);
  opacity: 0;
}

.personalization.form-wrapper {
  z-index: -1;
}
.personalization.form {
  width: 500px;
  transform: translateY(101%);
  opacity: 0.5;
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in;
}

.personalization.form.active {
  transform: translateY(0%);
  opacity: 1;

}

.terms-checkbox {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 1rem;
}

.terms-checkbox input[type="checkbox"] {
  margin-right: 0.6rem;
  width: 5%;
}

.terms-checkbox label {
  font-size: 0.9rem;
  color: #303030;
  text-align: left;
  word-break: keep-all; /* Prevents breaking words at character level */
  hyphens: auto; /* Allows breaking words at appropriate hyphenation points */
}

.terms-checkbox a {
  color: #0000EE; /* Standard link color */
  font-size: 0.9rem;
  text-decoration: none;
}

.terms-checkbox a:hover {
  text-decoration: underline;
}

.sign-up-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.button-wrapper {
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: fit-content;
}
.arrow-button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.personalization-arrow:first-child {
  margin-bottom: 1rem;
}
.personalization-arrow {
  fill: #49ABFB;
}

.s-button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.s-button-wrapper button:first-child {
 color: #303030;
background: #F2E6DD;
width: 5rem;
  border-radius: 10px;
}

.s-button-wrapper button:nth-child(2) {
 color: #F2E6DD;
 background: #B21C29;
 margin-bottom: 0;
   width: 5rem;
  border-radius: 10px;
}


.social-sign-up-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 28%;
}

</style>   


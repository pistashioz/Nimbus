<template>
  <!-- Main container for the forms -->
  <div class="form-wrapper" ref="formWrapper">
    <!-- signup form wrapper -->
    <!-- Conditionally render the first or second form -->
    <main class="sign-up form concluded" ref="signUpForm">
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
    <!-- personalization form wrapper -->
    <main class="personalization form active" ref="personalizationForm">
      
      
      <!-- Form element with submit event handler -->
      <form @submit.prevent="signUp">
        <!-- Title for the signup form -->
        <h1>Make Nimbus truly yours!</h1>
        <div class="personalization-form-wrapper">
        <div class="personalization-area">
        <InputField
        id="search"
        type="search"
        placeholder="search location"
        v-model="email"
        style="margin: 1rem;"
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
        placeholder="confirm password"
        v-model="passwordConfirmation"
        required
        />

        <InputField
        id="passwordInput"
        type="password"
        placeholder="confirm password"
        v-model="passwordConfirmation"
        required
        />
      </div>

        <div class="button-wrapper">
          <div class="arrow-button-wrapper">
          <ArrowButton direction="up" button-class="personalization-arrow" @click="handleUpClick" />
<ArrowButton direction="down" button-class="personalization-arrow" @click="handleDownClick" />
          </div>
          <div class="s-button-wrapper">
          <!-- signup submission button -->
          <CustomButton
          buttonType="submit"
          buttonText="Save"
          />
          <CustomButton
          buttonType="submit"
          buttonText="Skip"
          />
          </div>
        </div>
      </div>
        <!-- Container for error messages
        <ErrorMessage :message="errorMessage" @clear-error="handleClearError" /> -->
        <!-- Link to log-in page -->
        <ActionLink preText="Prefer to dive in now? " text="Skip this form" @handleClick="goToLogIn" />
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
import { validateEmail, validatePassword, validateUsername, validatePasswordMatch  } from "@/utils.js";
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
      isPersonalizationFormVisible: false, // New property to toggle between forms
    };
  },
  components: {
    InputField,
    CustomButton,
    ErrorMessage,
    ActionLink,
    ArrowButton,
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
    }
  },
  mounted() {
    this.adjustFormWrapperHeight();
  },
  // Methods of the component
  methods: {
    adjustFormWrapperHeight() {
      const activeFormHeight = this.$refs.signUpForm.clientHeight;

      // Set the height of the form wrapper
      this.$refs.formWrapper.style.maxHeight = `${activeFormHeight}px`;
    },
    // Function to handle SignUp
    async signUp() {      
      if (!this.agreedToTerms) {
        this.errorMessage = 'You must agree to the Terms & Conditions and Privacy Policy.';
        return;
      } 
      try {

        // If successful, display the personalization form
        this.$refs.signUpForm.classList.add('concluded');
        setTimeout(() => {
          this.$refs.personalizationForm.classList.add('active');
        }, 100);
        // Attempting to sign up with provided credentials

/*         validateEmail(this.email);
        validatePassword(this.password);
        validateUsername(this.username);
        validatePasswordMatch(this.password, this.passwordConfirmation);
        
        await this.store.register(this.email, this.username, this.password);
        // On successful sign up, redirect to the landing page
        this.$router.push({ name: "landingPage" }); */


      } catch (error) {
        console.log(error);
        this.errorMessage = error.message;
        return;
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
  },
};
</script>


<style scoped>

.form-wrapper {
  overflow: hidden;
}

.personalization-form-wrapper {
  display: flex;
flex-direction: row;
}

.personalization-area {
  width: auto;
height: auto;
flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #303030;
background: #F2E6DD;
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


.personalization.form {
  width: 400px;
  transform: translateY(0%);
  opacity: 0;
  transition: transform 0.3s ease-in-out, opacity 0.5s ease-in;
}

.personalization.form.active {
  transform: translateY(-101%);
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
  width: 100%;
}
.arrow-button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.personalization-arrow:first-child {
  margin-bottom: 1rem;
}
.personalization-arrow {
  fill: #49ABFB;
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



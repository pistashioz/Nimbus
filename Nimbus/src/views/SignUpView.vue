<template>
  <!-- Main container for the signup form -->
  <div class="form-wrapper">
    <!-- signup form wrapper -->
    <main class="sign-up-form">
      <!-- Form element with submit event handler -->
      <form @submit.prevent="signUp">
        <!-- Title for the signup form -->
        <h1>Create Account</h1>
        <!-- Input container for email -->
        <div class="input-container">
          <input id="email" type="text" v-model="email" placeholder="email" required>
        </div>
        <!-- Input container for username -->
        <div class="input-container">
          <input id="username" type="text" v-model="username" placeholder="username" required>
        </div>
        <!-- Input container for password -->
        <div class="input-container">
          <input
            ref="passwordInput" 
            :type="passwordVisible ? 'text' : 'password'"
            v-model="password" 
            placeholder="password" 
            required
          >
          <img
            :src="passwordVisible ? eyeOpenIcon : eyeClosedIcon" 
            @click="togglePasswordVisibility" 
            class="password-toggle" 
          />
        </div>
        <!-- Input container for password confirmation -->
        <div class="input-container">
          <input
            ref="passwordInputConfirmation" 
            :type="passwordConfirmationVisible ? 'text' : 'password'"
            v-model="passwordConfirmation" 
            placeholder="confirm password"  
            required
          >
          <img
            :src="passwordConfirmationVisible ? eyeOpenIcon : eyeClosedIcon" 
            @click="togglePasswordConfirmationVisibility" 
            class="password-toggle" 
          />
        </div>
        <div class="terms-checkbox">
          <input type="checkbox" id="terms" v-model="agreedToTerms" required>
          <label for="terms">
            I agree to Nimbu's <a href="/terms" target="_blank">Terms & Conditions</a> and acknowledge the <a href="/privacy" target="_blank">Privacy Policy</a>.
          </label>
        </div>

        <div class="sign-up-wrapper">
        <!-- signup submission button -->
        <button type="submit" class="sign-up-button">Sign Up</button>
          <!-- Social signup options -->
          <div class="social-sign-up">
          <!-- Google signup button -->
          <button type="button" class="google-sign-up">
            <img src="@/assets/icons/google.svg" alt="Google logo" class="icon" />
          </button>
          <!-- Apple sign button -->
          <button type="button" class="apple-sign-up">
            <img src="@/assets/icons/apple.svg" alt="Apple logo" class="icon" />
          </button>
        </div>
      </div>
        <!-- Container for error messages -->
        <div class="error-container" :class="{ 'error-present': errorMessage }">
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>

        <!-- Link to log-in page -->
        <div class="log-in-link-wrapper">
          <p>Already have an account?</p>
          <div class="log-in-link" @click="goToLogIn"> Log In</div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
// Import user store from Pinia
import { useUserStore } from '@/stores/user';
// Import SVG icons for password visibility toggle
import eyeOpenIcon from '@/assets/icons/eye-open.svg';
import eyeClosedIcon from '@/assets/icons/eye-closed.svg';

export default {
  data() {
    return {
      email: "", // Bound to email input
      username: "", // Bound to username input
      password: "", // Bound to password input
      passwordConfirmation: "", // Bound to password confirmation input
      errorMessage: "", // Used to display signUp error messages
      passwordVisible: false, // Tracks password visibility state
      passwordConfirmationVisible: false, // Tracks password visibility state
      agreedToTerms: false, // Tracks whether the terms checkbox is checked
      eyeOpenIcon, // Eye open icon for password visibility
      eyeClosedIcon, // Eye closed icon for password visibility
    };
  },
  components: {
    
  },
  computed: {
    // Access to Pinia user store
    store() {
      return useUserStore();
    }
  },
  watch: {
    email() {
      this.clearErrorMessage(); // Clear error message when email changes
    },
    username() {
      this.clearErrorMessage(); // Clear error message when username changes
    },
    password() {
      this.clearErrorMessage(); // Clear error message when password changes
    },
    errorMessage(newValue) {
      // Set a timer to clear the error message after 3 seconds
      if (newValue) {
        setTimeout(() => {
          this.clearErrorMessage();
        }, 3000);
      }
    },
  },
  // Methods of the component
    methods: {
    // Regexes for form validation
      isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    },
    isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },
  isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    return usernameRegex.test(username);
  },
    // Function to handle SignUp
    async signUp() {
      if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }
    if (!this.isValidPassword(this.password)) {
      this.errorMessage = 'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.';;
      return;
    }
    if (this.password!== this.passwordConfirmation) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    if (!this.agreedToTerms) {
    this.errorMessage = 'You must agree to the Terms & Conditions and Privacy Policy.';
    return;
    }
      try {
        // Attempting to sign up with provided credentials
        console.log(this.store);
    
        await this.store.register(this.email, this.username, this.password);
        // On successful sign up, redirect to the landing page
        this.$router.push({ name: "landingPage" });
      } catch (error) {
        console.log(error);
        this.errorMessage = error.message;
      }
    },
    
    clearErrorMessage() {
       // Clear error message and cancel timer
      this.errorMessage = '';
      if (this.errorTimeout) {
        clearTimeout(this.errorTimeout);
        this.errorTimeout = null;
      }
    },
    goToLogIn() {
      // Redirect to the sign-up page
      this.$router.push({ name: 'login' });
    },
      togglePasswordVisibility() {
      // Toggle password visibility
      this.passwordVisible = !this.passwordVisible;

      // Focus the password input
      this.$refs.passwordInput.focus();
    },
    togglePasswordConfirmationVisibility() {
      // Toggle password visibility
      this.passwordConfirmationVisible =!this.passwordConfirmationVisible;
      
      // Focus the password input
      this.$refs.passwordInputConfirmation.focus();
      this.$refs.passwordInputConfirmation.classList.toggle('password-hidden');
    },
  },
};
</script>


<style scoped>

.sign-up-form {
  background: #F2CAAC;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem 2rem 2rem 2rem;
  border-radius: 30px;
  border: 1px solid #303030;
  text-align: center;
  width: 360px;
  overflow: hidden;
}

.sign-up-form form {
  position: relative;
  top: 0px;
}

.sign-up-form form .concluded {
  position: relative;
  top: 500px;
}

h1 {
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: left;
}

.input-container {
  margin-bottom: 1rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

/* .input-container:nth-child(4){
  justify-content: space-between;
}

.input-container:nth-child(4) input{
  width: 40%;
}
 */
input {
  width: 100%;
  font-family: 'Asap Regular', sans-serif; 
  font-size: 1.25rem; 
  color: #303030;
  padding: 0.8rem;
  border: 1px solid white;
  border-radius: 10px;
  outline: none; /* remove the default focus outline */
}

input:focus {
  border: 1px solid #303030; /* subtle border for focus */
}

.password-toggle {
  cursor: pointer;
  position: absolute;
  right: 1rem; /* Adjust as necessary */
  top: 50%;
  transform: translateY(-45%);
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
.sign-up-button {
  width: 14rem;
  height: fit-content;

  padding: 0.75rem;
  border: 1px solid #303030;
  border-radius: 20px;
  background-color: #A4B8E4; 
  color: white;
  margin-bottom: 0.8rem;
  cursor: pointer;
}

.social-sign-up {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 28%;
}

.social-sign-up button {
  font-family: 'Asap Black', sans-serif; 
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #303030;
  padding: 0.55rem;
  margin-bottom: 0.8rem;
  border: 1px solid #303030;
  border-radius: 20px;
  cursor: pointer;
}

/* Style for the icons inside the buttons */
.social-sign-up .icon {
  width: 24px; /* Example size, adjust as needed */
  height: auto;
}


.error-container {
  max-height: 0; /* initially hide the error message */
}

/* When an error is present, increase the max-height */
.error-container.error-present {
  transition: max-height 0.08s ease-in; 
  max-height: 62px; /* set to the maximum height the error message could have */
}


.error-message {
  color: red;
  font-family: 'Asap ExtraBold', sans-serif;
  margin-top: 0;
  margin-bottom: 0.2rem;
}

.log-in-link-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-1%);
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.log-in-link-wrapper p {
  margin: 0;
  padding-right: 0.5rem;
}

.log-in-link {
  text-decoration: underline;
  font-size: 0.94rem;
  color: #858585; 
  cursor: pointer;
}

</style>   



- Adicionar a animação de obter mais informação a cada dia da semana.



<template>
  <!-- Main container for the login form -->
  <div class="login-container">
    <!-- Login form wrapper -->
    <main class="login-form">
      <!-- Form element with submit event handler -->
      <form @submit.prevent="signUp">
        <!-- Title for the login form -->
        <h1>Create Account</h1>
        <!-- Input container for email -->
        <div class="input-container">
          <input id="email" type="text" v-model="email" placeholder="email" required>
        </div>
        <!-- Input container for username -->
        <div class="input-container">
          <input id="username" type="text" v-model="email" placeholder="username" required>
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

        <div class="sign-up-wrapper">
        <!-- Login submission button -->
        <button type="submit" class="sign-up-button">Sign Up</button>
          <!-- Social login options -->
          <div class="social-login">
          <!-- Google login button -->
          <button type="button" class="google-login">
            <img src="@/assets/icons/google.svg" alt="Google logo" class="icon" />
          </button>
          <!-- Apple login button -->
          <button type="button" class="apple-login">
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
      errorMessage: "", // Used to display login error messages
      passwordVisible: false, // Tracks password visibility state
      passwordConfirmationVisible: false, // Tracks password visibility state
      eyeOpenIcon, // Eye open icon for password visibility
      eyeClosedIcon, // Eye closed icon for password visibility
    };
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
    // Function to handle login
    async signUp() {
      console.log(this.identifier, this.password, this.passwordConfirmation);
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
    },
  },
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;

}

.login-form {
  background: #F2CAAC;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem 2rem 2rem 2rem;
  border-radius: 30px;
  border: 1px solid #303030;
  text-align: center;
  width: 350px;
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

.forgot-password {
  text-align: left;
  font-size: 0.94rem;
  text-decoration: underline;
  margin-bottom: 1rem;
  color: #858585;
  cursor: pointer;
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
  margin-bottom: 1rem;
  cursor: pointer;
}

.social-login {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;
}

.social-login button {
  font-family: 'Asap Black', sans-serif; 
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #303030;

  padding: 0.55rem;
  margin-bottom: 0.5rem;
  border: 1px solid #303030;
  border-radius: 20px;
  cursor: pointer;
}

/* Style for the icons inside the buttons */
.social-login .icon {
  width: 24px; /* Example size, adjust as needed */
  height: auto;
}

.google-login {
}

.error-container {
  max-height: 0; /* initially hide the error message */
}

/* When an error is present, increase the max-height */
.error-container.error-present {
  transition: max-height 0.08s ease-in; 
  max-height: 32px; /* set to the maximum height the error message could have */
}


.error-message {
  color: red;
  font-family: 'Asap ExtraBold', sans-serif;
  margin-top: 0;
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



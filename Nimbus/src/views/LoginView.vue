<template>
  <!-- Main container for the login form -->
  <div class="form-wrapper">
    <!-- Login form wrapper -->
    <main class="login form">
      <!-- Form element with submit event handler -->
      <form @submit.prevent="login">
        <!-- Title for the login form -->
        <h1>hello!</h1>
        <!-- Input container for username -->
        <InputField
        id="username"
        placeholder="username or email"
        v-model="identifier"
        required
        />
        <InputField
        id="passwordInput"
        type="password"
        placeholder="password"
        v-model="password"
        required
        />
        <!-- Link for password recovery -->
        <ActionLink text="Forgot your password?" class="left"/>
        <!-- Login submission button -->
        <CustomButton
        buttonType="submit"
        buttonText="Log In"
        />
        <!-- Container for error messages -->
        <ErrorMessage :message="errorMessage" @clear-error="handleClearError" class="login"/>
        <!-- Social login options -->
        <div class="social-login">
          <!-- Google signup button -->
          <CustomButton
          buttonClass="google social"
          buttonText="Continue with Google"
          iconSrc="google" class = 'buttons-social-login'
          />
          <!-- Apple sign button -->
          <CustomButton
          buttonClass="apple social"
          buttonText="Continue with Apple"
          iconSrc="apple" 
          />
        </div>
        <!-- Link to sign-up page -->
        <ActionLink preText="New to Nimbus?" text="Sign Up" @handleClick="goToSignUp" />
      </form>
    </main>
  </div>
</template>

<script>
import InputField from '@/components/InputField.vue';
import ActionLink from '@/components/ActionLink.vue';
import CustomButton from '@/components/CustomButton.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
// Import user store from Pinia
import { useUserStore } from '@/stores/user';


export default {
  data() {
    return {
      identifier: "", // Bound to username input
      password: "", // Bound to password input
      errorMessage: "", // Used to display login error messages
    };
  },
  components: {
    InputField,
    ActionLink,
    CustomButton,
    ErrorMessage,
  },
  computed: {
    // Access to Pinia user store
    store() {
      return useUserStore();
    }
  },
  watch: {
    identifier() {
      this.handleClearError(); // Clear error message when username changes
    },
    password() {
      this.handleClearError(); // Clear error message when password changes
    },
  },
  // Methods of the component
  methods: {
    // Function to handle login
    async login() {
      try {
        // Attempting to log in with provided credentials
        await this.store.login(this.identifier, this.password);
        // On successful login, redirect to the landing page
        this.$router.push({ name: "landingPage" });
      } catch (error) {
        // If login fails, set the error message
        this.errorMessage = error.message;
      }
    },
    handleClearError() {
      this.errorMessage = "";
    },
    goToSignUp(event) {
      // Redirect to the sign-up page
      if (event.target.classList.contains('main-text')) {
      this.$router.push({ name: 'signUp' });
      }
    },

  },
};
</script>


<style scoped>
.social-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
<template>
  <main>
    <!-- Form for user login -->
    <form @submit.prevent="login">
      <!-- Username or Email Input -->
      <div>
        <label for="username">Username or Email:</label>
        <input id="username" type="text" v-model="identifier" required>
      </div>
      
      <!-- Password Input -->
      <div>
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password" required>
      </div>

      <!-- Submit Button -->
      <button type="submit">Login</button>

      <!-- Error Message Display -->
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </main>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default {
  // Component data
  data() {
    return {
      identifier: "", // Username or email for login
      password: "", // Password for login
      errorMessage: "" // Error message display
    };
  },
  // Computed properties
  computed: {
    // Access the user store
    store() {
      return useUserStore();
    }
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
  },
};
</script>

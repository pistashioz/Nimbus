<script>
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import nimbusLogo from "@/assets/icons/logo.svg"; // Ensure correct path

export default {
  data() {
    return {
      nimbusLogo,
    };
  },
  computed: {
    name() {
      return this.store.getUser?.username;
    },
    isUser() {
      return this.store.isUser;
    },
    store() {
      return useUserStore();
    },
  },
  methods: {
    logout() {
      this.store.logout();
      this.$router.push({ name: "landingPage" });
    },
  },
};
</script>

<template>
  <span v-if="!isUser" id="unlogged">
    <div id="leftNav">
      <RouterLink :to="{ name: 'landingPage' }" id="logo">
        <img :src="nimbusLogo" alt="logo" id="logoImg"> nimbus
      </RouterLink>
      <RouterLink :to="{ name: 'login' }" id="login">Login</RouterLink>
    </div>
    <div id="rightNav">
      <RouterLink :to="{ name: 'signUp' }" id="signUp">Sign Up</RouterLink>
    </div>
  </span>

  <span v-else id="logged2">
    <RouterLink :to="{ name: 'landingPage' }" id="logo">
      <div id="nimbusLogo">
        <img :src="nimbusLogo" alt="logo" id="logoImg">nimbus
      </div>
    </RouterLink>
    <div class="header-links">
      <RouterLink :to="{ name: '' }" id="todayBtn" :class="{ active: $route.name === '' }">TODAY</RouterLink>
      <RouterLink :to="{ name: 'myAccount' }" id="myAccBtn" :class="{ active: $route.name === 'myAccount' }">MY ACCOUNT</RouterLink>
      <RouterLink :to="{ name: '' }" id="helpAndSupportBtn" :class="{ active: $route.name === '' }">HELP & SUPPORT</RouterLink>
      <button @click="logout" id="logoutBtn">LOG OUT</button>
    </div>
  </span>
</template>

<style>
/* General Styles */
a, button {
  text-decoration: none;
  background-color: transparent;
  color: #303030;
  font-family: 'Asap';
  border: none;
  outline: none;
  font-size: 1.2vw;
}

/* Container Styles */
#unlogged,
#logged2 {
  height: 20vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2vw;
  max-width: 100vw;
  margin: 0 auto;
}

#leftNav, #rightNav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12vh;
  border-radius: 20vh;
}

#leftNav {
  background-color: #ADD8FB;
  border: 1px solid #303030;
  width: 30vw;
  justify-content: space-around;
  padding: 0 2vw;
}

#rightNav {
  background-color: #F5CB5B;
  border: 1px solid #303030;
  min-width: 10vw;
  padding: 0 2vw;
}

/* Logo Styles */
#logo {
  font-family: 'Recoleta';
  font-weight: bold;
  font-size: 3.5vw;
  color: orange;
  display: flex;
  align-items: center;
}

#logoImg {
  width: 5vw;
  height: auto;
  margin-right: 1vw;
}

/* Text Styles */
#signUp, #login, .username, #logoutBtn, .header-links a {
  font-family: 'Recoleta';
  font-weight: bold;
  font-size: 1.5vw;
}

.header-links a {
  margin-right: 1vw;
}
</style>

<script>
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import nimbusLogo from "@/assets/icons/logo.svg";
export default {
  data() {
    return {
      nimbusLogo
    };
  },
  computed: {
    name() {
      return this.store.getUser?.username 
    },
    isUser() {
      return this.store.isUser
    },
    // Access to Pinia user store
    store() {
      return useUserStore();
    }
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
  <nav>
    <!-- Display this part when user is not logged in -->
    <span v-if="!isUser" id='unlogged'>
      <div id='leftNav'>
        <RouterLink :to="{ name: 'landingPage' }" id='logo'>
          <img :src='nimbusLogo' alt='logo' id='logoImg'> nimbus
        </RouterLink>
        <RouterLink :to="{ name: 'login' }" id='login'>Login</RouterLink>
      </div>
      <div id='rightNav'>
        <RouterLink :to="{ name: 'signUp' }" id='signUp'>Sign Up</RouterLink>
      </div>
    </span>

    <!-- Display this part when user is logged in -->
    <span v-else id='logged'>
      <div id='leftNav'>
        <RouterLink :to="{ name: 'landingPage' }" id='logo'>
          <img :src='nimbusLogo' alt='logo' id='logoImg'> nimbus
        </RouterLink>
        <span class='username'>Hello, {{ name }}</span>
      </div>
      <div id='rightNav'>
        <button @click="logout" id='logout'>Logout</button>
      </div>
    </span>
  </nav>
</template>

<style>

a, button{
  text-decoration: none;
  background-color: transparent;
  color: #303030;
  font-family: 'Asap';
  border: none;
  outline: none; /* Remove focus outline */
  font-size:1.2vw;
  }

#rightNav {
  border: 1PX solid #303030;
}

#unlogged,
#logged {
  /* background-color: red; */
  height: 20vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2vw;
  padding-right: 2vw;
  max-width: 100vw; 
  margin: 0 auto; 
  padding: 0 2vw; 
  background: none;
  border: none;
}

#leftNav{
  background-color: #ADD8FB;
  border: 1px solid #303030;
  display: flex;
  width: 30vw;
  height: 12vh;
  border-radius: 20vh;
  justify-content: space-around;
  align-items: center;
  padding-left: 2vw;
  padding-right: 2vw;
}

#leftNav .username {
  font-size: 1.5rem;
}

#logo{
  font-family: 'Recoleta';
  font-weight: bold;
  font-size:3.5vw;
  color: orange;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  width: 18vw;
}
#logoImg{
  width: 5vw; 
  height: auto;
  margin-right: 1vw; 
}
#signUp,
#rightNav{
  background-color: #F5CB5B;
  display: flex;
  justify-content: center;
  height: 10vh;
  border-radius: 20vh; 
  align-items: center;
  padding: 0 2vw;
  font-family: 'Recoleta';
  font-weight: bold;
  font-size: 1.5vw;
  min-width: 10vw;

}

#login,
#logout,
.username{
  font-family: 'Recoleta';
  font-weight: bold;
  font-size: 1.5vw;
}

</style>



<script>
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
export default {
  data() {
    return {
      store: useUserStore()
    };
  },
  computed: {
    name() {
      return this.store.getUser?.username 
    },
    isUser() {
      return this.store.isUser
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
      <span v-if="!isUser" id = 'unlogged'>
      <div id = 'leftNav'>
        <RouterLink :to="{ name: 'landingPage' }" id = 'logo'><img src = '../assets/logo.svg' alt = 'logo' id = 'logoImg'> nimbus</RouterLink>
        <RouterLink :to="{ name: 'login' }"  id  ='login'>Login</RouterLink>
      </div>
      <div id = 'rightNav'>
        <RouterLink :to="{ name: 'signUp' }" id = 'signUp'>Sign Up</RouterLink>
      </div>
    </span>
  
    <span v-else id = 'logged'>
      
        <RouterLink :to="{ name: 'basicModeDashboard' }"></RouterLink>
        <RouterLink :to="{ name: 'advancedModeDashboard' }"></RouterLink>
        <RouterLink :to="{ name: 'helpAndSupport' }">Help & Support</RouterLink>
      <button @click="logout">logout</button>
    </span>
  </nav>
</template>
<style>

a{
  text-decoration: none;
  color: #303030;
  font-family: 'Asap';
  font-size:1.2vw;
  }
#unlogged {
  height: 20vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2vw;
  padding-right: 2vw;
  max-width: 100vw; 
  margin: 0 auto; 
  padding: 0 2vw; 
}

#leftNav{
  background-color: #ADD8FB;
  display: flex;
  width: 30vw;
  height: 12vh;
  border-radius: 20vh;
  justify-content: space-between;
  align-items: center;
  padding-left: 2vw;
  padding-right: 2vw;
  border: solid #303030 0.5;
}

#logo{
  font-family: 'Recoleta';
  font-weight: bold;
  font-size:3.5vw;
  color: orange;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 18vw;
}
#logoImg{
  width: 5vw; 
  height: auto;
  margin-right: 1vw; 
}
#signUp{
  background-color: #F5CB5B;
  display: flex;
  height: 8vh;
  border-radius: 20vh; 
  align-items: center;
  padding: 0 2vw;
  font-family: 'Recoleta';
  font-weight: bold;
  font-size: 1.5vw;
  max-width: 10vw;
  border: solid #303030 0.5;
}

#login{
  font-family: 'Recoleta';
  font-weight: bold;
  font-size: 1.5vw;
}

</style>



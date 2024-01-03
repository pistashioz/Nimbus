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
        <RouterLink :to="{ name: 'landingPage' }" id = 'logo'><img src = '../assets/logo.svg' alt = 'logo' width="70" height="70" id = 'logoImg'> nimbus</RouterLink>
        <RouterLink :to="{ name: 'login' }"  id  ='login'>Login</RouterLink>
      </div>
      <div id = 'rightNav'>
        <RouterLink :to="{ name: 'signUp' }" id = 'signUp'>SignUp</RouterLink>
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
nav{
  background-color: red;
  height: 12vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
#leftNav{
  background-color: beige;
  width: 30vw;
  height: 12vh;
  border-radius: 20vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2vw;
  padding-right: 2vw;
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

#signUp{
  background-color: beige;
  width: 30vw;
  height: 12vh;
  border-radius: 20vh;
}

</style>



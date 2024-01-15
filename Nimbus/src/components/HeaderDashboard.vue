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
      <div id = 'nimbusLogo'>nimbus</div>
      <Router-link :to="{name: 'basicModeDashboard'}" id = 'todayBtn'  :class="{ active: $route.name === 'basicModeDashboard' }">TODAY</Router-link>
      <RouterLink :to="{name: 'myAccount'}" id="myAccBtn" :class="{ active: $route.name === 'myAccount' }">MY ACCOUNT</RouterLink>
      <RouterLink :to="{ name: 'helpAndSupport' }" id='helpAndSupportBtn' :class="{ active: $route.name === 'helpAndSupport' }">HELP & SUPPORT</RouterLink>
      <button @click="logout" id = 'logoutBtn'>LOG OUT</button>
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
#logged{
  width: 69.125rem;
  height: 3.125rem;
  flex-shrink: 0;
  border-radius: 3.125rem 3.125rem 0.625rem 0.625rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
  background: var(--Primary-Color-Palette-Dawn-Blush, #F2E6DD);
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
#nimbusLogo{
  width: 5.37075rem;
  color: #E65E2A;
  font-family: Recoleta;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

#todayBtn, #myAccBtn, #helpAndSupportBtn, #logoutBtn{
  display: flex;
  padding: 0.4375rem 1.1875rem;
  color: #9E9E9E;
  font-family: Asap;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

#todayBtn.active {
  
  color: #303030;
  background: var(--todayBtn-active-background-color, #E15CC8);
}


#myAccBtn.active {
  
  color: #303030;
  background: var(--myAccBtn-active-background-color, #8874E3);
}

#helpAndSupportBtn.active {
  
  color: #303030;
  background: var(--helpAndSupportBtn-active-background-color, #F5CB5B);
}

.active {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid var(--Textual-Elements-Midnight-Onyx, #303030);
}
button{
  color: #9E9E9E;
  font-family: Asap;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  color: inherit;
  }
</style>



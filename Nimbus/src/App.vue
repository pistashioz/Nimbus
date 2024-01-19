<!-- <script>
import { RouterLink, RouterView } from "vue-router";
import HeaderDashboard from "./components/HeaderDashboard.vue";
export default {
  components: {
    HeaderDashboard,
  }
}
</script>

<template>
  <v-app>
    <HeaderDashboard />
    <v-main class="d-flex align-center justify-center" >
      <RouterView v-slot="{ Component}">
        <transition name = 'route' mode = 'out-in'>
          <component :is = 'Component'></component>
        </transition>
      </RouterView>
    </v-main>
  </v-app>
</template>
<style>
.route-enter-from{
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active{
  transition: all 0.5s ease-out;
}
.router-leave-to{
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active{
  transition: all 0.5s ease-in;
}
</style> -->

<script>
import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
  computed: {
    // Computed property to determine if the header should be shown
    showHeader() {
      const headerRoutes = ['landingPage', 'login', 'signUp', 'legalResources', 'additionalInformation'];
      return headerRoutes.includes(this.$route.name);
    },
  },
};
</script>

<template>
  <v-app class="v-app">
    <!-- Render Header only if showHeader is true -->
    <Header v-if="showHeader" />
    <v-main class="v-main">
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>
/* Styles here */
</style>

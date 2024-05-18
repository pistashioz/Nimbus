<template>
  <v-app>
    <!-- Render Header only if showHeader is true -->
    <Header v-if="showHeader" />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';

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

<style>
</style>

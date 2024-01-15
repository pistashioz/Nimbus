<script>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
export default {
  components: {
    Header,
  }
}
</script>

<template>
  <v-app class="v-app">
    <Header />
    <v-main class="v-main">
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>

</style>
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
  <v-app>
    <Header />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>

</style>
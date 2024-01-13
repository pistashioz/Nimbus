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
</style>
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import './populateLocalStorage';
import {
  faArrowLeft,
  faArrowRight,
  faChevronLeft,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

library.add(faArrowLeft, faArrowRight, faChevronLeft, faLocationDot);

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

app.use(vuetify);

import { useUserStore } from '@/stores/user';
import { useWeatherStore } from '@/stores/weather';

const userStore = useUserStore();
if (!userStore.isUser) {
  userStore
    .login('testUser', 'testPassword')
    .then(() => {
      const weatherStore = useWeatherStore();
      weatherStore.updateUserWeather(userStore.user.userRegion, userStore.user.userLocations);
    })
    .catch((error) => console.error(error));
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

app.mount('#app');

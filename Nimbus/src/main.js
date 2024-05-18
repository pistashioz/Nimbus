// main.js

// Importing essential Vue and Pinia modules
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Importing the persisted state plugin for Pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Importing the root component and router configuration
import App from './App.vue';
import router from './router';

// Import the script to populate localStorage
import './populateLocalStorage';

import { faArrowLeft, faArrowRight, faChevronLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faArrowLeft, faArrowRight, faLocationDot, faChevronLeft);

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);

// Creating a Pinia store instance
const pinia = createPinia();

// Applying the persisted state plugin to the Pinia store
pinia.use(piniaPluginPersistedstate);

// Integrating Pinia and router with the Vue application
app.use(pinia);
app.use(router);

// Automatically log in the dummy user
import { useUserStore } from '@/stores/user';
import { useWeatherStore } from '@/stores/weather';

const userStore = useUserStore();
if (!userStore.isUser) {
    userStore.login('testUser', 'testPassword')
        .then(() => {
            const weatherStore = useWeatherStore();
            weatherStore.updateUserWeather(userStore.user.userRegion, userStore.user.userLocations);
        })
        .catch(err => console.error(err));
}

// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        }).catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
}

// Mounting the Vue application to the DOM
app.mount('#app');

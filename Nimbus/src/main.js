// Importing the main stylesheet for the app
import './assets/main.css'

// Importing essential Vue and Pinia modules
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Importing the persisted state plugin for Pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Importing the root component and router configuration
import App from './App.vue'
import router from './router'

// Creating the Vue application instance
const app = createApp(App)

// Creating a Pinia store instance
const pinia = createPinia()

// Applying the persisted state plugin to the Pinia store
pinia.use(piniaPluginPersistedstate)

// Integrating Pinia and router with the Vue application
app.use(pinia)
app.use(router)

// Mounting the Vue application to the DOM
app.mount('#app')

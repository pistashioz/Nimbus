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
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'


/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowLeft, faArrowRight, faChevronLeft, faLocationDot} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faArrowLeft, faArrowRight, faLocationDot, faChevronLeft)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)



// Creating a Pinia store instance
const pinia = createPinia()

// Applying the persisted state plugin to the Pinia store
pinia.use(piniaPluginPersistedstate)

// Integrating Pinia and router with the Vue application
app.use(pinia)
app.use(router)

// Mounting the Vue application to the DOM
app.mount('#app')

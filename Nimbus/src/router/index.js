import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '../views/LandingPageView.vue'
import BasicModeDashboardView from '../views/BasicModeDashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPageView
    },    
    {
      path: '/basicModeDashboard',
      name: 'basicModeDashboard',
      component: BasicModeDashboardView
    },
    
  ]
})

export default router

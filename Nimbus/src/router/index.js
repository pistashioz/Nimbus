import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '../views/LandingPageView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import LegalResourcesView from '../views/LegalResourcesView.vue'
import AdditionalInformationView from '../views/AdditionalInformationView.vue'
import BasicModeDashboardView from '../views/BasicModeDashboardView.vue'
import AdvancedModeDashboardView from '../views/AdvancedModeDashboardView.vue'
import HelpAndSupportView from '../views/HelpAndSupportView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPageView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUpView
    },
    {
      path: '/legalResources',
      name: 'legalResources',
      component: LegalResourcesView
    },
    {
      path: '/additionalInformation',
      name: 'additionalInformation',
      component: AdditionalInformationView
    },
    
    {
      path: '/basicModeDashboard',
      name: 'basicModeDashboard',
      component: BasicModeDashboardView
    },
    {
      path: '/advancedModeDashboard',
      name: 'advancedModeDashboard',
      component: AdvancedModeDashboardView
    },
    {
      path: '/helpAndSupport',
      name: 'helpAndSupport',
      component: HelpAndSupportView
    }
    
  ]
})

export default router

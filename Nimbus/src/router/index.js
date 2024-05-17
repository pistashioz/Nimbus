import { createRouter, createWebHistory } from 'vue-router';
import LandingPageView from '../views/LandingPageView.vue';
import AdvancedModeDashboardView from '../views/AdvancedModeDashboardView.vue';
import MyAccountView from '../views/myAccountView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPageView
    },
    {
      path: '/advancedModeDashboard/:city',
      name: 'advancedModeDashboard',
      component: AdvancedModeDashboardView
    },
    {
      path: '/Account',
      name: 'myAccount',
      component: MyAccountView
    },
  ]
});

export default router;

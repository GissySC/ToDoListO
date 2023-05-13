import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/Auth/AuthView.vue';
import SignIn from '../views/Auth/SignIn.vue';
import SignUp from '../views/Auth/SignUp.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      children: [
        {
          path: 'sign-in',
          name: 'sign-in',
          component: SignIn,
        },
        {
          path: 'sign-up',
          name: 'sign-up',
          component: SignUp,
        }
      ]
      
    }
  
  ]
})

export default router

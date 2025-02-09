import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

import BlankLayout from '../layouts/BlankLayout.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: DefaultLayout, // Use DefaultLayout for the home page
      children: [
        {
          name: 'tasks',
          path: '/tasks',
          component: () => import('@/components/TaskList.vue'),
        },
        {
          name: 'categories',
          path: '/categories',
          component: () => import('@/components/CategoryList.vue'),
          props: true, // Allow route params as props in the component
        },
      ],
    },

    {
      path: '/login',
      component: BlankLayout,
      meta: {
        requiresAuth: false,
        title: 'Login',
        description: 'Log in to your account.',
        keywords: 'Login, Account, Access',
      },
      children: [
        {
          name: 'login',
          path: '',
          component: () => import('@/views/UserLoginPage.vue'),
        },
      ],
    },
    {
      path: '/signup',
      component: BlankLayout,
      children: [
        {
          path: '',
          component: () => import('@/views/UserRegistrationPage.vue'),
        },
      ],
    },
    {
      path: '/forgot-password',
      component: BlankLayout,
      children: [
        {
          path: '',
          component: () => import('@/components/ForgotPassword.vue'),
        },
      ],
    },
    {
      path: '/reset-password',
      component: BlankLayout,
      children: [
        {
          path: '',
          component: () => import('@/components/ResetPassword.vue'),
        },
      ],
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Acme from '../components/acme.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Acme
    },
    
  ]
})

export default router

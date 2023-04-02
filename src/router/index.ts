import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/LoginView.vue'
import GeneralView from '@/views/GeneralView.vue'
import { App } from 'vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: HomeView,
    meta: {
      auth: false,
    },
  },
  {
    path: '/',
    name: 'general',
    component: GeneralView,
    meta: {
      auth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export function appUseRouter(app: App<Element>) {
  app.use(router)
}
export default router

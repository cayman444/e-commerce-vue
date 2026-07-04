import { Catalog } from '@/pages'
import { createRouter, createWebHistory } from 'vue-router'

export const ROUTES_PATHS = {
  CATALOG: '/',
  REGISTRATION: '/register',
  LOGIN: '/login',
} as const

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: ROUTES_PATHS.CATALOG, component: Catalog }],
})

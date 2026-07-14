import { About, Catalog, Journal, Product } from '@/pages'
import { createRouter, createWebHistory } from 'vue-router'

export const ROUTES_PATHS = {
  CATALOG: '/',
  REGISTRATION: '/register',
  LOGIN: '/login',
  ABOUT: '/about',
  JOURNAL: '/journal',
  PRODUCT: '/products/:id',
} as const

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: ROUTES_PATHS.CATALOG, component: Catalog },
    { path: ROUTES_PATHS.ABOUT, component: About },
    { path: ROUTES_PATHS.JOURNAL, component: Journal },
    { path: ROUTES_PATHS.PRODUCT, name: 'product-details', component: Product },
  ],
})

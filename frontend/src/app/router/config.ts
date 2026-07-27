import { useUserStore } from '@/entities/user'
import { About, Cart, Catalog, Journal, Login, Product, Register } from '@/pages'
import { createRouter, createWebHistory } from 'vue-router'

export const ROUTES_PATHS = {
  CATALOG: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  ABOUT: '/about',
  JOURNAL: '/journal',
  PRODUCT: '/products/:id',
  CART: '/cart',
  PROFILE: '/profile',
  ADMIN: '/admin',
} as const

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: ROUTES_PATHS.CATALOG, component: Catalog },
    { path: ROUTES_PATHS.ABOUT, component: About },
    { path: ROUTES_PATHS.JOURNAL, component: Journal },
    { path: ROUTES_PATHS.PRODUCT, name: 'product-details', component: Product },
    { path: ROUTES_PATHS.CART, component: Cart },
    { path: ROUTES_PATHS.LOGIN, component: Login },
    { path: ROUTES_PATHS.REGISTER, component: Register },
  ],
})

router.beforeEach((to) => {
  const { isAuthenticated, isAdmin } = useUserStore()

  if (
    (to.path === ROUTES_PATHS.LOGIN || to.path === ROUTES_PATHS.REGISTER) &&
    (isAuthenticated || isAdmin)
  ) {
    return ROUTES_PATHS.CATALOG
  }
})

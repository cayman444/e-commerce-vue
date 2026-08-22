import { useUserStore } from '@/entities/user'
import { About, Admin, Cart, Catalog, Journal, Login, Product, Profile, Register } from '@/pages'
import { storeToRefs } from 'pinia'
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
    { path: ROUTES_PATHS.PROFILE, component: Profile },
    { path: ROUTES_PATHS.ADMIN, component: Admin },
  ],
})

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  const { isInitialLoading, isAuthenticated, isAdmin } = storeToRefs(userStore)

  if (isInitialLoading.value) {
    await userStore.initAuth()
    isInitialLoading.value = false
  }

  if (to.path === ROUTES_PATHS.PROFILE && !isAuthenticated.value) {
    return ROUTES_PATHS.LOGIN
  }

  if (to.path === ROUTES_PATHS.ADMIN && (!isAuthenticated.value || !isAdmin.value)) {
    return ROUTES_PATHS.CATALOG
  }

  if (
    (to.path === ROUTES_PATHS.LOGIN || to.path === ROUTES_PATHS.REGISTER) &&
    isAuthenticated.value
  ) {
    return ROUTES_PATHS.CATALOG
  }
})

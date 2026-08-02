<script setup lang="ts">
import { ROUTES_PATHS } from '@/app/router'
import { useCartStore } from '@/entities/cart'
import { UserInfoCard, UserInfoCart, UserOrderHistory, useUserStore } from '@/entities/user'
import type { IOrder } from '@/entities/user/ui/UserOrderHistory.vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const cartStore = useCartStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()

  router.push(ROUTES_PATHS.CATALOG)
}

const demoOrders: IOrder[] = [
  { id: '8429', date: '12 Окт 2024', itemsCount: 2, status: 'delivered', totalAmount: 124000 },
  { id: '8415', date: '05 Сен 2024', itemsCount: 1, status: 'processing', totalAmount: 85000 },
  { id: '8390', date: '18 Авг 2024', itemsCount: 3, status: 'cancelled', totalAmount: 42000 },
]
</script>

<template>
  <div class="px-8 py-8 md:px-16 md:py-16 flex flex-col gap-18">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <div class="lg:col-span-8">
        <UserInfoCard :user="userStore.user" :is-admin="userStore.isAdmin" @logout="handleLogout" />
      </div>
      <div class="lg:col-span-4">
        <UserInfoCart :total-price="cartStore.totalPrice" :total-count="cartStore.totalCount" />
      </div>
    </div>
    <UserOrderHistory :orders="demoOrders" />
  </div>
</template>

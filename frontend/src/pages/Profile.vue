<script setup lang="ts">
import { ROUTES_PATHS } from '@/app/router'
import { useCartStore } from '@/entities/cart'
import { UserInfoCard, UserInfoCart, useUserStore } from '@/entities/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const cartStore = useCartStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout()

  router.push(ROUTES_PATHS.CATALOG)
}
</script>

<template>
  <div class="flex flex-col gap-16 px-8 py-8 md:px-16 md:py-16">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <div class="lg:col-span-8">
        <UserInfoCard :user="userStore.user" :is-admin="userStore.isAdmin" @logout="handleLogout" />
      </div>
      <div class="lg:col-span-4">
        <UserInfoCart :total-price="cartStore.totalPrice" :total-count="cartStore.totalCount" />
      </div>
    </div>
  </div>
</template>

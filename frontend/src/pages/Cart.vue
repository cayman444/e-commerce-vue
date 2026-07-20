<script setup lang="ts">
import { ROUTES_PATHS, router } from '@/app/router'
import { CartList, CartSummary, useCartStore } from '@/entities/cart'
import { Button } from '@/shared/ui'
import { ArrowLeft } from '@lucide/vue'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { productsToCart, totalPrice, totalCount } = storeToRefs(cartStore)
</script>

<template>
  <div class="px-8 py-8 md:px-16 md:py-16 flex flex-col gap-12">
    <div>
      <button
        @click="router.push(ROUTES_PATHS.CATALOG)"
        class="flex items-center gap-2 font-semibold text-xs uppercase tracking-wider text-tertiary hover:text-secondary transition-colors cursor-pointer"
      >
        <ArrowLeft :size="14" />
        Назад в каталог
      </button>
    </div>
    <div>
      <h1 class="font-display text-4xl md:text-5xl uppercase m-0">Корзина</h1>
    </div>
    <div
      v-if="productsToCart.length === 0"
      class="flex flex-col items-center justify-center py-20 text-center gap-6"
    >
      <p class="text-tertiary text-lg">Ваша корзина пуста</p>
      <Button variant="secondary" size="lg" @click="router.push(ROUTES_PATHS.CATALOG)">
        Вернуться в каталог
      </Button>
    </div>
    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <div class="lg:col-span-8">
        <CartList
          :productsToCart
          @increment="cartStore.incrementCountProduct"
          @decrement="cartStore.decrementCountProduct"
          @remove="cartStore.removeFromCart"
        />
      </div>
      <div class="lg:col-span-4">
        <CartSummary :total-price="totalPrice" :total-count="totalCount" />
      </div>
    </div>
  </div>
</template>

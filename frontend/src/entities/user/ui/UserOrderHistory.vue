<script setup lang="ts">
import { ArrowRight, ShoppingBag } from '@lucide/vue'
import UserOrderHistoryList from './UserOrderHistoryList.vue'

export interface IOrder {
  id: string
  date: string
  status: 'delivered' | 'processing' | 'cancelled'
  itemsCount: number
  totalAmount: number
}

withDefaults(
  defineProps<{
    orders?: IOrder[]
  }>(),
  {
    orders: () => [],
  },
)
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <div class="flex items-center justify-between border-b border-secondary/10 pb-4">
      <h3 class="font-display text-2xl md:text-3xl text-secondary tracking-tight">
        Последние заказы
      </h3>
      <button
        type="button"
        class="font-semibold text-xs uppercase tracking-widest text-tertiary hover:text-secondary flex items-center gap-1.5 cursor-pointer transition-colors border-0 bg-transparent"
      >
        <span>Все заказы</span>
        <ArrowRight :size="14" />
      </button>
    </div>
    <div
      v-if="!orders || orders.length === 0"
      class="bg-neutral border border-secondary/10 p-8 flex flex-col items-center justify-center text-center gap-3 py-12"
    >
      <ShoppingBag :size="32" class="text-tertiary opacity-60" />
      <p class="text-secondary font-medium text-base">У вас пока нет оформленных заказов</p>
      <p class="text-tertiary text-xs max-w-md">
        Исследуйте каталог товаров, чтобы выбрать подходящие позиции и сделать ваш первый заказ.
      </p>
    </div>
    <template v-else>
      <UserOrderHistoryList :orders="orders" />
      <p v-if="orders.length < 6" class="text-xs text-tertiary text-center pt-2">
        Больше нет недавних заказов. Исследуйте каталог, чтобы найти новые коллекции.
      </p>
    </template>
  </div>
</template>

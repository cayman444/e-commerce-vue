<script setup lang="ts">
import type { IProductsToCart } from '../model/types.ts'
import CartItem from './CartItem.vue'

defineProps<{ productsToCart: IProductsToCart[] }>()

defineEmits<{
  (e: 'increment', productId: string): void
  (e: 'decrement', productId: string): void
  (e: 'remove', productId: string): void
}>()
</script>

<template>
  <div class="flex flex-col border-t border-b border-secondary/10">
    <CartItem
      v-for="item in productsToCart"
      :key="item.productId"
      :item="item"
      @increment="$emit('increment', item.productId)"
      @decrement="$emit('decrement', item.productId)"
      @remove="$emit('remove', item.productId)"
    />
  </div>
</template>

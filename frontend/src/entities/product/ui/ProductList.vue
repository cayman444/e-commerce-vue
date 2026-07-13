<script setup lang="ts">
import type { IProduct } from '../model/types'
import ProductCard from './ProductCard.vue'

defineProps<{ products: IProduct[] }>()
</script>

<template>
  <ul class="grid grid-cols-2 gap-6 lg:grid-cols-4">
    <TransitionGroup name="list">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </TransitionGroup>
  </ul>
</template>

<style scoped>
.list-enter-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>

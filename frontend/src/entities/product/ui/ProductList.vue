<script setup lang="ts">
import type { IProduct } from '../model/types'
import ProductCard from './ProductCard.vue'
import ProductCardSkeleton from './ProductCardSkeleton.vue'

defineProps<{ products: IProduct[]; isLoading: boolean; error: string | null }>()
</script>

<template>
  <div v-if="error" class="text-center py-10 text-red-500">Ошибка: {{ error }}</div>
  <ul v-else-if="isLoading && products.length === 0" class="grid grid-cols-2 gap-6 lg:grid-cols-4">
    <ProductCardSkeleton v-for="n in 8" :key="n" />
  </ul>
  <ul
    v-else
    class="grid grid-cols-2 gap-6 lg:grid-cols-4 transition-opacity duration-300"
    :class="{ 'opacity-50 pointer-events-none': isLoading }"
  >
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

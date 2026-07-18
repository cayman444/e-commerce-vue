<script setup lang="ts">
import type { IProduct } from '../model/types'
import ProductCard from './ProductCard.vue'
import ProductCardSkeleton from './ProductCardSkeleton.vue'
import ProductListError from './ProductListError.vue'

defineProps<{ products: IProduct[]; isLoading: boolean; error: string | null }>()
</script>

<template>
  <ProductListError v-if="error" :error="error" />
  <Transition v-else name="fade" mode="out-in">
    <ul v-if="isLoading && products.length === 0" class="grid grid-cols-2 gap-6 lg:grid-cols-4">
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
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>

<script setup lang="ts">
import type { IProduct } from '../model/types'
import ProductDetailsCarousel from './ProductDetailsCarousel.vue'
import ProductDetailsError from './ProductDetailsError.vue'
import ProductDetailsInfo from './ProductDetailsInfo.vue'
import ProductDetailsSkeleton from './ProductDetailsSkeleton.vue'

const { product } = defineProps<{
  product: IProduct | null
  isLoading: boolean
  error: string | null
}>()

const emit = defineEmits<{
  (e: 'addToCart'): void
}>()
</script>

<template>
  <ProductDetailsSkeleton v-if="isLoading" />
  <ProductDetailsError v-else-if="error" :error="error" />
  <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24 items-start">
    <ProductDetailsCarousel :product />
    <div class="pt-4 lg:col-span-5 lg:sticky lg:top-32 h-fit self-start">
      <ProductDetailsInfo :product @add-to-cart="emit('addToCart')" />
    </div>
  </div>
</template>

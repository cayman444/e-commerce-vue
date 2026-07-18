<script setup lang="ts">
import type { IProduct } from '../model/types'
import ProductDetailsCarousel from './ProductDetailsCarousel.vue'
import ProductDetailsInfo from './ProductDetailsInfo.vue'

const { product } = defineProps<{
  product: IProduct | null
  isLoading: boolean
  error: string | null
}>()
</script>

<template>
  <div v-if="isLoading" class="text-center">Загрузка информации о товаре...</div>
  <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
  <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
    <ProductDetailsCarousel :product />
    <div class="pt-4 lg:col-span-5 lg:sticky lg:top-32 h-fit">
      <ProductDetailsInfo :product />
    </div>
  </div>
</template>

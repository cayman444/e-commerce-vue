<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel'
import type { IProduct } from '../model/types'
import ProductDetailsInfo from './ProductDetailsInfo.vue'

defineProps<{
  product: IProduct | null
  isLoading: boolean
  error: string | null
}>()
</script>

<template>
  <div v-if="isLoading" class="text-center">Загрузка информации о товаре...</div>
  <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
  <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
    <div class="flex flex-col gap-6">
      <Carousel :opts="{ align: 'start', loop: true }" class="w-full">
        <CarouselContent>
          <CarouselItem v-for="(imgUrl, index) in product.images" :key="index">
            <div class="aspect-3/4 overflow-hidden bg-neutral border border-secondary/10">
              <img
                :src="imgUrl"
                :alt="`${product.name} - Ракурс ${index + 1}`"
                class="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
    <div class="pt-4 md:sticky md:top-32 h-fit">
      <ProductDetailsInfo :product />
    </div>
  </div>
</template>

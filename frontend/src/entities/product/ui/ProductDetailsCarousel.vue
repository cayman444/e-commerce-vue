<script setup lang="ts">
import { cn } from '@/shared/lib/utils.ts'
import { Carousel, CarouselContent, CarouselItem, useCarouselControls } from '@/shared/ui/carousel'
import { computed } from 'vue'
import type { IProduct } from '../model/types'

const { product } = defineProps<{
  product: IProduct
}>()

const { activeIndex, selectSlide } = useCarouselControls('carousel-ref')

const gridColsClass = computed(() => {
  const count = product.images.length
  const cols = count <= 4 ? count : 4

  const mapping: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }

  return mapping[cols] || 'grid-cols-4'
})
</script>

<template>
  <div class="lg:col-span-7 flex flex-col gap-4">
    <Carousel ref="carousel-ref" :opts="{ align: 'start', loop: true }" class="w-full">
      <CarouselContent>
        <CarouselItem v-for="(imgUrl, index) in product.images" :key="index">
          <div class="aspect-3/2 overflow-hidden bg-neutral border border-secondary/10">
            <img
              :src="imgUrl"
              :alt="product.name"
              class="w-full h-full object-cover mix-blend-multiply"
            />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
    <div v-if="product.images.length > 1" :class="cn('grid gap-4', gridColsClass)">
      <button
        v-for="(imgUrl, index) in product.images"
        :key="index"
        @click="selectSlide(index)"
        class="aspect-square overflow-hidden bg-neutral border transition-all cursor-pointer"
        :class="
          cn(
            'border-secondary/10 opacity-60 hover:opacity-100',
            activeIndex === index && 'border-secondary opacity-100',
          )
        "
      >
        <img :src="imgUrl" :alt="product.name" class="w-full h-full object-cover" />
      </button>
    </div>
  </div>
</template>

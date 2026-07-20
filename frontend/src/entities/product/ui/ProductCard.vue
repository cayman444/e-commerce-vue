<script setup lang="ts">
import { formatPrice } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { ShoppingBag } from '@lucide/vue'
import { ref } from 'vue'
import { CATEGORY_LABELS } from '../model/constants'
import type { IProduct } from '../model/types'

defineProps<{
  product: IProduct
}>()

const emit = defineEmits<{
  (e: 'addToCart'): void
}>()

const isLoaded = ref(false)
</script>

<template>
  <li>
    <RouterLink
      :to="{ name: 'product-details', params: { id: product.id } }"
      class="flex flex-col gap-5 group cursor-pointer"
    >
      <div
        class="aspect-3/4 border border-secondary/10 bg-neutral overflow-hidden relative rounded-none"
      >
        <img
          :src="product.image"
          :alt="product.name"
          @load="isLoaded = true"
          class="w-full h-full object-cover mix-blend-multiply transition-all duration-700 ease-out"
          :class="isLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'"
        />
        <div
          class="absolute bottom-4 left-4 right-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-10"
        >
          <Button
            variant="secondary"
            class="w-full rounded-none h-11 text-xs uppercase tracking-wider bg-secondary text-neutral hover:opacity-90 shadow-md flex items-center justify-center gap-2 cursor-pointer border-0"
            @click.stop.prevent="emit('addToCart')"
          >
            <ShoppingBag :size="14" />
            В корзину
          </Button>
        </div>
      </div>
      <div class="flex flex-col gap-1.5 px-1">
        <span class="font-sans text-xs uppercase text-tertiary tracking-widest">
          {{ CATEGORY_LABELS[product.category] }}
        </span>
        <div class="flex justify-between items-baseline gap-4">
          <h3 class="font-display text-lg text-secondary m-0 leading-tight">
            {{ product.name }}
          </h3>
          <span class="font-sans text-base text-secondary">
            {{ formatPrice(product.price) }}
          </span>
        </div>
      </div>
    </RouterLink>
  </li>
</template>

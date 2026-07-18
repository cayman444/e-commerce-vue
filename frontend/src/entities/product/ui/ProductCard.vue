<script setup lang="ts">
import { formatPrice } from '@/shared/lib/utils'
import { ref } from 'vue'
import { CATEGORY_LABELS } from '../model/constants'
import type { IProduct } from '../model/types'

defineProps<{
  product: IProduct
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

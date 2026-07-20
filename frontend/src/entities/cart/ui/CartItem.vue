<script setup lang="ts">
import { formatPrice } from '@/shared/lib/utils'
import { Minus, Plus, Trash2 } from '@lucide/vue'
import type { IProductsToCart } from '../model/types'

defineProps<{
  item: IProductsToCart
}>()

defineEmits<{
  (e: 'increment'): void
  (e: 'decrement'): void
  (e: 'remove'): void
}>()
</script>

<template>
  <div
    class="flex items-center justify-between gap-4 py-6 border-b border-b-secondary/10 last:border-0"
  >
    <div class="flex items-center gap-4 grow">
      <div
        class="w-20 h-24 bg-neutral border border-secondary/10 overflow-hidden shrink-0 flex items-center justify-center"
      >
        <img
          :src="item.image"
          :alt="item.name"
          class="w-full h-full object-cover mix-blend-multiply"
        />
      </div>
      <div class="flex flex-col gap-1 grow">
        <h3 class="font-display text-lg text-secondary line-clamp-1 m-0">
          {{ item.name }}
        </h3>
        <p class="font-sans text-sm text-tertiary">{{ formatPrice(item.priceForOne) }} / шт.</p>
      </div>
    </div>
    <div class="flex items-center gap-6 md:gap-12">
      <div class="flex items-center border border-secondary/10">
        <button
          @click="$emit('decrement')"
          :disabled="item.productCountToCart <= 1"
          class="size-9 flex items-center justify-center hover:bg-secondary/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <Minus :size="14" />
        </button>
        <span class="w-10 text-center font-semibold text-sm select-none">
          {{ item.productCountToCart }}
        </span>
        <button
          @click="$emit('increment')"
          class="size-9 flex items-center justify-center hover:bg-secondary/5 transition-colors cursor-pointer"
        >
          <Plus :size="14" />
        </button>
      </div>
      <div class="w-24 text-right hidden sm:block">
        <span class="font-sans font-semibold text-base text-secondary">
          {{ formatPrice(item.priceForOne * item.productCountToCart) }}
        </span>
      </div>
      <button
        @click="$emit('remove')"
        class="size-9 flex items-center justify-center text-tertiary hover:text-secondary transition-colors cursor-pointer"
        title="Удалить"
      >
        <Trash2 :size="16" />
      </button>
    </div>
  </div>
</template>

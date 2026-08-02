<script setup lang="ts">
import { ROUTES_PATHS } from '@/app/router'
import { formatPrice } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { ArrowRight } from '@lucide/vue'
import { computed } from 'vue'

const props = defineProps<{ totalPrice: number; totalCount: number }>()

const formatMessage = computed(() => {
  const count = props.totalCount
  if (count === 0) return 'В корзине пока нет товаров'

  const abs = Math.abs(count) % 100
  const mod10 = abs % 10

  if (abs > 10 && abs < 20) {
    return `${count} товаров ожидают оформления`
  }
  if (mod10 > 1 && mod10 < 5) {
    return `${count} товара ожидают оформления`
  }
  if (mod10 === 1) {
    return `${count} товар ожидает оформления`
  }
  return `${count} товаров ожидают оформления`
})
</script>

<template>
  <div
    class="bg-neutral border border-secondary/10 p-8 flex flex-col justify-between h-full min-h-55 w-full"
  >
    <div>
      <h3 class="font-display text-2xl md:text-3xl text-secondary mb-2 font-normal">Корзина</h3>
      <p class="text-tertiary text-sm md:text-base">
        {{ formatMessage }}
      </p>
    </div>
    <div class="mt-8 flex flex-col gap-6">
      <div class="flex justify-between items-end border-b border-secondary/10 pb-2">
        <span class="text-xs font-semibold uppercase tracking-widest text-tertiary"> Итого </span>
        <span class="font-display text-2xl font-semibold text-secondary tracking-tight">
          {{ formatPrice(totalPrice) }}
        </span>
      </div>
      <RouterLink :to="ROUTES_PATHS.CART" class="block w-full">
        <Button :variant="'secondary'" class="w-full">
          <span>Перейти в корзину</span>
          <ArrowRight :size="16" class="transition-transform group-hover:translate-x-1" />
        </Button>
      </RouterLink>
    </div>
  </div>
</template>

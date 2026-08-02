<script setup lang="ts">
import { formatPrice } from '@/shared/lib/utils'
import { Eye } from '@lucide/vue'
import { computed } from 'vue'
import type { IOrder } from './UserOrderHistory.vue'

const props = defineProps<{
  order: IOrder
  statusLabel: { label: string; class: string }
}>()

const formattedItemsCount = computed(() => {
  const count = props.order.itemsCount
  const abs = Math.abs(count) % 100
  const mod10 = abs % 10

  if (abs > 10 && abs < 20) return `${count} изделий`
  if (mod10 > 1 && mod10 < 5) return `${count} изделия`
  if (mod10 === 1) return `${count} изделие`
  return `${count} изделий`
})
</script>

<template>
  <li
    class="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 border-b border-secondary/10 items-center hover:bg-secondary/5 transition-colors -mx-4 px-4"
  >
    <div class="col-span-2 md:col-span-1 flex flex-col">
      <span class="font-display text-xl md:text-2xl text-secondary font-medium tracking-tight">
        #{{ order.id }}
      </span>
      <span class="text-xs uppercase tracking-widest text-tertiary mt-1 font-normal">
        {{ order.date || 'Дата не указана' }}
      </span>
    </div>
    <div class="col-span-1 flex items-center md:justify-center">
      <span
        :class="[
          'px-3 py-1 text-[10px] md:text-xs font-semibold uppercase tracking-widest select-none',
          statusLabel.class,
        ]"
      >
        {{ statusLabel.label }}
      </span>
    </div>
    <div class="col-span-1 flex flex-col md:items-end">
      <span class="text-sm font-medium text-secondary">
        {{ formattedItemsCount }}
      </span>
      <span class="text-xs text-tertiary mt-0.5">
        {{ formatPrice(order.totalAmount) }}
      </span>
    </div>
    <div class="col-span-2 md:col-span-1 flex justify-end">
      <button
        type="button"
        class="text-xs uppercase tracking-widest font-semibold text-tertiary hover:text-secondary flex items-center gap-2 transition-colors cursor-pointer border-0 bg-transparent"
      >
        <span>Детали</span>
        <Eye :size="15" />
      </button>
    </div>
  </li>
</template>

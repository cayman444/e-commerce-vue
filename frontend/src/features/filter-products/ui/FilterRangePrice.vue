<script setup lang="ts">
import type { IPriceRange } from '@/entities/product'
import { cn } from '@/shared/lib/utils'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui'
import Slider from '@/shared/ui/slider/Slider.vue'
import { ChevronDown } from '@lucide/vue'
import { useFilterRangePrice } from '../model/useFilterRangePrice'

const emit = defineEmits<{ (e: 'set-price', range: IPriceRange): void }>()
const { priceRange, maxProductPrice } = defineProps<{
  priceRange: IPriceRange
  maxProductPrice?: number
}>()

const { localRange, isOpen, applyPrice } = useFilterRangePrice(
  () => priceRange,
  () => maxProductPrice,
  (newRange) => emit('set-price', newRange),
)
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <div
        class="flex items-center gap-1.5 cursor-pointer uppercase text-xs font-semibold tracking-wider text-secondary hover:opacity-75 transition-opacity py-1 select-none"
      >
        <span>Цена</span>
        <ChevronDown
          :class="cn('text-secondary transition-transform duration-300', { 'rotate-180': isOpen })"
          :size="14"
        />
      </div>
    </PopoverTrigger>
    <PopoverContent class="min-w-70 p-6 flex flex-col gap-4">
      <div
        class="flex justify-between text-xs text-tertiary font-semibold uppercase tracking-wider"
      >
        <span>От {{ localRange[0] }} $</span>
        <span>До {{ localRange[1] }} $</span>
      </div>
      <Slider
        v-model="localRange"
        :min="0"
        :max="maxProductPrice ?? 5000"
        :step="50"
        class="my-2"
      />
      <Button variant="secondary" size="sm" class="w-full" @click="applyPrice"> Применить </Button>
    </PopoverContent>
  </Popover>
</template>

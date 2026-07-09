<script setup lang="ts">
import type { IPriceRange } from '@/entities/product'
import { cn } from '@/shared/lib/utils'
import Slider from '@/shared/ui/slider/Slider.vue'
import { ChevronDown } from '@lucide/vue'
import { useFilterRangePrice } from '../model/useFilterRangePrice'

const emit = defineEmits<{ (e: 'set-price', range: IPriceRange): void }>()
const { priceRange, maxProductPrice } = defineProps<{
  priceRange: IPriceRange
  maxProductPrice?: number
}>()

const { isOpen, localRange, toggle, applyPrice } = useFilterRangePrice(
  () => priceRange,
  () => maxProductPrice,
  (newRange) => emit('set-price', newRange),
)
</script>

<template>
  <div class="relative" ref="container">
    <div
      class="flex items-center gap-1.5 cursor-pointer uppercase text-xs font-semibold tracking-wider text-secondary hover:opacity-75 transition-opacity py-1"
      @click="toggle"
    >
      <span>Цена</span>
      <ChevronDown
        :class="cn('text-secondary transition-transform duration-300', { '-rotate-180': isOpen })"
        :size="14"
      />
    </div>
    <Transition name="popover">
      <div
        v-if="isOpen"
        class="absolute top-full left-0 mt-3 z-50 p-6 bg-neutral border border-secondary/10 shadow-lg min-w-[280px] rounded-none flex flex-col gap-4"
      >
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
        <button
          class="w-full bg-secondary text-neutral text-xs font-semibold py-2.5 px-4 uppercase tracking-wider hover:opacity-90 transition-opacity rounded-none cursor-pointer border-0"
          @click="applyPrice"
        >
          Применить
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.popover-enter-active,
.popover-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.popover-enter-from,
.popover-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

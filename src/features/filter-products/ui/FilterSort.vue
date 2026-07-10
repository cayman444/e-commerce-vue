<script setup lang="ts">
import { SORT_OPTIONS, type TSort } from '@/entities/product'
import { cn } from '@/shared/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui'
import { ChevronDown } from '@lucide/vue'
import { computed, ref } from 'vue'

const props = defineProps<{ currentSort: TSort }>()
const emit = defineEmits<{ (e: 'set-sort', val: TSort): void }>()

const isOpen = ref(false)

const currentLabel = computed(() => {
  return SORT_OPTIONS.find((opt) => opt.value === props.currentSort)?.label || ''
})

const selectSort = (val: TSort) => {
  emit('set-sort', val)
  isOpen.value = false
}
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <div
        class="flex items-center gap-1.5 cursor-pointer uppercase text-xs font-semibold tracking-wider text-secondary hover:opacity-75 transition-opacity py-1 select-none"
      >
        <span>Сортировка: {{ currentLabel }}</span>
        <ChevronDown
          :class="cn('text-secondary transition-transform duration-300', { 'rotate-180': isOpen })"
          :size="14"
        />
      </div>
    </PopoverTrigger>
    <PopoverContent class="min-w-[220px] py-2 flex flex-col gap-0">
      <button
        v-for="opt in SORT_OPTIONS"
        :key="opt.value"
        :class="
          cn(
            'px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-left hover:bg-secondary/5 cursor-pointer transition-colors border-0 bg-transparent',
            { 'text-primary bg-secondary/5': opt.value === currentSort },
          )
        "
        @click="selectSort(opt.value)"
      >
        {{ opt.label }}
      </button>
    </PopoverContent>
  </Popover>
</template>

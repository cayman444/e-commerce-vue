<script setup lang="ts">
import { cn } from '@/shared/lib/utils'
import { ref } from 'vue'

const FILTERS = [
  { name: 'Все', value: 'all' },
  { name: 'Мебель', value: 'furniture' },
  { name: 'Свет', value: 'light' },
  { name: 'Предметы', value: 'items' },
  { name: 'Аксессуары', value: 'accessories' },
] as const

type TFiltersValue = (typeof FILTERS)[number]['value']

const activeFilter = ref<TFiltersValue>('all')
</script>

<template>
  <div class="flex items-center gap-8">
    <div
      v-for="{ name, value } in FILTERS"
      :key="value"
      :class="
        cn(
          'text-tertiary cursor-pointer font-semibold uppercase transition-all hover:text-secondary pb-2 border-b-2 border-transparent',
          {
            'text-secondary border-secondary': activeFilter === value,
          },
        )
      "
      @click="() => (activeFilter = value)"
    >
      {{ name }}
    </div>
  </div>
</template>

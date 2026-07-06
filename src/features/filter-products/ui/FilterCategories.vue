<script setup lang="ts">
import type { TCategory } from '@/entities/product'
import { cn } from '@/shared/lib/utils'

const { category } = defineProps<{ category: TCategory }>()
defineEmits<{ (e: 'set-category', category: TCategory): void }>()

const CATEGORIES: { name: string; value: TCategory }[] = [
  { name: 'Все', value: 'all' },
  { name: 'Мебель', value: 'furniture' },
  { name: 'Свет', value: 'light' },
  { name: 'Предметы', value: 'items' },
  { name: 'Аксессуары', value: 'accessories' },
]
</script>

<template>
  <div class="flex items-center gap-8">
    <div
      v-for="{ name, value } in CATEGORIES"
      :key="value"
      :class="
        cn(
          'text-tertiary cursor-pointer font-semibold uppercase transition-all hover:text-secondary pb-2 border-b-2 border-transparent',
          {
            'text-secondary border-secondary': category === value,
          },
        )
      "
      @click="() => $emit('set-category', value)"
    >
      {{ name }}
    </div>
  </div>
</template>

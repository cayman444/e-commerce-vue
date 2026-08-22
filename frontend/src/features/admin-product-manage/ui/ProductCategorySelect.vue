<script setup lang="ts">
import { CATEGORY_LABELS, type TProductCategory } from '@/entities/product'

const modelValue = defineModel<TProductCategory>({ required: true })

defineProps<{
  error?: string
}>()
</script>

<template>
  <div class="space-y-1">
    <label class="text-xs uppercase text-tertiary">Категория</label>
    <select
      v-model="modelValue"
      class="w-full border border-secondary/20 p-2 text-sm bg-neutral outline-none cursor-pointer"
    >
      <option v-for="(label, key) in CATEGORY_LABELS" :key="key" :value="key">
        {{ label }}
      </option>
    </select>
    <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
  </div>
</template>

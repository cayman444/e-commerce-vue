<script setup lang="ts">
import { Input } from '@/shared/ui/input'

defineProps<{
  id?: string
  label?: string
  type?: string
  placeholder?: string
  modelValue?: string | number
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()
</script>

<template>
  <div class="flex flex-col gap-2 group">
    <label
      v-if="label"
      :for="id"
      class="uppercase text-tertiary text-xs transition-all group-focus-within:text-secondary font-medium tracking-wider"
    >
      {{ label }}
    </label>
    <Input
      :id="id"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      :model-value="modelValue"
      @update:model-value="(val) => emit('update:modelValue', val)"
    />
    <p v-if="error" class="text-xs text-red-500 font-medium tracking-wide">
      {{ error }}
    </p>
  </div>
</template>

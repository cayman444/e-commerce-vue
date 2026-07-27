<script setup lang="ts">
import { Input } from '@/shared/ui/input'
import { Eye, EyeOff } from '@lucide/vue'
import { computed, ref } from 'vue'

const props = defineProps<{
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

const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type ?? 'text'
})
</script>

<template>
  <div class="flex flex-col gap-2 group">
    <label
      v-if="label"
      :for="id"
      class="uppercase text-tertiary text-xs transition-all group-focus-within:text-secondary font-medium tracking-wider select-none"
    >
      {{ label }}
    </label>
    <div class="relative flex items-center">
      <Input
        :id="id"
        :type="inputType"
        :placeholder="placeholder"
        autocomplete="on"
        :model-value="modelValue"
        @update:model-value="(val) => emit('update:modelValue', val)"
        :class="{ 'pr-10': type === 'password' }"
      />
      <button
        v-if="type === 'password'"
        type="button"
        @click="showPassword = !showPassword"
        class="absolute right-1 text-tertiary hover:text-secondary transition-colors p-1 cursor-pointer select-none"
        tabindex="-1"
      >
        <EyeOff v-if="showPassword" :size="16" />
        <Eye v-else :size="16" />
      </button>
    </div>
    <p v-if="error" class="text-xs text-red-500 font-medium tracking-wide">
      {{ error }}
    </p>
  </div>
</template>

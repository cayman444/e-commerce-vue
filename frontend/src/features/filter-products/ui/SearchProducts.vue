<script setup lang="ts">
import { Search } from '@lucide/vue'
import { watchDebounced } from '@vueuse/core'
import { ref, watch } from 'vue'

const searchQuery = defineModel<string>({ default: '' })
const localQuery = ref(searchQuery.value)

watchDebounced(
  localQuery,
  (newVal) => {
    searchQuery.value = newVal
  },
  { debounce: 300 },
)

watch(searchQuery, (newVal) => {
  localQuery.value = newVal
})
</script>

<template>
  <div class="relative">
    <Search class="absolute z-1 top-1/2 left-3 -translate-y-1/2 pointer-events-none" :size="16" />
    <input
      v-model="localQuery"
      name="search"
      placeholder="Поиск..."
      class="input relative border-0 border-b-2 border-transparent transition-all outline-0 px-3 py-2 bg-neutral-100 placeholder:uppercase placeholder:text-xs placeholder:font-medium pl-10 focus:border-secondary"
    />
  </div>
</template>

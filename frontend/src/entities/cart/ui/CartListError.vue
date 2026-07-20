<script setup lang="ts">
import { AlertTriangle } from '@lucide/vue'

defineProps<{
  error: string | null
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-16 px-4 gap-4 text-center max-w-md mx-auto"
  >
    <div class="p-3 bg-red-500/5 rounded-full text-red-500">
      <AlertTriangle class="w-6 h-6" />
    </div>
    <div class="flex flex-col gap-1">
      <h3 class="font-display text-lg uppercase tracking-wide text-secondary">
        Не удалось загрузить корзину
      </h3>
      <p class="text-tertiary text-sm">
        {{ error || 'Произошла ошибка при получении списка товаров в корзине.' }}
      </p>
    </div>
  </div>
</template>

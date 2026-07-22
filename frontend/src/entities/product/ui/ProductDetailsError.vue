<script setup lang="ts">
import { Button } from '@/shared/ui'
import { AlertTriangle } from '@lucide/vue'

defineProps<{
  error: string | null
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-100 text-center px-4 max-w-md mx-auto gap-6"
  >
    <div class="p-4 bg-primary/5 rounded-full text-primary">
      <AlertTriangle class="w-8 h-8" />
    </div>
    <div class="flex flex-col gap-2">
      <h2 class="font-display text-2xl uppercase tracking-wider text-secondary">
        Не удалось загрузить товар
      </h2>
      <p class="text-tertiary text-sm leading-relaxed">
        {{ error || 'К сожалению, запрашиваемый товар временно недоступен или не существует.' }}
      </p>
    </div>
    <Button
      variant="secondary"
      class="px-8 py-6 uppercase text-xs tracking-widest font-semibold cursor-pointer"
      as-child
    >
      <RouterLink to="/">Назад в каталог</RouterLink>
    </Button>
  </div>
</template>

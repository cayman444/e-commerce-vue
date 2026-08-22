<script setup lang="ts">
import { Button } from '@/shared/ui'
import { Plus, Search } from '@lucide/vue'

defineProps<{
  totalCount: number
}>()

const search = defineModel<string>('search', { required: true })

const emits = defineEmits<{
  'add-product': []
}>()
</script>

<template>
  <div
    class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-secondary/10"
  >
    <div>
      <h1 class="font-display text-2xl md:text-3xl text-secondary">Управление каталогом</h1>
      <p class="text-xs text-tertiary mt-1">Всего товаров в магазине: {{ totalCount }}</p>
    </div>
    <div class="flex items-center gap-3">
      <div class="relative flex-1 md:w-64">
        <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
        <input
          v-model="search"
          type="text"
          placeholder="Поиск по названию..."
          class="w-full pl-9 pr-3 py-2 text-sm border border-secondary/20 bg-neutral outline-none"
        />
      </div>
      <Button
        size="sm"
        :variant="'secondary'"
        class="gap-1 whitespace-nowrap"
        @click="emits('add-product')"
      >
        <Plus class="w-4 h-4" />
        Добавить товар
      </Button>
    </div>
  </div>
</template>

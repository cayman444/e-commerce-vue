<script setup lang="ts">
import { Button } from '@/shared/ui'
import { Plus, Trash2 } from '@lucide/vue'

export interface ISpecField {
  key: string | number
  value: {
    title: string
    description: string
  }
}

defineProps<{
  fields: ISpecField[]
}>()

const emits = defineEmits<{
  add: []
  remove: [index: number]
}>()
</script>

<template>
  <div class="space-y-2 border-t border-secondary/10 pt-3">
    <div class="flex items-center justify-between">
      <label class="text-xs uppercase text-tertiary">Характеристики</label>
      <Button
        type="button"
        variant="outline"
        size="sm"
        class="h-7 text-xs gap-1"
        @click="emits('add')"
      >
        <Plus class="w-3.5 h-3.5" />
        Добавить
      </Button>
    </div>
    <div v-if="fields.length === 0" class="text-xs text-tertiary italic py-1">
      Нет добавленных характеристик
    </div>
    <div v-else class="space-y-2 max-h-40 overflow-y-auto pr-1">
      <div v-for="(field, index) in fields" :key="field.key" class="flex items-center gap-2">
        <input
          v-model="field.value.title"
          type="text"
          placeholder="Название (напр. Материал)"
          class="w-1/2 border border-secondary/20 p-1.5 text-xs bg-neutral outline-none"
        />
        <input
          v-model="field.value.description"
          type="text"
          placeholder="Значение (напр. Дерево)"
          class="w-1/2 border border-secondary/20 p-1.5 text-xs bg-neutral outline-none"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          class="h-7 w-7 p-0 shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          title="Удалить"
          @click="emits('remove', index)"
        >
          <Trash2 class="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  </div>
</template>

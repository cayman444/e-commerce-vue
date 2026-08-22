<script setup lang="ts">
import { Button } from '@/shared/ui'
import { Plus, Trash2 } from '@lucide/vue'

export interface IAccordionField {
  key: string | number
  value: {
    title: string
    content: string
  }
}

defineProps<{
  fields: IAccordionField[]
}>()

const emits = defineEmits<{
  add: []
  remove: [index: number]
}>()
</script>

<template>
  <div class="space-y-2 border-t border-secondary/10 pt-3">
    <div class="flex items-center justify-between">
      <label class="text-xs uppercase text-tertiary">Секции описания</label>
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
      Нет дополнительных секций
    </div>
    <div v-else class="space-y-3 max-h-48 overflow-y-auto pr-1">
      <div
        v-for="(field, index) in fields"
        :key="field.key"
        class="p-2 border border-secondary/10 bg-neutral space-y-2 relative group"
      >
        <div class="flex items-center justify-between gap-2">
          <input
            v-model="field.value.title"
            type="text"
            placeholder="Заголовок секции (напр. Уход)"
            class="w-full border border-secondary/20 p-1.5 text-xs bg-white outline-none"
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
        <textarea
          v-model="field.value.content"
          rows="2"
          placeholder="Текст секции"
          class="w-full min-h-22 border border-secondary/20 p-1.5 text-xs bg-white outline-none resize-none"
        ></textarea>
      </div>
    </div>
  </div>
</template>

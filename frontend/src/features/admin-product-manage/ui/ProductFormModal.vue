<script setup lang="ts">
import type { IProduct } from '@/entities/product'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui'
import { computed } from 'vue'
import ProductForm from './ProductForm.vue'

const props = defineProps<{
  open: boolean
  product?: IProduct | null
}>()

const emits = defineEmits<{
  'update:open': [value: boolean]
  saved: []
}>()

const isEditing = computed(() => Boolean(props.product?.id))

const handleSaved = () => {
  emits('update:open', false)
  emits('saved')
}
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emits('update:open', val)">
    <DialogContent class="max-w-xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{{ isEditing ? 'Редактирование товара' : 'Новый товар' }}</DialogTitle>
        <DialogDescription class="text-xs text-tertiary">
          {{
            isEditing
              ? 'Измените необходимые данные о товаре и сохраните изменения'
              : 'Заполните информацию для создания нового товара'
          }}
        </DialogDescription>
      </DialogHeader>
      <ProductForm :product="product" @cancel="emits('update:open', false)" @saved="handleSaved" />
    </DialogContent>
  </Dialog>
</template>

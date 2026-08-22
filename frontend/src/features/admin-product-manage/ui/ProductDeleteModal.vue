<script setup lang="ts">
import type { IProduct } from '@/entities/product'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui'
import { toRef } from 'vue'
import { useProductDelete } from '../model/useProductDelete'

const props = defineProps<{
  open: boolean
  product?: IProduct | null
}>()

const emits = defineEmits<{
  'update:open': [value: boolean]
  deleted: []
}>()

const { isLoading, confirmDelete } = useProductDelete(toRef(props, 'product'), () => {
  emits('update:open', false)
  emits('deleted')
})
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emits('update:open', val)">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>Удаление товара</DialogTitle>
        <DialogDescription class="pt-2">
          Вы действительно хотите удалить товар «{{ product?.name }}»? Это действие нельзя отменить.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" :disabled="isLoading" @click="emits('update:open', false)">
          Отмена
        </Button>
        <Button
          variant="secondary"
          class="bg-red-700 hover:bg-red-800 text-white cursor-pointer"
          :disabled="isLoading"
          @click="confirmDelete"
        >
          {{ isLoading ? 'Удаление...' : 'Удалить' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

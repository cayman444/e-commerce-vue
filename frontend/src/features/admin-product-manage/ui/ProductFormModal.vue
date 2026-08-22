<script setup lang="ts">
import type { IProduct } from '@/entities/product'
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui'
import { toRef } from 'vue'
import { useProductForm } from '../model/useProductForm'
import ProductImageUpload from './ProductImageUpload.vue'

const props = defineProps<{
  open: boolean
  product?: IProduct | null
}>()

const emits = defineEmits<{
  'update:open': [value: boolean]
  saved: []
}>()

const {
  name,
  nameProps,
  price,
  priceProps,
  category,
  categoryProps,
  inStock,
  inStockProps,
  description,
  descriptionProps,
  imageUrl,
  errors,
  isEditing,
  isLoading,
  isUploading,
  handleUploadImage,
  submitForm,
} = useProductForm(toRef(props, 'product'), toRef(props, 'open'), () => {
  emits('update:open', false)
  emits('saved')
})
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emits('update:open', val)">
    <DialogContent class="max-w-lg">
      <DialogHeader>
        <DialogTitle>{{ isEditing ? 'Редактирование товара' : 'Новый товар' }}</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="submitForm" class="space-y-4 my-2">
        <div class="space-y-1">
          <label class="text-xs uppercase text-tertiary">Название</label>
          <input
            v-model="name"
            v-bind="nameProps"
            type="text"
            class="w-full border border-secondary/20 p-2 text-sm bg-neutral outline-none"
            placeholder="Название товара"
          />
          <span v-if="errors.name" class="text-xs text-red-500">{{ errors.name }}</span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="text-xs uppercase text-tertiary">Категория</label>
            <select
              v-model="category"
              v-bind="categoryProps"
              class="w-full border border-secondary/20 p-2 text-sm bg-neutral outline-none"
            >
              <option value="furniture">Мебель</option>
              <option value="light">Освещение</option>
              <option value="items">Предметы</option>
              <option value="accessories">Аксессуары</option>
            </select>
            <span v-if="errors.category" class="text-xs text-red-500">{{ errors.category }}</span>
          </div>
          <div class="space-y-1">
            <label class="text-xs uppercase text-tertiary">Цена (₽)</label>
            <input
              v-model.number="price"
              v-bind="priceProps"
              type="number"
              min="0"
              class="w-full border border-secondary/20 p-2 text-sm bg-neutral outline-none"
            />
            <span v-if="errors.price" class="text-xs text-red-500">{{ errors.price }}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 py-1">
          <input
            id="inStockCheck"
            v-model="inStock"
            v-bind="inStockProps"
            type="checkbox"
            class="accent-primary"
          />
          <label for="inStockCheck" class="text-sm cursor-pointer select-none">В наличии</label>
        </div>
        <div class="space-y-1">
          <label class="text-xs uppercase text-tertiary">Описание</label>
          <textarea
            v-model="description"
            v-bind="descriptionProps"
            rows="3"
            class="w-full border border-secondary/20 p-2 text-sm bg-neutral outline-none resize-none"
            placeholder="Описание товара"
          ></textarea>
          <span v-if="errors.description" class="text-xs text-red-500">{{
            errors.description
          }}</span>
        </div>
        <ProductImageUpload
          :image-url="imageUrl"
          :is-uploading="isUploading"
          @upload="handleUploadImage"
        />
        <DialogFooter>
          <Button type="button" variant="outline" @click="emits('update:open', false)">
            Отмена
          </Button>
          <Button type="submit" :disabled="isLoading || isUploading">
            {{ isLoading ? 'Сохранение...' : 'Сохранить' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

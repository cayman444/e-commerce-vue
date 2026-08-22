<script setup lang="ts">
import type { IProduct } from '@/entities/product'
import { Button, DialogFooter } from '@/shared/ui'
import { toRef } from 'vue'
import { useProductForm } from '../model/useProductForm'
import ProductCategorySelect from './ProductCategorySelect.vue'
import ProductImageUpload from './ProductImageUpload.vue'

const props = defineProps<{
  product?: IProduct | null
}>()

const emits = defineEmits<{
  cancel: []
  saved: []
}>()

const {
  name,
  nameProps,
  price,
  priceProps,
  category,
  inStock,
  inStockProps,
  description,
  descriptionProps,
  imageUrl,
  errors,
  isLoading,
  isUploading,
  handleUploadImage,
  submitForm,
} = useProductForm(toRef(props, 'product'), () => emits('saved'))
</script>

<template>
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
      <ProductCategorySelect
        v-model="category"
        :error="errors.category"
      />
      <div class="space-y-1">
        <label class="text-xs uppercase text-tertiary">Цена ($)</label>
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
      <span v-if="errors.description" class="text-xs text-red-500">{{ errors.description }}</span>
    </div>
    <ProductImageUpload
      :image-url="imageUrl"
      :is-uploading="isUploading"
      @upload="handleUploadImage"
    />
    <DialogFooter>
      <Button type="button" variant="outline" @click="emits('cancel')"> Отмена </Button>
      <Button type="submit" :disabled="isLoading || isUploading">
        {{ isLoading ? 'Сохранение...' : 'Сохранить' }}
      </Button>
    </DialogFooter>
  </form>
</template>

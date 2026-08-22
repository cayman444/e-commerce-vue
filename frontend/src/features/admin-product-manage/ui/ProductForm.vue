<script setup lang="ts">
import type { IProduct } from '@/entities/product'
import { Button, DialogFooter } from '@/shared/ui'
import { toRef } from 'vue'
import { useProductForm } from '../model/useProductForm'
import ProductAccordionsFields from './ProductAccordionsFields.vue'
import ProductGeneralFields from './ProductGeneralFields.vue'
import ProductImageUpload from './ProductImageUpload.vue'
import ProductSpecsFields from './ProductSpecsFields.vue'

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
  imageFields,
  handleUploadImages,
  removeImage,
  specFields,
  addSpec,
  removeSpec,
  accordionFields,
  addAccordion,
  removeAccordion,
  errors,
  isLoading,
  isUploading,
  submitForm,
} = useProductForm(toRef(props, 'product'), () => emits('saved'))
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-4 my-2">
    <ProductGeneralFields
      v-model:name="name"
      v-model:category="category"
      v-model:price="price"
      v-model:in-stock="inStock"
      v-model:description="description"
      :name-props="nameProps"
      :price-props="priceProps"
      :in-stock-props="inStockProps"
      :description-props="descriptionProps"
      :errors="errors"
    />
    <ProductImageUpload
      :images="imageFields"
      :is-uploading="isUploading"
      @upload="handleUploadImages"
      @remove="removeImage"
    />
    <ProductSpecsFields
      :fields="specFields"
      @add="() => addSpec({ title: '', description: '' })"
      @remove="removeSpec"
    />
    <ProductAccordionsFields
      :fields="accordionFields"
      @add="() => addAccordion({ title: '', content: '' })"
      @remove="removeAccordion"
    />
    <DialogFooter class="pt-2">
      <Button type="button" variant="outline" @click="emits('cancel')"> Отмена </Button>
      <Button type="submit" :disabled="isLoading || isUploading">
        {{ isLoading ? 'Сохранение...' : 'Сохранить' }}
      </Button>
    </DialogFooter>
  </form>
</template>

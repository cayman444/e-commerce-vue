<script setup lang="ts">
import { CATEGORY_LABELS, type TProductCategory } from '@/entities/product'

const name = defineModel<string>('name', { required: true })
const category = defineModel<TProductCategory>('category', { required: true })
const price = defineModel<number>('price', { required: true })
const inStock = defineModel<boolean>('inStock', { required: true })
const description = defineModel<string>('description', { required: true })

defineProps<{
  nameProps?: Record<string, unknown>
  priceProps?: Record<string, unknown>
  inStockProps?: Record<string, unknown>
  descriptionProps?: Record<string, unknown>
  errors?: Partial<Record<'name' | 'category' | 'price' | 'description', string>>
}>()
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-1">
      <label class="text-xs uppercase text-tertiary">Название</label>
      <input
        v-model="name"
        v-bind="nameProps"
        type="text"
        class="w-full border border-secondary/20 p-2 text-sm bg-neutral outline-none"
        placeholder="Название товара"
      />
      <span v-if="errors?.name" class="text-xs text-red-500">{{ errors.name }}</span>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-1">
        <label class="text-xs uppercase text-tertiary">Категория</label>
        <select
          v-model="category"
          class="w-full border border-secondary/20 p-2 text-sm bg-neutral outline-none cursor-pointer"
        >
          <option v-for="(label, key) in CATEGORY_LABELS" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
        <span v-if="errors?.category" class="text-xs text-red-500">{{ errors.category }}</span>
      </div>
      <div class="space-y-1">
        <label class="text-xs uppercase text-tertiary">Цена ($)</label>
        <input
          v-model.number="price"
          v-bind="priceProps"
          type="number"
          min="0"
          class="w-full border border-secondary/20 p-2 text-sm bg-neutral outline-none"
        />
        <span v-if="errors?.price" class="text-xs text-red-500">{{ errors.price }}</span>
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
        class="w-full min-h-22 border border-secondary/20 p-2 text-sm bg-neutral outline-none resize-none"
        placeholder="Описание товара"
      ></textarea>
      <span v-if="errors?.description" class="text-xs text-red-500">{{ errors.description }}</span>
    </div>
  </div>
</template>
